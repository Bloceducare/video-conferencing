# accounts/views.py
from rest_framework import generics, status
from rest_framework.response import Response
from django.contrib.auth import authenticate, login
from rest_framework.authtoken.models import Token
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
from .serializers import SignupSerializer, SigninSerializer, UserProfileSerializer, ResetPasswordSerializer, CompletePasswordResetSerializer



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def home(request):
    user = request.user

    # Check if the user has a social account
    social_account = SocialAccount.objects.filter(user=user).first()

    if social_account:
        login(request, user)

        # Generate or retrieve the refresh token
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)

        return JsonResponse({
            "user_id": user.id,
            "username": user.username,
            "email": user.email,
            "access_token": access_token,
            # Add more user details as needed
        })

    else:
        # User signed in with a different method (not a social account)
        # Generate or retrieve the refresh token
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)

        return JsonResponse({
            "user_id": user.id,
            "username": user.username,
            "email": user.email,
            "access_token": access_token,
        })
    
class SignupView(generics.CreateAPIView):
    """Register user with email and password"""
    serializer_class = SignupSerializer 

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        if response.status_code == status.HTTP_201_CREATED:
            return Response({
                'message': 'User registered successfully.',
                **response.data
            }, status=status.HTTP_201_CREATED)
        else:
            return response



class SigninView(CreateAPIView):
    """Login a user with username and password"""
    serializer_class = SigninSerializer  

    def create(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')

        # Authenticate using username and password
        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                'token': token.key,
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
    queryset = User.objects.all()  
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]

    def update(self, request, *args, **kwargs):
        user = get_object_or_404(User, pk=request.user.id)
        serializer = self.get_serializer(user, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        user = get_object_or_404(User, pk=request.user.id)
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

        user = User.objects.filter(email=email).first() 

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
    """Complete the password reset process"""
    serializer_class = CompletePasswordResetSerializer
    def create(self, request, *args, **kwargs):
        uid = request.data.get('uid')
        token = request.data.get('token')
        new_password = request.data.get('new_password')
        
        
        uid = force_str(urlsafe_base64_decode(uid))  # Decode and convert to string
        
        user = User.objects.filter(pk=uid).first()

        if user is not None and default_token_generator.check_token(user, token):
            if new_password:
                user.set_password(new_password)
                user.save()
                return Response({'message': 'Password reset successful.'}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Passwords do not match.'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'error': 'Invalid reset link.'}, status=status.HTTP_400_BAD_REQUEST)



# class GitHubSocialAuth(APIView):
#     def get(self, request, code=None):
#         if not code:
#             return Response({"error": "Authorization code not provided."}, status=status.HTTP_400_BAD_REQUEST)

#         try:
#             # Exchange the authorization code for an access token
#             adapter = GitHubOAuth2Adapter(request)
#             client = OAuth2Client(
#                 request,
#                 os.getenv('GITHUB_CLIENT_ID'),
#                 os.getenv('GITHUB_CLIENT_SECRET'),
#                 'POST',  # Use 'POST' as the access token method
#                 'https://github.com/login/oauth/access_token',  # GitHub's access token URL
#                 'http://localhost:8000/accounts/github/login/callback/',  # Your actual callback URL
#                 'user',  # Use 'user' scope to access basic user information
#             )
#             token = adapter.access_token(code, client)
#             account = adapter.complete_login(request, app=None, token=token)
#         except Exception as e:
#             return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

#         # Perform additional actions as needed, e.g., create a user or log in
#         if account and account.user.is_authenticated:
#             # Save user details to the User model
#             save_user_details(account.user)

#             # Log in the user
#             login(request, account.user)

#             # Generate or retrieve the authentication token
#             token, created = Token.objects.get_or_create(user=account.user)

#             # Return the user details and authentication token
#             return Response({
#                 "user_id": account.user.id,
#                 "username": account.user.username,
#                 "email": account.user.email,
#                 "auth_token": token.key,  # Include the authentication token
#                 # Add more user details as needed
#             })

#         # If the authentication process fails, return an error message
#         return Response({"error": "Authentication failed."}, status=status.HTTP_400_BAD_REQUEST)

# def save_user_details(user):
#     # Extract user details from the social authentication provider
#     social_account = SocialAccount.objects.get(user=user)
#     extra_data = social_account.extra_data

#     # Extract relevant information (customize based on your needs)
#     username = extra_data.get('login', '')
#     email = extra_data.get('email', '')
#     name = extra_data.get('name', '')

#     # Check if the user already exists based on email
#     existing_user = User.objects.filter(email=email).first()

#     if existing_user:
#         # If the user exists, update relevant details
#         existing_user.username = username
#         existing_user.save()
#     else:
#         # If the user doesn't exist, create a new user
#         new_user = User.objects.create_user(username=username, email=email)
#         new_user.first_name = name
#         new_user.save()

