from rest_framework import serializers
from book.models import Book


class BookListSerializer(serializers.ModelSerializer):
    """
    Serializer cho Book model
    - Validate dữ liệu đầu vào
    - Serialize dữ liệu đầu ra
    """
    
    class Meta:
        model = Book
        fields = "__all__"
    
    def validate_title(self, value):
        """Validate title không được để trống"""
        if not value or value.strip() == "":
            raise serializers.ValidationError("Tên sách không được để trống")
        return value
    
    def validate_author(self, value):
        """Validate author không được để trống"""
        if not value or value.strip() == "":
            raise serializers.ValidationError("Tác giả không được để trống")
        return value
    
    def validate_price(self, value):
        """Validate price phải > 0"""
        if value < 0:
            raise serializers.ValidationError("Giá sách phải lớn hơn 0")
        return value
    
    def validate_quantity(self, value):
        """Validate quantity phải >= 0"""
        if value < 0:
            raise serializers.ValidationError("Số lượng phải >= 0")
        return value
