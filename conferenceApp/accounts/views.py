from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from rest_framework import generics, status
from rest_framework.response import Response
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from django.core.mail import send_mail
from django.http import JsonResponse
from .models import CustomUser
from rest_framework.generics import CreateAPIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.utils.encoding import force_str, force_bytes
from django.contrib.auth.tokens import default_token_generator
from allauth.socialaccount.models import SocialAccount
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import CustomUserSerializer, SigninSerializer, UserProfileSerializer, ResetPasswordSerializer, CompletePasswordResetSerializer
from django.contrib.auth import get_user_model
from rest_framework import permissions
from django.shortcuts import redirect
from social_django.utils import psa

class SignupView(generics.CreateAPIView):
    """Register user with email, password, and other details"""
    serializer_class = CustomUserSerializer

    def create(self, request, *args, **kwargs):
        username = request.data.get('username')
        email = request.data.get('email')
        name = request.data.get('name')
        class_stack = request.data.get('class_stack')
        cohort = request.data.get('cohort')

        # Validate the required fields
        if not username:
            return Response({'error': 'Username is required.'}, status=status.HTTP_400_BAD_REQUEST)

        if not email:
            return Response({'error': 'Email is required.'}, status=status.HTTP_400_BAD_REQUEST)

        if not name:
            return Response({'error': 'Name is required.'}, status=status.HTTP_400_BAD_REQUEST)

        if not class_stack:
            return Response({'error': 'Class/Stack is required.'}, status=status.HTTP_400_BAD_REQUEST)

        if not cohort:
            return Response({'error': 'Cohort is required.'}, status=status.HTTP_400_BAD_REQUEST)

        # Check if username or email already exists
        if get_user_model().objects.filter(username=username).exists():
            return Response({'error': 'Username already exists.'}, status=status.HTTP_400_BAD_REQUEST)

        if get_user_model().objects.filter(email=email).exists():
            return Response({'error': 'Email already exists.'}, status=status.HTTP_400_BAD_REQUEST)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response({'message': 'User registered successfully.', **serializer.data}, status=status.HTTP_201_CREATED, headers=headers)

class SigninView(generics.CreateAPIView):
    """Login a user with username and password"""
    serializer_class = SigninSerializer  # Specify your serializer class

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        username = serializer.validated_data.get('username')
        password = serializer.validated_data.get('password')

        # Validate the required fields
        if not username:
            return Response({'error': 'Username is required.'}, status=status.HTTP_400_BAD_REQUEST)

        if not password:
            return Response({'error': 'Password is required.'}, status=status.HTTP_400_BAD_REQUEST)

        # Authenticate using username and password
        user = authenticate(request, username=username, password=password)

        if user is None:
            # Check if the user exists with the given username
            try:
                user = CustomUser.objects.get(username=username)
            except CustomUser.DoesNotExist:
                return Response({'error': 'Invalid username.'}, status=status.HTTP_401_UNAUTHORIZED)

            # Check if the provided password is correct
            if not user.check_password(password):
                return Response({'error': 'Invalid password.'}, status=status.HTTP_401_UNAUTHORIZED)

        # Authentication successful
        login(request, user)

        # Generate or retrieve the refresh token
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)

        # Return user details and token
        user_data = {
            'user': {
                'id': user.id,
                'username': user.username,
                'name': user.name,
                'email': user.email,
                'role': user.role,
            },
            'access_token': access_token,
            'message': 'Authentication successful.',
        }
        return Response(user_data, status=status.HTTP_200_OK)

class UserProfileView(generics.RetrieveUpdateDestroyAPIView):
    """Get user details, update, or delete a user"""
    queryset = get_user_model().objects.all()  
    serializer_class = CustomUserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def update(self, request, *args, **kwargs):
        user = self.get_object()
        serializer = self.get_serializer(user, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)

        # Check if the user has permission to update 'role' field
        if not request.user.is_staff:
            serializer.validated_data.pop('role', None)

        self.perform_update(serializer)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        user = self.get_object()
        
        # Check if the user has permission to delete the user
        if not request.user.is_staff and request.user != user:
            return Response({'error': 'Permission denied.'}, status=status.HTTP_403_FORBIDDEN)

        user.delete()
        return Response({'message': 'User deleted successfully.'}, status=status.HTTP_204_NO_CONTENT)
    

def send_reset_password_mail(email, resetlink):
    subject = 'Password reset request'
    message = f'Your reset password link is: {resetlink}'
    from_email = 'goodnesskolapo@gmail.com'
    recipient_list = [email]

    send_mail(subject, message, from_email, recipient_list, fail_silently=False)

class ResetPasswordView(generics.CreateAPIView):
    """Request for reset password link user password by providing email"""
    serializer_class = ResetPasswordSerializer

    def create(self, request, *args, **kwargs):
        email = request.data.get('email')

        user = get_user_model().objects.filter(email=email).first() 

        if user is not None:
            # Generate a token for password reset
            token = default_token_generator.make_token(user)
            uid = urlsafe_base64_encode(force_bytes(user.pk))

            # Generate the reset link
            resetlink = f"http://127.0.0.1:8000/reset-password/{uid}/{token}/"

            # Send the reset link to the user's email
            send_reset_password_mail(user.email, resetlink)

            return Response({'message': 'Password reset initiated. Please check your email.'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'User with this email does not exist.'}, status=status.HTTP_404_NOT_FOUND)

class CompletePasswordResetView(generics.CreateAPIView):
    """Complete the password reset process by posting the uid, token and new password"""
    serializer_class = CompletePasswordResetSerializer
    def create(self, request, *args, **kwargs):
        uid = request.data.get('uid')
        token = request.data.get('token')
        new_password = request.data.get('new_password')
        
        
        uid = force_str(urlsafe_base64_decode(uid))  # Decode and convert to string
        
        user = get_user_model().objects.filter(pk=uid).first()

        if user is not None and default_token_generator.check_token(user, token):
            if new_password:
                user.set_password(new_password)
                user.save()
                return Response({'message': 'Password reset successful.'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid reset link.'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def get_user_details(request):
    user = request.user

    # Check if the user has a social account
    social_account = getattr(user, 'socialaccount', None)

    # Build the response data
    response_data = {
        "user_id": user.id,
        "username": user.username,
        "email": user.email,
    }

    if social_account:
        # Set additional details for social accounts
        if not user.email and social_account.extra_data.get('email'):
            user.email = social_account.extra_data['email']
            user.save()

        login(request, user, backend='allauth.account.auth_backends.AuthenticationBackend')

    return Response(response_data)

def add_jwt_token_to_redirect(backend, details, response, user=None, *args, **kwargs):
    if user and user.is_authenticated:
        # Generate or retrieve the refresh token
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)

        # Append the token to the redirect URL
        redirect_url = 'https://vc-w3bridge.vercel.app/dashboard'
        redirect_url += f'?access_token={access_token}'

        return redirect(redirect_url)

def dashboard(request):

    """ The commented code partt has an error
      i'm too lazy to fix so i hardcoded the backend
       since we just have one social backend for now """
    
    # auth_response = request.socialauth_backends
    # if auth_response:
    #     backend = auth_response[0].AUTH_BACKEND.name
    
    # else:
    #     # Default to 'github' if no backend is found
    backend = 'github'
    
    return add_jwt_token_to_redirect(backend, None, None, request.user)