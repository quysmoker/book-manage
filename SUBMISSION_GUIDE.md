# Hướng dẫn Nộp Bài - Book API

## 📋 Yêu cầu nộp bài

### 1. Link GitHub Source Code

Bạn cần:
- Tạo repository trên GitHub
- Push code lên GitHub
- Cung cấp link repository

**Các file quan trọng để push:**

```
book_manage/
├── book/
│   ├── models.py
│   ├── serializers.py
│   ├── views.py
│   ├── pagination.py          ← NEW
│   ├── urls.py
│   └── migrations/
├── book_manage/
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── manage.py
├── requirements.txt
├── README.md
├── QUICK_START.md
├── API_DOCUMENTATION.md
├── test_api.py
└── .gitignore                  ← IMPORTANT (để không push db.sqlite3)
```

**Tạo `.gitignore`:**

```bash
# File: e:\book_manage\.gitignore
*.pyc
__pycache__/
*.egg-info/
dist/
build/
.env
db.sqlite3
venv/
env/
.vscode/
.idea/
*.sqlite3
*.db
.DS_Store
```

**Push lên GitHub:**

```bash
cd e:\book_manage

# Khởi tạo git repository
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Django Book API with pagination and custom filter"

# Add remote (thay YOUR_USERNAME và YOUR_REPO)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# Push
git branch -M main
git push -u origin main
```

---

### 2. Setup & Test API

#### Step 1: Chạy Server

Terminal 1:
```bash
cd e:\book_manage
python manage.py runserver
```

Output sẽ là:
```
Starting development server at http://127.0.0.1:8000/
```

#### Step 2: Tạo Dữ Liệu Test

Terminal 2:
```bash
cd e:\book_manage
python test_api.py
```

Hoặc tạo thủ công bằng curl:

```bash
# Lấy token
$response = curl -s -X POST http://localhost:8000/api/token/ `
  -H "Content-Type: application/json" `
  -d '{"username":"admin","password":"admin"}'

# Tạo sách
curl -X POST http://localhost:8000/api/books/ `
  -H "Authorization: Bearer YOUR_TOKEN" `
  -H "Content-Type: application/json" `
  -d '{
    "title": "Python Programming",
    "author": "Guido van Rossum",
    "price": 250000,
    "quantity": 15,
    "published_date": "2023-01-15"
  }'
```

#### Step 3: Test bằng Postman hoặc Browser

---

## 📸 Screenshots Cần Chụp

### 2. Screenshot API Danh Sách có Pagination

**Request:**
```
GET /api/books/?page=1&page_size=20
Authorization: Bearer <token>
```

**Cách chụp:**

**Option 1: Postman**
1. Mở Postman
2. GET request: `http://localhost:8000/api/books/?page=1&page_size=20`
3. Add header: `Authorization: Bearer <token>`
4. Click "Send"
5. Chụp screenshot response (hiển thị count, next, previous, results)

**Option 2: Browser**
1. Vào: `http://localhost:8000/api/books/?page=1&page_size=20`
2. Đăng nhập nếu cần
3. Chụp screenshot

**Option 3: curl & Terminal**
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  "http://localhost:8000/api/books/?page=1&page_size=20" | python -m json.tool
```

**Chứa:** count, next, previous, results[]

---

### 3. Screenshot Filter theo Title hoặc Author

**Request 1: Filter by Title**
```
GET /api/books/?title=Python
Authorization: Bearer <token>
```

**Request 2: Filter by Author**
```
GET /api/books/?author=Nguyen
Authorization: Bearer <token>
```

**Cách chụp:**

**Postman:**
1. GET request: `http://localhost:8000/api/books/?title=Python`
2. Add Authorization header
3. Send & capture screenshot
4. Lặp lại với `?author=Nguyen`

**curl:**
```bash
# Filter by title
curl -H "Authorization: Bearer YOUR_TOKEN" \
  "http://localhost:8000/api/books/?title=Python" | python -m json.tool

# Filter by author
curl -H "Authorization: Bearer YOUR_TOKEN" \
  "http://localhost:8000/api/books/?author=Nguyen" | python -m json.tool
```

**Chứa:** Danh sách sách lọc theo title hoặc author

---

### 4. Screenshot Filter theo Price hoặc Quantity

**Request 1: Filter by Price Range**
```
GET /api/books/?price_min=200000&price_max=400000
Authorization: Bearer <token>
```

**Request 2: Filter by Quantity Range**
```
GET /api/books/?quantity_min=5&quantity_max=50
Authorization: Bearer <token>
```

**Cách chụp:**

**Postman:**
1. GET: `http://localhost:8000/api/books/?price_min=200000&price_max=400000`
2. Send & capture
3. Lặp lại với quantity filter

**curl:**
```bash
# Filter by price
curl -H "Authorization: Bearer YOUR_TOKEN" \
  "http://localhost:8000/api/books/?price_min=200000&price_max=400000" | python -m json.tool

# Filter by quantity
curl -H "Authorization: Bearer YOUR_TOKEN" \
  "http://localhost:8000/api/books/?quantity_min=5&quantity_max=50" | python -m json.tool
```

**Chứa:** Danh sách sách trong khoảng giá/số lượng

---

### 5. Screenshot Test API (Postman hoặc Browser)

Chụp đầy đủ các operation:

**1. GET Token**
```
POST /api/token/
{
  "username": "admin",
  "password": "admin"
}
```

Screenshot: Hiển thị access token

**2. POST Create Book**
```
POST /api/books/
Authorization: Bearer <token>
{
  "title": "Django REST Framework",
  "author": "Tom Christie",
  "price": 350000,
  "quantity": 20
}
```

Screenshot: Hiển thị book được tạo (id, title, author, price, quantity)

**3. GET List Books**
```
GET /api/books/?page_size=100
Authorization: Bearer <token>
```

Screenshot: Danh sách sách, phân trang, metadata

**4. GET Detail**
```
GET /api/books/1/
Authorization: Bearer <token>
```

Screenshot: Chi tiết 1 sách

**5. PUT Update**
```
PUT /api/books/1/
Authorization: Bearer <token>
{
  "title": "Django REST Framework - Updated",
  "author": "Tom Christie",
  "price": 380000,
  "quantity": 25
}
```

Screenshot: Sách được cập nhật

**6. PATCH Partial Update**
```
PATCH /api/books/1/
Authorization: Bearer <token>
{
  "price": 390000
}
```

Screenshot: Giá được cập nhật

**7. DELETE**
```
DELETE /api/books/1/
Authorization: Bearer <token>
```

Screenshot: 204 No Content / Success message

---

## 🎯 Hướng dẫn Step-by-Step để Chụp Screenshot

### Sử dụng Postman (Recommend)

1. **Download Postman**: https://www.postman.com/downloads/

2. **Lấy Token:**
   - NEW → HTTP Request
   - Method: POST
   - URL: `http://localhost:8000/api/token/`
   - Body → raw → JSON:
     ```json
     {
       "username": "admin",
       "password": "admin"
     }
     ```
   - Send
   - Copy token từ response
   - Screenshot

3. **Test GET /api/books/ (Pagination)**
   - NEW → HTTP Request
   - Method: GET
   - URL: `http://localhost:8000/api/books/?page=1&page_size=20`
   - Headers → Add:
     - Key: `Authorization`
     - Value: `Bearer {YOUR_TOKEN}`
   - Send
   - Screenshot response

4. **Test Filter by Title**
   - URL: `http://localhost:8000/api/books/?title=Python`
   - Headers: Authorization header
   - Send & Screenshot

5. **Test Filter by Author**
   - URL: `http://localhost:8000/api/books/?author=Nguyen`
   - Send & Screenshot

6. **Test Filter by Price**
   - URL: `http://localhost:8000/api/books/?price_min=200000&price_max=400000`
   - Send & Screenshot

7. **Test Filter by Quantity**
   - URL: `http://localhost:8000/api/books/?quantity_min=5&quantity_max=50`
   - Send & Screenshot

8. **Test POST (Create)**
   - Method: POST
   - URL: `http://localhost:8000/api/books/`
   - Headers: Authorization
   - Body → raw → JSON:
     ```json
     {
       "title": "New Book",
       "author": "Author Name",
       "price": 300000,
       "quantity": 10
     }
     ```
   - Send & Screenshot

9. **Test PUT (Update)**
   - Method: PUT
   - URL: `http://localhost:8000/api/books/1/`
   - Body với dữ liệu mới
   - Send & Screenshot

10. **Test PATCH (Partial Update)**
    - Method: PATCH
    - URL: `http://localhost:8000/api/books/1/`
    - Body chỉ có trường cần update:
      ```json
      {
        "price": 350000
      }
      ```
    - Send & Screenshot

11. **Test DELETE**
    - Method: DELETE
    - URL: `http://localhost:8000/api/books/1/`
    - Send & Screenshot (sẽ thấy 204 No Content)

---

## 📝 Nội dung Bài Nộp

Chuẩn bị folder với:

```
Submission/
├── README.md (link GitHub, mô tả)
├── Screenshots/
│   ├── 1_pagination.png
│   ├── 2_filter_title.png
│   ├── 3_filter_author.png
│   ├── 4_filter_price.png
│   ├── 5_filter_quantity.png
│   ├── 6_postman_token.png
│   ├── 7_postman_create.png
│   ├── 8_postman_list.png
│   ├── 9_postman_detail.png
│   ├── 10_postman_update.png
│   ├── 11_postman_patch.png
│   └── 12_postman_delete.png
└── GitHub_Link.txt

GitHub Link: https://github.com/YOUR_USERNAME/YOUR_REPO
```

---

## 🔗 GitHub Setup (Chi Tiết)

### 1. Tạo Repository trên GitHub

1. Vào https://github.com/new
2. Repository name: `book-manage-api` (hoặc tên khác)
3. Description: `Django REST API for Book Management with pagination and custom filters`
4. Public (để người khác xem được)
5. Add `.gitignore`: Python
6. Create repository

### 2. Clone & Push Code

```bash
# Clone repository vừa tạo
git clone https://github.com/YOUR_USERNAME/book-manage-api.git
cd book-manage-api

# Copy files từ e:\book_manage
# (Copy tất cả files trừ db.sqlite3, __pycache__, *.pyc)

# Commit
git add .
git commit -m "Add Book API with custom pagination and filter"

# Push
git push origin main
```

### 3. Cấu Trúc GitHub Repository

```
book-manage-api/
├── book/
│   ├── migrations/
│   ├── __init__.py
│   ├── admin.py
│   ├── apps.py
│   ├── models.py
│   ├── pagination.py
│   ├── serializers.py
│   ├── tests.py
│   ├── urls.py
│   ├── views.py
│   └── validate/
├── book_manage/
│   ├── __init__.py
│   ├── asgi.py
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── .gitignore
├── manage.py
├── requirements.txt
├── README.md
├── QUICK_START.md
├── API_DOCUMENTATION.md
├── USAGE.md
├── IMPLEMENTATION_SUMMARY.md
├── test_api.py
└── test_api.sh
```

---

## ✅ Checklist Nộp Bài

- [ ] Migrate database (SQLite)
- [ ] Tạo superuser
- [ ] Chạy server: `python manage.py runserver`
- [ ] Tạo dữ liệu test (tối thiểu 5 sách)
- [ ] Screenshot pagination (20 và 100 records/trang)
- [ ] Screenshot filter by title
- [ ] Screenshot filter by author
- [ ] Screenshot filter by price_min/max
- [ ] Screenshot filter by quantity_min/max
- [ ] Screenshot Postman: token
- [ ] Screenshot Postman: create book
- [ ] Screenshot Postman: list books
- [ ] Screenshot Postman: get detail
- [ ] Screenshot Postman: update (PUT)
- [ ] Screenshot Postman: partial update (PATCH)
- [ ] Screenshot Postman: delete
- [ ] Push code lên GitHub
- [ ] Chuẩn bị file README.md
- [ ] Nộp link GitHub + screenshots

---

## 📞 Lệnh Quick Reference

```bash
# Start server
python manage.py runserver

# Create superuser
python manage.py createsuperuser

# Run tests
python test_api.py

# Lint/Format (tùy chọn)
pip install black flake8
black .
flake8 .
```

---

**Xong! Bạn đã sẵn sàng nộp bài. 🎉**
