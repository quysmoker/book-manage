# Quick Start Guide - Book API

## 1️⃣ Chuẩn bị (Setup)

```bash
# Đi vào thư mục project
cd e:\book_manage

# Cài đặt dependencies
pip install -r requirements.txt

# Chạy migrations
python manage.py migrate

# Tạo superuser
python manage.py createsuperuser
# Nhập username, email, password
```

## 2️⃣ Chạy Server

```bash
python manage.py runserver
```

Server sẽ chạy tại: `http://localhost:8000`

## 3️⃣ Lấy JWT Token

**Cách 1: Sử dụng curl**

```bash
curl -X POST http://localhost:8000/api/token/ \
  -H "Content-Type: application/json" \
  -d "{\"username\": \"admin\", \"password\": \"your_password\"}"
```

**Cách 2: Sử dụng Python**

```python
import requests

response = requests.post('http://localhost:8000/api/token/', json={
    'username': 'admin',
    'password': 'your_password'
})

token = response.json()['access']
print(f"Token: {token}")
```

**Lưu token này để sử dụng trong các request khác**

## 4️⃣ Thử API Endpoints

### Lấy danh sách sách (mặc định 20 sách/trang)

```bash
curl -H "Authorization: Bearer <TOKEN>" \
  http://localhost:8000/api/books/
```

### Lấy 100 sách/trang

```bash
curl -H "Authorization: Bearer <TOKEN>" \
  "http://localhost:8000/api/books/?page_size=100"
```

### Tạo sách mới

```bash
curl -X POST http://localhost:8000/api/books/ \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Django REST API",
    "author": "Nguyen Van A",
    "price": 350000,
    "quantity": 20
  }'
```

### Lọc theo tên

```bash
curl -H "Authorization: Bearer <TOKEN>" \
  "http://localhost:8000/api/books/?title=Python"
```

### Lọc theo giá

```bash
curl -H "Authorization: Bearer <TOKEN>" \
  "http://localhost:8000/api/books/?price_min=200000&price_max=400000"
```

### Kết hợp filter + phân trang

```bash
curl -H "Authorization: Bearer <TOKEN>" \
  "http://localhost:8000/api/books/?title=Django&author=Nguyen&price_min=200000&quantity_min=5&page_size=100"
```

### Xem chi tiết sách

```bash
curl -H "Authorization: Bearer <TOKEN>" \
  http://localhost:8000/api/books/1/
```

### Cập nhật sách (PUT)

```bash
curl -X PUT http://localhost:8000/api/books/1/ \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Django Advanced",
    "author": "Nguyen Van A",
    "price": 380000,
    "quantity": 25
  }'
```

### Cập nhật một phần (PATCH)

```bash
curl -X PATCH http://localhost:8000/api/books/1/ \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "price": 390000
  }'
```

### Xóa sách

```bash
curl -X DELETE http://localhost:8000/api/books/1/ \
  -H "Authorization: Bearer <TOKEN>"
```

## 5️⃣ Test Tự động

### Cách 1: Python Test Script

```bash
python test_api.py
```

**Lưu ý:** Thay đổi `USERNAME` và `PASSWORD` trong file `test_api.py`

### Cách 2: Bash Test Script

```bash
bash test_api.sh
```

## 📊 Filter Parameters

| Parameter | Ví dụ | Mô tả |
|-----------|-------|-------|
| `page` | `?page=2` | Số trang |
| `page_size` | `?page_size=100` | 20 hoặc 100 records/trang |
| `title` | `?title=Python` | Tìm kiếm theo tên |
| `author` | `?author=Nguyen` | Tìm kiếm theo tác giả |
| `price_min` | `?price_min=200000` | Giá tối thiểu |
| `price_max` | `?price_max=400000` | Giá tối đa |
| `quantity_min` | `?quantity_min=5` | Số lượng tối thiểu |
| `quantity_max` | `?quantity_max=50` | Số lượng tối đa |

## 🔗 API Endpoints

| Method | Endpoint | Chức năng |
|--------|----------|----------|
| GET | /api/books/ | Lấy danh sách sách |
| POST | /api/books/ | Tạo sách mới |
| GET | /api/books/{id}/ | Xem chi tiết sách |
| PUT | /api/books/{id}/ | Cập nhật toàn bộ sách |
| PATCH | /api/books/{id}/ | Cập nhật một phần sách |
| DELETE | /api/books/{id}/ | Xóa sách |
| POST | /api/token/ | Lấy JWT token |
| POST | /api/token/refresh/ | Refresh token |

## ✨ Tính năng chính

✅ **Phân trang**: 20 hoặc 100 records/trang  
✅ **Custom Filter**: Filter theo title, author, price, quantity  
✅ **Không phân biệt hoa/thường**: title, author search  
✅ **Filter khoảng giá**: price_min, price_max  
✅ **Filter số lượng**: quantity_min, quantity_max  
✅ **CRUD Operations**: Create, Read, Update (PUT/PATCH), Delete  
✅ **Validation**: Kiểm tra dữ liệu đầu vào  
✅ **JWT Authentication**: Bảo mật API  
✅ **Response chuẩn**: JSON format  

## 📝 Validation Rules

- `title`: Không được trống, max 200 ký tự
- `author`: Không được trống, max 100 ký tự
- `price`: Phải > 0
- `quantity`: Phải >= 0
- `published_date`: Mặc định hôm nay

## 🐛 Troubleshooting

**Q: Lỗi "Authentication credentials were not provided"**  
A: Thêm header `Authorization: Bearer <TOKEN>`

**Q: Lỗi "Invalid token"**  
A: Token đã hết hạn, lấy token mới

**Q: Lỗi 404 Not Found**  
A: ID sách không tồn tại

**Q: Lỗi 400 Bad Request**  
A: Kiểm tra validation rules

## 📚 Tài liệu chi tiết

- [API_DOCUMENTATION.md](API_DOCUMENTATION.md) - Tài liệu API đầy đủ
- [USAGE.md](USAGE.md) - Hướng dẫn sử dụng chi tiết

## 🎯 Ví dụ hoàn chỉnh

```bash
# 1. Lấy token
TOKEN=$(curl -s -X POST http://localhost:8000/api/token/ \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin"}' | grep -o '"access":"[^"]*' | cut -d'"' -f4)

# 2. Tạo sách
curl -X POST http://localhost:8000/api/books/ \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"Python","author":"Nguyen","price":300000,"quantity":20}'

# 3. Lấy danh sách (100 sách/trang, lọc Django)
curl -H "Authorization: Bearer $TOKEN" \
  "http://localhost:8000/api/books/?title=Django&page_size=100"

# 4. Xem chi tiết sách ID 1
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:8000/api/books/1/

# 5. Cập nhật giá sách ID 1
curl -X PATCH http://localhost:8000/api/books/1/ \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"price":350000}'

# 6. Xóa sách ID 1
curl -X DELETE http://localhost:8000/api/books/1/ \
  -H "Authorization: Bearer $TOKEN"
```

---

**Xong! API của bạn đã sẵn sàng để sử dụng. 🚀**
