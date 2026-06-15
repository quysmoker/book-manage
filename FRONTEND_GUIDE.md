# Django Book Management System - Bài Tập 5

Hoàn thành toàn bộ hệ thống quản lý sách với Frontend HTML/CSS/JavaScript kết nối API Django.

## 📋 Tính năng đã hoàn thành

### ✅ Backend API (từ Bài Tập 4)
- **GET /api/books/** - Lấy danh sách sách với phân trang
- **GET /api/books/?title=...&author=...** - Tìm kiếm & lọc sách
- **GET /api/books/{id}/** - Xem chi tiết sách
- **POST /api/books/** - Thêm sách mới
- **PUT /api/books/{id}/** - Cập nhật sách (Full)
- **PATCH /api/books/{id}/** - Cập nhật sách (Partial)
- **DELETE /api/books/{id}/** - Xóa sách

### ✅ Frontend (Bài Tập 5)

#### 1. **Hiển thị Danh Sách Sách** ✓
- Lấy dữ liệu từ API: `GET /api/books/`
- Hiển thị: Title, Author, Price, Quantity
- Bảng đẹp với giao diện thân thiện

#### 2. **Phân Trang Dữ Liệu** ✓
- Hỗ trợ 20 hoặc 100 record trên trang
- Nút Previous (◀) và Next (▶)
- Hiển thị trang hiện tại và tổng số sách
- API endpoint: `/api/books/?page=1&page_size=20`

#### 3. **Tìm Kiếm & Lọc** ✓
- Filter theo Title (tên sách)
- Filter theo Author (tác giả)
- Nút Tìm kiếm (🔎) và Đặt lại (↻)
- Tìm kiếm không phân biệt hoa/thường (icontains)

#### 4. **Thêm Sách Mới** ✓
- Form với các trường: Title, Author, Price, Quantity
- Gọi API: `POST /api/books/`
- Danh sách tự động cập nhật sau khi thêm
- Hiển thị notification thành công

#### 5. **Xem Chi Tiết Sách** ✓
- Nút Detail (👁️) trên mỗi dòng sách
- Gọi API: `GET /api/books/{id}/`
- Modal hiển thị chi tiết đầy đủ
- Thông tin gồm: ID, Title, Author, Price, Quantity, Published Date

#### 6. **Cập Nhật Sách** ✓
- Nút Edit (✏️) trên mỗi dòng sách
- Modal form chỉnh sửa
- Gọi API: `PUT /api/books/{id}/`
- Danh sách tự động cập nhật
- Hiển thị notification thành công

#### 7. **Xóa Sách** ✓
- Nút Delete (🗑️) trên mỗi dòng sách
- Confirm dialog trước khi xóa
- Gọi API: `DELETE /api/books/{id}/`
- Danh sách tự động cập nhật
- Hiển thị notification thành công

## 🚀 Cách Chạy Ứng Dụng

### Yêu cầu
- Python 3.8+
- Django 5.2+
- Django REST Framework
- django-cors-headers

### Bước 1: Cài đặt Dependencies
```bash
cd e:\book_manage
pip install -r requirements.txt
pip install django-cors-headers
```

### Bước 2: Chạy Migrations
```bash
python manage.py migrate
```

### Bước 3: Tạo Admin User (nếu cần)
```bash
python manage.py createsuperuser
```

### Bước 4: Chạy Development Server
```bash
python manage.py runserver
```

Server sẽ chạy tại: **http://localhost:8000**

### Bước 5: Truy cập ứng dụng
- **Frontend**: http://localhost:8000
- **Admin Panel**: http://localhost:8000/admin
- **API Docs**: http://localhost:8000/api/books/

## 📁 Cấu trúc File Frontend

```
book/
├── templates/
│   └── home.html              # Template HTML chính
├── static/
│   ├── css/
│   │   └── style.css          # Styling CSS
│   └── js/
│       └── app.js             # JavaScript API logic
└── views.py                   # View render template
```

## 🎨 Giao Diện & UX

### Màu Sắc
- Primary Color: #667eea (Xanh tím)
- Success Color: #28a745 (Xanh lá)
- Danger Color: #dc3545 (Đỏ)
- Warning Color: #ffc107 (Vàng)

### Responsive Design
- Desktop, Tablet, Mobile compatible
- Flexbox & CSS Grid layout
- Modal dialogs for details & editing

### UI Elements
- Filter form với live update
- Add book form
- Pagination controls
- Action buttons (Detail, Edit, Delete)
- Toast notifications
- Loading spinner

## 🔧 Cấu hình Backend

### CORS Configuration
File `book_manage/settings.py`:
```python
INSTALLED_APPS = [
    ...
    'corsheaders',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    ...
]

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:8000",
    "http://127.0.0.1:8000",
    "http://localhost:5500",
    "http://127.0.0.1:5500",
]
```

### API Routes
File `book_manage/urls.py`:
```python
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('book.urls')),    # API endpoints
    path('', include('book.urls')),        # Frontend routes
]
```

### Static Files
```python
STATIC_URL = '/static/'
STATICFILES_DIRS = [
    BASE_DIR / 'book' / 'static',
]
STATIC_ROOT = BASE_DIR / 'staticfiles'
```

## 📝 API Endpoints Chi Tiết

### Danh sách Sách (có phân trang & lọc)
```
GET /api/books/?page=1&page_size=20&title=Python&author=John
Response:
{
  "count": 3,
  "next": null,
  "previous": null,
  "results": [
    {
      "id": 1,
      "title": "Python Advanced",
      "author": "John Doe",
      "price": 290000,
      "quantity": 25,
      "published_date": "2026-06-15"
    },
    ...
  ]
}
```

### Thêm Sách
```
POST /api/books/
{
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "price": 350000,
  "quantity": 15
}
```

### Xem Chi Tiết
```
GET /api/books/3/
Response:
{
  "id": 3,
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "price": 350000,
  "quantity": 15,
  "published_date": "2026-06-15"
}
```

### Cập Nhật Sách
```
PUT /api/books/3/
{
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "price": 380000,
  "quantity": 15
}
```

### Xóa Sách
```
DELETE /api/books/2/
Status: 204 No Content
```

## 🧪 Hàm JavaScript Chính

### Fetch & Display
- `fetchBooks()` - Lấy danh sách sách từ API
- `displayBooks(books)` - Hiển thị sách trong bảng
- `updatePagination(data)` - Cập nhật info phân trang

### CRUD Operations
- `handleAddBook(e)` - Thêm sách mới (POST)
- `editBook(bookId)` - Mở form chỉnh sửa
- `handleEditBook(e)` - Lưu chỉnh sửa (PUT)
- `deleteBook(bookId)` - Xóa sách (DELETE)
- `viewDetail(bookId)` - Xem chi tiết

### Filter & Search
- `applyFilters()` - Áp dụng filter
- `resetFilters()` - Đặt lại filter

### Pagination
- `goToPreviousPage()` - Trang trước
- `goToNextPage()` - Trang sau
- `changePageSize()` - Đổi số record/trang

### Utility
- `showNotification()` - Hiển thị thông báo
- `formatPrice()` - Format giá tiền VND
- `formatDate()` - Format ngày tháng
- `escapeHtml()` - Escape HTML entities

## 📸 Screenshot

Danh sách sách đã được hiển thị thành công với tất cả chức năng:
- Bảng danh sách với Title, Author, Price, Quantity
- Action buttons: Detail (👁️), Edit (✏️), Delete (🗑️)
- Pagination controls
- Filter form
- Add book form
- Total books counter: "Trang 1 / 1 (Tổng: 2 sách)"

## ✨ Các Tính Năng Bổ Sung

1. **Notification Toast** - Thông báo thành công/lỗi
2. **Loading Spinner** - Hiển thị khi đang load
3. **XSS Protection** - Escape HTML entities
4. **Error Handling** - Catch và hiển thị lỗi API
5. **Responsive Design** - Tương thích mobile
6. **Pagination Info** - Hiển thị trang hiện tại & tổng số records
7. **Form Validation** - Kiểm tra dữ liệu đầu vào
8. **Modal Dialogs** - Chi tiết và chỉnh sửa trong modal
9. **Smooth Animations** - CSS animations cho UX tốt hơn
10. **Vietnamese Localization** - Giao diện tiếng Việt

## 📚 References

- Django REST Framework: https://www.django-rest-framework.org/
- Django: https://docs.djangoproject.com/
- Fetch API: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
- CSS Grid & Flexbox: https://developer.mozilla.org/en-US/docs/Web/CSS

## 🎯 Tổng Kết

✅ Hoàn thành **tất cả** 7 yêu cầu của Bài Tập 5:
1. ✅ Hiển thị danh sách sách
2. ✅ Phân trang dữ liệu
3. ✅ Tìm kiếm và filter
4. ✅ Thêm sách mới
5. ✅ Xem chi tiết sách
6. ✅ Cập nhật sách
7. ✅ Xóa sách

Giao diện đẹp, UX tốt, tích hợp hoàn toàn với Backend API.
