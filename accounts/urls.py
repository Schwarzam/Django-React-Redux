from django.urls import path, include
from .api import RegisterAPI, LoginAPI, UserAPI
from knox import views as knox_views
from .passwordreset import CustomPasswordTokenVerificationView

urlpatterns = [
    path('api/auth', include('knox.urls')),
    path('api/auth/register', RegisterAPI.as_view()),
    path('api/auth/login', LoginAPI.as_view()),

    path('api/auth/user', UserAPI.as_view()),

    path('api/auth/logout', knox_views.LogoutView.as_view(), name="knox_logout"),

    ## Reset password
    ## https://github.com/anexia-it/django-rest-passwordreset
    path('api/reset-password/verify-token/', CustomPasswordTokenVerificationView.as_view(), name='password_reset_verify_token'),
    path('api/reset-password/', include('django_rest_passwordreset.urls', namespace='password_reset'))
]
