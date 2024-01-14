from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from rest_framework import generics, status
from rest_framework.response import Response
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from django.core.mail import send_mail
from django.http import JsonResponse
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

class SignupView(generics.CreateAPIView):
    """Register user with email, password, and other details"""
    serializer_class = CustomUserSerializer 

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        if response.status_code == status.HTTP_201_CREATED:
            return Response({
                'message': 'User registered successfully.',
                **response.data
            }, status=status.HTTP_201_CREATED)
        else:
            return response

class SigninView(APIView):
    """Login a user with username and password"""
    serializer_class = SigninSerializer

    @csrf_exempt
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        username = serializer.validated_data['username']
        password = serializer.validated_data['password']

        # Authenticate using username and password
        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)

            return Response({
                'access_token': access_token,
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'is_staff': user.is_staff,
                },
                'message': 'Authentication successful.'
            }, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid credentials.'}, status=status.HTTP_401_UNAUTHORIZED)
        

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
    social_account = SocialAccount.objects.filter(user=user).first()

    # Generate or retrieve the refresh token
    refresh = RefreshToken.for_user(user)
    access_token = str(refresh.access_token)

    # Check if the access token is still valid
    token_is_valid = refresh.valid()

    # Build the response data
    response_data = {
        "user_id": user.id,
        "username": user.username,
        "email": user.email,
        "access_token": access_token,
        "token_is_valid": token_is_valid,
    }

    if social_account:
        login(request, user, backend='allauth.account.auth_backends.AuthenticationBackend')
        # Add more user details specific to social accounts if needed

    return Response(response_data)
