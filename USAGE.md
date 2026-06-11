# Hướng dẫn sử dụng Book API

## Yêu cầu

- Python 3.8+
- Django 5.2+
- Django REST Framework
- djangorestframework-simplejwt

## Cài đặt

```bash
# Cài đặt dependencies
pip install -r requirements.txt

# Chạy migration
python manage.py migrate

# Tạo superuser (để lấy token)
python manage.py createsuperuser

# Chạy server
python manage.py runserver
```

## API Endpoints

### 1. GET /api/books/ - Lấy danh sách sách

**Phân trang (Pagination):**
```bash
# Lấy trang 1, mặc định 20 sách/trang
curl -H "Authorization: Bearer <token>" \
  "http://localhost:8000/api/books/"

# Lấy trang 2, 100 sách/trang
curl -H "Authorization: Bearer <token>" \
  "http://localhost:8000/api/books/?page=2&page_size=100"
```

**Lọc theo tiêu chí:**

```bash
# Lọc theo tên sách
curl -H "Authorization: Bearer <token>" \
  "http://localhost:8000/api/books/?title=Python"

# Lọc theo tác giả
curl -H "Authorization: Bearer <token>" \
  "http://localhost:8000/api/books/?author=Nguyen"

# Lọc theo giá (200000-400000)
curl -H "Authorization: Bearer <token>" \
  "http://localhost:8000/api/books/?price_min=200000&price_max=400000"

# Lọc theo số lượng (5-50)
curl -H "Authorization: Bearer <token>" \
  "http://localhost:8000/api/books/?quantity_min=5&quantity_max=50"

# Kết hợp nhiều filter
curl -H "Authorization: Bearer <token>" \
  "http://localhost:8000/api/books/?title=Django&author=Tran&price_min=200000&price_max=400000&quantity_min=10&page_size=100"
```

### 2. POST /api/books/ - Tạo sách mới

```bash
curl -X POST \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Django for Beginners",
    "author": "Pham Van C",
    "price": 350000,
    "quantity": 25,
    "published_date": "2024-01-10"
  }' \
  "http://localhost:8000/api/books/"
```

### 3. GET /api/books/{id}/ - Xem chi tiết sách

```bash
curl -H "Authorization: Bearer <token>" \
  "http://localhost:8000/api/books/1/"
```

### 4. PUT /api/books/{id}/ - Cập nhật toàn bộ sách

```bash
curl -X PUT \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Django Advanced",
    "author": "Pham Van C",
    "price": 380000,
    "quantity": 30,
    "published_date": "2024-02-10"
  }' \
  "http://localhost:8000/api/books/1/"
```

### 5. PATCH /api/books/{id}/ - Cập nhật một phần sách

```bash
curl -X PATCH \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "price": 390000,
    "quantity": 35
  }' \
  "http://localhost:8000/api/books/1/"
```

### 6. DELETE /api/books/{id}/ - Xóa sách

```bash
curl -X DELETE \
  -H "Authorization: Bearer <token>" \
  "http://localhost:8000/api/books/1/"
```

## Lấy JWT Token

```bash
# Đăng nhập và lấy token
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "admin"
  }' \
  "http://localhost:8000/api/token/"

# Response:
# {
#   "access": "eyJ0eXAiOiJKV1QiLCJhbGc...",
#   "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
# }
```

## Test API

### Cách 1: Sử dụng Python script

```bash
# Cài đặt requests
pip install requests

# Chạy test script
python test_api.py
```

### Cách 2: Sử dụng bash script

```bash
bash test_api.sh
```

### Cách 3: Sử dụng Postman

1. Mở Postman
2. Tạo request POST đến `http://localhost:8000/api/token/`
3. Lấy token từ response
4. Thêm header `Authorization: Bearer <token>` vào các request khác
5. Test các endpoints

## Filter Parameters

### Phân trang (Pagination)

| Parameter | Loại | Mô tả |
|-----------|------|-------|
| `page` | integer | Số trang (mặc định: 1) |
| `page_size` | integer | Số record mỗi trang (20 hoặc 100, mặc định: 20) |

### Lọc (Filter)

| Parameter | Loại | Mô tả |
|-----------|------|-------|
| `title` | string | Tìm kiếm theo tên sách (không phân biệt hoa/thường) |
| `author` | string | Tìm kiếm theo tác giả (không phân biệt hoa/thường) |
| `price_min` | integer | Giá tối thiểu |
| `price_max` | integer | Giá tối đa |
| `quantity_min` | integer | Số lượng tối thiểu |
| `quantity_max` | integer | Số lượng tối đa |

## Ví dụ thực tế

### Ví dụ 1: Tìm sách Python giá dưới 400000, có trên 10 cuốn

```bash
curl -H "Authorization: Bearer <token>" \
  "http://localhost:8000/api/books/?title=Python&price_max=400000&quantity_min=10"
```

### Ví dụ 2: Lấy trang 3, 100 sách mỗi trang

```bash
curl -H "Authorization: Bearer <token>" \
  "http://localhost:8000/api/books/?page=3&page_size=100"
```

### Ví dụ 3: Tìm sách tác giả "Tran", giá từ 200000-500000

```bash
curl -H "Authorization: Bearer <token>" \
  "http://localhost:8000/api/books/?author=Tran&price_min=200000&price_max=500000"
```

## Response Format

### Success (200 OK) - Danh sách sách

```json
{
    "count": 50,
    "next": "http://localhost:8000/api/books/?page=2",
    "previous": null,
    "results": [
        {
            "id": 1,
            "title": "Python Advanced",
            "author": "Nguyen Van A",
            "price": 250000,
            "quantity": 15,
            "published_date": "2023-01-15"
        }
    ]
}
```

### Success (200 OK) - Chi tiết sách

```json
{
    "id": 1,
    "title": "Python Advanced",
    "author": "Nguyen Van A",
    "price": 250000,
    "quantity": 15,
    "published_date": "2023-01-15"
}
```

### Success (201 Created) - Tạo mới

```json
{
    "id": 3,
    "title": "Django for Beginners",
    "author": "Pham Van C",
    "price": 350000,
    "quantity": 25,
    "published_date": "2024-01-10"
}
```

### Error (400 Bad Request)

```json
{
    "title": ["Tên sách không được để trống"],
    "price": ["Giá sách phải lớn hơn 0"]
}
```

### Error (401 Unauthorized)

```json
{
    "detail": "Authentication credentials were not provided."
}
```

### Error (404 Not Found)

```json
{
    "detail": "Not found."
}
```

## Validation Rules

- **title**: Không được để trống, max_length: 200
- **author**: Không được để trống, max_length: 100
- **price**: Phải > 0
- **quantity**: Phải >= 0
- **published_date**: Mặc định là hôm nay nếu không cung cấp

## Ghi chú quan trọng

1. **Authentication**: Tất cả endpoints yêu cầu JWT token trong header `Authorization: Bearer <token>`
2. **Pagination**: Mặc định 20 sách/trang, hỗ trợ 100 sách/trang
3. **Filter**: Không phân biệt hoa/thường cho title và author
4. **Custom Filter**: Sử dụng hàm `custom_filter_books()` để filter theo nhiều tiêu chí
5. **CRUD Operations**: Hỗ trợ đầy đủ Create, Read, Update (PUT/PATCH), Delete

## Tính năng chính

✅ Phân trang linh hoạt (20 hoặc 100 records/trang)  
✅ Filter custom theo multiple fields  
✅ Filter không phân biệt hoa/thường  
✅ Filter theo khoảng giá và số lượng  
✅ CRUD operations đầy đủ  
✅ Validation đầy đủ  
✅ JWT Authentication  
✅ Response format chuẩn  

## Troubleshooting

### Lỗi: "Authentication credentials were not provided"

**Giải pháp**: Thêm header `Authorization: Bearer <token>` vào request

### Lỗi: "Invalid token"

**Giải pháp**: Token đã hết hạn, lấy token mới bằng endpoint `/api/token/`

### Lỗi: 404 Not Found

**Giải pháp**: Kiểm tra ID sách có tồn tại không

### Lỗi: 400 Bad Request

**Giải pháp**: Kiểm tra dữ liệu đầu vào có hợp lệ không (xem Validation Rules)

## File cấu trúc

```
book_manage/
├── book/
│   ├── views.py          # ViewSet với custom pagination và filter
│   ├── serializers.py    # Serializer với validation
│   ├── models.py         # Model Book
│   ├── urls.py           # URL routing
│   └── ...
├── book_manage/
│   ├── settings.py       # Settings với DRF config
│   ├── urls.py           # Main URL routing
│   └── ...
├── API_DOCUMENTATION.md  # Tài liệu API chi tiết
├── USAGE.md             # File này
├── test_api.py          # Python test script
├── test_api.sh          # Bash test script
└── manage.py
```
