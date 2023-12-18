from django.urls import path
from .views import github_signup

urlpatterns = [
    path('github-signup/', github_signup, name='github-signup'),
    
]