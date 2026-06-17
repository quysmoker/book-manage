from rest_framework import viewsets, status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.db.models import Q
from django.shortcuts import render
from book.models import Book
from book.serializers import BookListSerializer
from book.pagination import BookPagination
from rest_framework.permissions import IsAuthenticated


# Custom Filter Function
def custom_filter_books(queryset, request):
    """
    Custom filter function để filter sách theo các trường:
    - title: tìm kiếm gần đúng (icontains)
    - author: tìm kiếm gần đúng (icontains)
    - price: lọc theo khoảng giá (price_min, price_max)
    - quantity: lọc theo số lượng (quantity_min, quantity_max)
    """
    filters = Q()
    
    # Filter by title
    title = request.query_params.get('title')
    if title:
        filters &= Q(title__icontains=title)
    
    # Filter by author
    author = request.query_params.get('author')
    if author:
        filters &= Q(author__icontains=author)
    
    # Filter by price range
    price_min = request.query_params.get('price_min')
    price_max = request.query_params.get('price_max')
    
    if price_min:
        try:
            price_min = int(price_min)
            filters &= Q(price__gte=price_min)
        except ValueError:
            pass
    
    if price_max:
        try:
            price_max = int(price_max)
            filters &= Q(price__lte=price_max)
        except ValueError:
            pass
    
    # Filter by quantity range
    quantity_min = request.query_params.get('quantity_min')
    quantity_max = request.query_params.get('quantity_max')
    
    if quantity_min:
        try:
            quantity_min = int(quantity_min)
            filters &= Q(quantity__gte=quantity_min)
        except ValueError:
            pass
    
    if quantity_max:
        try:
            quantity_max = int(quantity_max)
            filters &= Q(quantity__lte=quantity_max)
        except ValueError:
            pass
    
    return queryset.filter(filters)


class BookViewSet(viewsets.ModelViewSet):
    """
    ViewSet cho Book model
    
    CRUD Operations:
    - GET /api/books/ : Lấy danh sách sách (có phân trang và filter)
    - POST /api/books/ : Thêm sách mới
    - GET /api/books/{id}/ : Xem chi tiết sách
    - PUT /api/books/{id}/ : Cập nhật toàn bộ sách
    - PATCH /api/books/{id}/ : Cập nhật một phần sách
    - DELETE /api/books/{id}/ : Xóa sách
    
    Query Parameters:
    - page: Trang cần lấy (mặc định: 1)
    - page_size: Số record trên một trang (20 hoặc 100, mặc định: 20)
    - title: Tìm kiếm sách theo tên
    - author: Tìm kiếm sách theo tác giả
    - price_min: Giá tối thiểu
    - price_max: Giá tối đa
    - quantity_min: Số lượng tối thiểu
    - quantity_max: Số lượng tối đa
    """
    queryset = Book.objects.all().order_by("id")
    serializer_class = BookListSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = BookPagination
    
    def get_queryset(self):
        """
        Override get_queryset để áp dụng custom filter
        """
        queryset = super().get_queryset()
        return custom_filter_books(queryset, self.request)
    
    def create(self, request, *args, **kwargs):
        """
        Override create method để validate dữ liệu
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    
    def update(self, request, *args, **kwargs):
        """
        Override update method (PUT)
        """
        partial = False
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)
    
    def partial_update(self, request, *args, **kwargs):
        """
        Override partial_update method (PATCH)
        """
        partial = True
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)
    
    def destroy(self, request, *args, **kwargs):
        """
        Override destroy method (DELETE)
        """
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(
            {"message": "Sách đã được xóa thành công"},
            status=status.HTTP_204_NO_CONTENT
        )


def home(request):
    """
    Render home page template
    """
    return render(request, 'home.html')
