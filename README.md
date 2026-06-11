# Book Management API - Django REST Framework

## 📋 Tóm tắt

Hệ thống API quản lý sách (Book Management) được xây dựng bằng Django REST Framework với các tính năng:

- ✅ CRUD operations đầy đủ (GET, POST, PUT, PATCH, DELETE)
- ✅ Phân trang linh hoạt (20 hoặc 100 records/trang)
- ✅ Custom filter theo multiple fields (title, author, price, quantity)
- ✅ Hỗ trợ filter khoảng giá và số lượng
- ✅ Validation dữ liệu
- ✅ JWT Authentication
- ✅ Response format chuẩn

## 🚀 Bắt đầu nhanh (5 phút)

```bash
# 1. Cài đặt dependencies
pip install -r requirements.txt

# 2. Chạy migrations
python manage.py migrate

# 3. Tạo superuser
python manage.py createsuperuser

# 4. Chạy server
python manage.py runserver

# 5. Lấy token (trong terminal khác)
curl -X POST http://localhost:8000/api/token/ \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "your_password"}'

# 6. Test API
curl -H "Authorization: Bearer <TOKEN>" \
  "http://localhost:8000/api/books/?page_size=100"
```

## 📚 API Endpoints

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | /api/books/ | Lấy danh sách sách (pagination + filter) |
| POST | /api/books/ | Tạo sách mới |
| GET | /api/books/{id}/ | Xem chi tiết sách |
| PUT | /api/books/{id}/ | Cập nhật toàn bộ sách |
| PATCH | /api/books/{id}/ | Cập nhật một phần sách |
| DELETE | /api/books/{id}/ | Xóa sách |

## 🔍 Phân trang (Pagination)

**Hỗ trợ 20 hoặc 100 records/trang**

```bash
# Trang 1, 20 sách (mặc định)
curl -H "Authorization: Bearer <TOKEN>" \
  "http://localhost:8000/api/books/"

# Trang 2, 100 sách/trang
curl -H "Authorization: Bearer <TOKEN>" \
  "http://localhost:8000/api/books/?page=2&page_size=100"
```

## 🔎 Filter (Lọc)

**Filter Parameters:**

| Parameter | Mô tả | Ví dụ |
|-----------|-------|-------|
| `title` | Tìm kiếm theo tên (không phân biệt hoa/thường) | `?title=Python` |
| `author` | Tìm kiếm theo tác giả | `?author=Nguyen` |
| `price_min` | Giá tối thiểu | `?price_min=200000` |
| `price_max` | Giá tối đa | `?price_max=400000` |
| `quantity_min` | Số lượng tối thiểu | `?quantity_min=5` |
| `quantity_max` | Số lượng tối đa | `?quantity_max=50` |

**Ví dụ:**

```bash
# Tìm sách Python giá dưới 400000
curl -H "Authorization: Bearer <TOKEN>" \
  "http://localhost:8000/api/books/?title=Python&price_max=400000"

# Tìm sách Django, giá 200k-500k, tác giả Tran, số lượng >= 5
curl -H "Authorization: Bearer <TOKEN>" \
  "http://localhost:8000/api/books/?title=Django&author=Tran&price_min=200000&price_max=500000&quantity_min=5"

# Kết hợp filter + pagination (trang 2, 100 sách/trang)
curl -H "Authorization: Bearer <TOKEN>" \
  "http://localhost:8000/api/books/?title=Django&price_min=200000&page=2&page_size=100"
```

## 🛠️ Các file chính

| File | Chức năng |
|------|----------|
| [book/views.py](book/views.py) | BookViewSet, BookPagination, custom_filter_books() |
| [book/serializers.py](book/serializers.py) | BookListSerializer với validation |
| [book_manage/settings.py](book_manage/settings.py) | DRF configuration |
| [test_api.py](test_api.py) | Python test script |
| [test_api.sh](test_api.sh) | Bash test script |
| [QUICK_START.md](QUICK_START.md) | Quick start guide (5 phút) |
| [USAGE.md](USAGE.md) | Hướng dẫn sử dụng chi tiết |
| [API_DOCUMENTATION.md](API_DOCUMENTATION.md) | Tài liệu API chi tiết |

## 🧪 Testing

### Python Test Script

```bash
python test_api.py
```

### Bash Test Script

```bash
bash test_api.sh
```

### Manual Test

Xem [QUICK_START.md](QUICK_START.md) để có ví dụ curl đầy đủ

## 📖 Tài liệu

- **[QUICK_START.md](QUICK_START.md)** - Quick start guide (5 phút để chạy)
- **[USAGE.md](USAGE.md)** - Hướng dẫn sử dụng chi tiết  
- **[API_DOCUMENTATION.md](API_DOCUMENTATION.md)** - Tài liệu API toàn diện

## ✨ Tính năng chính

### 1. Phân trang Custom
- ✅ Hỗ trợ 20 hoặc 100 records/trang
- ✅ Mặc định 20 nếu không cấu định
- ✅ Response bao gồm: count, next, previous, results

### 2. Filter Custom (Không dùng SimpleFilter)
- ✅ Hàm `custom_filter_books()` xử lý logic
- ✅ Filter multiple fields: title, author, price, quantity
- ✅ Filter khoảng giá: price_min, price_max
- ✅ Filter khoảng số lượng: quantity_min, quantity_max
- ✅ Case-insensitive search cho title, author
- ✅ Kết hợp filter AND (tất cả điều kiện)

### 3. CRUD Operations
- ✅ GET /api/books/ - Danh sách (pagination + filter)
- ✅ POST /api/books/ - Tạo mới
- ✅ GET /api/books/{id}/ - Chi tiết
- ✅ PUT /api/books/{id}/ - Cập nhật toàn bộ
- ✅ PATCH /api/books/{id}/ - Cập nhật một phần
- ✅ DELETE /api/books/{id}/ - Xóa

### 4. Security
- ✅ JWT Authentication bắt buộc
- ✅ Permission classes
- ✅ Input validation

## 📊 Model

```python
class Book(models.Model):
    title: CharField           # Tên sách (max 200)
    author: CharField          # Tác giả (max 100)
    price: IntegerField        # Giá sách
    quantity: IntegerField     # Số lượng
    published_date: DateField  # Ngày xuất bản
```

## ✔️ Validation

- `title`: Không được trống, max 200 ký tự
- `author`: Không được trống, max 100 ký tự
- `price`: Phải > 0
- `quantity`: Phải >= 0
- `published_date`: Mặc định hôm nay

## 📝 Response Examples

### GET /api/books/ (200 OK)

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

### POST /api/books/ (201 Created)

```json
{
    "id": 3,
    "title": "Django REST",
    "author": "Tran Van B",
    "price": 350000,
    "quantity": 25,
    "published_date": "2024-01-10"
}
```

## 🐛 Troubleshooting

| Vấn đề | Giải pháp |
|--------|----------|
| Authentication failed | Kiểm tra token, lấy token mới |
| 404 Not Found | Kiểm tra ID sách tồn tại |
| 400 Bad Request | Kiểm tra validation rules |
| Pagination không hoạt động | Kiểm tra page_size = 20 hoặc 100 |

## 📋 Yêu cầu

- Python 3.8+
- Django 5.2+
- Django REST Framework
- djangorestframework-simplejwt

## 🎯 Hoàn thành các yêu cầu

✅ **Endpoint /api/books/**
- GET - Lấy danh sách sách
- POST - Thêm sách mới
- GET {id} - Xem chi tiết
- PUT {id} - Cập nhật toàn bộ
- PATCH {id} - Cập nhật một phần
- DELETE {id} - Xóa sách

✅ **Pagination**
- 20 hoặc 100 records/trang (custom BookPagination class)

✅ **Filter**
- title, author, price (min/max), quantity (min/max)
- Custom filter function (custom_filter_books)
- Không dùng filter mặc định đơn giản

---

**Ngôn ngữ:** Python 3.8+  
**Framework:** Django 5.2 + DRF  
**API Type:** REST API  
**Authentication:** JWT  
**Status:** ✅ Hoàn thành tất cả yêu cầu
