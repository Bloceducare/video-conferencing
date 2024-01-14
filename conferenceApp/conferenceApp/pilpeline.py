from rest_framework_simplejwt.tokens import RefreshToken
from django.shortcuts import redirect

def add_jwt_token_to_redirect(backend, details, response, user=None, *args, **kwargs):
    if user and user.is_authenticated:
        # Generate or retrieve the refresh token
        print('called::::::')
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)

        # Append the token to the redirect URL
        redirect_url = 'https://vc-w3bridge.vercel.app/dashboard'
        redirect_url += f'?access_token={access_token}'

        return redirect(redirect_url)
