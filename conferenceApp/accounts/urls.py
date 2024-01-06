from django.urls import path
from .views import SignupView, SigninView, UserProfileView, ResetPasswordView, CompletePasswordResetView

urlpatterns = [
    path('signup/', SignupView.as_view(), name='signup'),
    path('signin/', SigninView.as_view(), name='signin'),
    path('user/<int:pk>/', UserProfileView.as_view(), name='user-detail'),
    path('reset-password/', ResetPasswordView.as_view(), name='reset-password'),
    path('complete-password-reset/', CompletePasswordResetView.as_view(), name='complete-password-reset'),
]
