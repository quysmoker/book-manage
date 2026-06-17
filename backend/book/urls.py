from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BookViewSet, home
from .logout_view import LogoutView


router = DefaultRouter()
router.register(r'books', BookViewSet, basename='book')

urlpatterns = [
    path('', home, name='home'),
    path('', include(router.urls)),
    path('logout/', LogoutView.as_view(), name='logout'),
]
