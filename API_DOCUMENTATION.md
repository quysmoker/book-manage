# API Documentation - Book Management

## Endpoints

### 1. GET /api/books/ - Lấy danh sách sách

**Chức năng:** Lấy danh sách toàn bộ sách với hỗ trợ phân trang và lọc

**Query Parameters:**

| Parameter | Type | Mô tả | Ví dụ |
|-----------|------|-------|-------|
| `page` | integer | Trang cần lấy (mặc định: 1) | `?page=2` |
| `page_size` | integer | Số record trên một trang (20 hoặc 100, mặc định: 20) | `?page_size=100` |
| `title` | string | Tìm kiếm sách theo tên (không phân biệt hoa thường) | `?title=Python` |
| `author` | string | Tìm kiếm sách theo tác giả | `?author=Nguyen` |
| `price_min` | integer | Giá tối thiểu | `?price_min=100000` |
| `price_max` | integer | Giá tối đa | `?price_max=500000` |
| `quantity_min` | integer | Số lượng tối thiểu | `?quantity_min=5` |
| `quantity_max` | integer | Số lượng tối đa | `?quantity_max=50` |

**Request Examples:**

```bash
# Lấy danh sách trang 1, 20 sách mỗi trang
curl -H "Authorization: Bearer <token>" http://localhost:8000/api/books/

# Lấy trang 1, 100 sách mỗi trang
curl -H "Authorization: Bearer <token>" http://localhost:8000/api/books/?page_size=100

# Tìm sách có tên chứa "Python", giá từ 100000 đến 500000
curl -H "Authorization: Bearer <token>" http://localhost:8000/api/books/?title=Python&price_min=100000&price_max=500000

# Tìm sách của tác giả "Nguyen", số lượng >= 10
curl -H "Authorization: Bearer <token>" http://localhost:8000/api/books/?author=Nguyen&quantity_min=10

# Kết hợp nhiều filter
curl -H "Authorization: Bearer <token>" "http://localhost:8000/api/books/?page=2&page_size=100&title=Django&price_max=300000&quantity_min=5"
```

**Response Success (200):**
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
        },
        {
            "id": 2,
            "title": "Django REST Framework",
            "author": "Tran Van B",
            "price": 300000,
            "quantity": 20,
            "published_date": "2023-02-20"
        }
    ]
}
```

---

### 2. POST /api/books/ - Thêm sách mới

**Chức năng:** Tạo một sách mới

**Request Body:**
```json
{
    "title": "Django for Beginners",
    "author": "Pham Van C",
    "price": 350000,
    "quantity": 25,
    "published_date": "2024-01-10"
}
```

**Validation Rules:**
- `title`: Không được để trống (max_length: 200)
- `author`: Không được để trống (max_length: 100)
- `price`: Phải > 0
- `quantity`: Phải >= 0
- `published_date`: Mặc định là hôm nay nếu không cung cấp

**Response Success (201):**
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

**Response Error (400):**
```json
{
    "title": ["Tên sách không được để trống"],
    "price": ["Giá sách phải lớn hơn 0"]
}
```

---

### 3. GET /api/books/{id}/ - Xem chi tiết sách

**Chức năng:** Lấy thông tin chi tiết một cuốn sách

**URL Parameters:**
- `id`: ID của sách (bắt buộc)

**Request Example:**
```bash
curl -H "Authorization: Bearer <token>" http://localhost:8000/api/books/1/
```

**Response Success (200):**
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

**Response Error (404):**
```json
{
    "detail": "Not found."
}
```

---

### 4. PUT /api/books/{id}/ - Cập nhật toàn bộ sách

**Chức năng:** Cập nhật tất cả các trường của một sách

**URL Parameters:**
- `id`: ID của sách (bắt buộc)

**Request Body (tất cả các trường bắt buộc):**
```json
{
    "title": "Python Advanced - 2nd Edition",
    "author": "Nguyen Van A",
    "price": 280000,
    "quantity": 20,
    "published_date": "2024-03-10"
}
```

**Response Success (200):**
```json
{
    "id": 1,
    "title": "Python Advanced - 2nd Edition",
    "author": "Nguyen Van A",
    "price": 280000,
    "quantity": 20,
    "published_date": "2024-03-10"
}
```

**Request Example:**
```bash
curl -X PUT \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Python Advanced - 2nd Edition",
    "author": "Nguyen Van A",
    "price": 280000,
    "quantity": 20,
    "published_date": "2024-03-10"
  }' \
  http://localhost:8000/api/books/1/
```

---

### 5. PATCH /api/books/{id}/ - Cập nhật một phần sách

**Chức năng:** Cập nhật một số trường của sách (không cần cung cấp tất cả)

**URL Parameters:**
- `id`: ID của sách (bắt buộc)

**Request Body (các trường tùy chọn):**
```json
{
    "price": 290000,
    "quantity": 25
}
```

**Response Success (200):**
```json
{
    "id": 1,
    "title": "Python Advanced - 2nd Edition",
    "author": "Nguyen Van A",
    "price": 290000,
    "quantity": 25,
    "published_date": "2024-03-10"
}
```

**Request Example:**
```bash
curl -X PATCH \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "price": 290000,
    "quantity": 25
  }' \
  http://localhost:8000/api/books/1/
```

---

### 6. DELETE /api/books/{id}/ - Xóa sách

**Chức năng:** Xóa một cuốn sách

**URL Parameters:**
- `id`: ID của sách (bắt buộc)

**Request Example:**
```bash
curl -X DELETE \
  -H "Authorization: Bearer <token>" \
  http://localhost:8000/api/books/1/
```

**Response Success (204):**
```json
{
    "message": "Sách đã được xóa thành công"
}
```

**Response Error (404):**
```json
{
    "detail": "Not found."
}
```

---

## Authentication

**Tất cả các endpoints đều yêu cầu JWT authentication token**

### Lấy Token

**Endpoint:** POST /api/token/

**Request Body:**
```json
{
    "username": "your_username",
    "password": "your_password"
}
```

**Response:**
```json
{
    "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Sử dụng Token

Thêm header vào mỗi request:
```
Authorization: Bearer <access_token>
```

**Ví dụ:**
```bash
curl -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
     http://localhost:8000/api/books/
```

---

## Pagination Examples

### Ví dụ 1: Lấy 50 cuốn sách đầu tiên (20 sách/trang)

```bash
# Trang 1
curl -H "Authorization: Bearer <token>" "http://localhost:8000/api/books/?page=1"

# Trang 2
curl -H "Authorization: Bearer <token>" "http://localhost:8000/api/books/?page=2"

# Trang 3
curl -H "Authorization: Bearer <token>" "http://localhost:8000/api/books/?page=3"
```

### Ví dụ 2: Lấy 200 cuốn sách (100 sách/trang)

```bash
# Trang 1
curl -H "Authorization: Bearer <token>" "http://localhost:8000/api/books/?page_size=100&page=1"

# Trang 2
curl -H "Authorization: Bearer <token>" "http://localhost:8000/api/books/?page_size=100&page=2"
```

---

## Filter Examples

### Ví dụ 1: Tìm sách Python giá dưới 400000

```bash
curl -H "Authorization: Bearer <token>" \
  "http://localhost:8000/api/books/?title=Python&price_max=400000"
```

**Response:**
```json
{
    "count": 5,
    "next": null,
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

### Ví dụ 2: Tìm sách của tác giả "Tran" và số lượng từ 10 đến 50

```bash
curl -H "Authorization: Bearer <token>" \
  "http://localhost:8000/api/books/?author=Tran&quantity_min=10&quantity_max=50"
```

### Ví dụ 3: Kết hợp nhiều filter với phân trang

```bash
curl -H "Authorization: Bearer <token>" \
  "http://localhost:8000/api/books/?page=2&page_size=100&title=Django&price_min=200000&price_max=400000&quantity_min=5"
```

---

## Error Handling

### Error Status Codes

| Status Code | Mô tả |
|------------|-------|
| 200 | OK - Request thành công |
| 201 | Created - Tạo mới thành công |
| 204 | No Content - Xóa thành công |
| 400 | Bad Request - Dữ liệu không hợp lệ |
| 401 | Unauthorized - Cần authentication |
| 403 | Forbidden - Không có quyền truy cập |
| 404 | Not Found - Không tìm thấy resource |
| 500 | Internal Server Error - Lỗi server |

### Ví dụ Error Response

**400 Bad Request:**
```json
{
    "price": ["Giá sách phải lớn hơn 0"],
    "quantity": ["Số lượng phải >= 0"]
}
```

**401 Unauthorized:**
```json
{
    "detail": "Authentication credentials were not provided."
}
```

---

## Notes

1. **Phân trang:** Hỗ trợ 20 hoặc 100 record mỗi trang. Mặc định là 20.
2. **Filter:** Không phân biệt hoa/thường cho title và author
3. **Price và Quantity:** Hỗ trợ filter theo khoảng (min/max)
4. **Validation:** Tất cả các trường đều được validate trước khi lưu
5. **Authentication:** JWT token bắt buộc cho tất cả endpoints
