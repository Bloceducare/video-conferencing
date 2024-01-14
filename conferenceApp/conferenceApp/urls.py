# conferenceApp/urls.py

from django.conf import settings
from django.contrib import admin
from django.urls import path, include
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import permissions
from django.conf.urls.static import static
from allauth.account.views import LoginView
from rest_framework_simplejwt import views as jwt_views 
from accounts.views import get_user_details


schema_view = get_schema_view(
    openapi.Info(
        title="Web3bridge Auth",
        default_version="v1",
        description="authentication api for web3bridge",
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path("swagger/", schema_view.with_ui("swagger", cache_timeout=0), name="schema-swagger-ui"),
    path("admin/", admin.site.urls),
    # path("", home, name="home"),
    path("accounts/", include("accounts.urls")),
    path("accounts/", include("allauth.urls")),
    path("api/token/", jwt_views.TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", jwt_views.TokenRefreshView.as_view(), name="token_refresh"),
    path('get-user-details/', get_user_details, name='get_user_details'),

]
if settings.DEBUG:
    urlpatterns += static (settings.STATIC_URL, document_root=settings.STATIC_ROOT)
