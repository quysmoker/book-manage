from django.urls import path, include
from rest_framework.routers import DefaultRouter
from book.views import BookViewSet, home

router = DefaultRouter()
router.register(r'books', BookViewSet, basename='book')

urlpatterns = [
    path('', home, name='home'),
    path('', include(router.urls)),
]
