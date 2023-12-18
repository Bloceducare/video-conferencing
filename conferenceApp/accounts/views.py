from django.shortcuts import render
from social_django.models import UserSocialAuth
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout

@api_view(['POST'])
@permission_classes([])
def github_signup(request):
    # Perform any additional logic you need for signup
    # (e.g., create a user profile, update user attributes)

    return Response({"message": "Sign-up successful!"}, status=status.HTTP_201_CREATED)
