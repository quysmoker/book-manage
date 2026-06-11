#!/bin/bash

# API Test Script sử dụng curl
# Thay đổi BASE_URL, USERNAME, PASSWORD theo bạn

BASE_URL="http://localhost:8000/api"
USERNAME="admin"
PASSWORD="admin"

# Màu sắc cho output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}========================================${NC}"
echo -e "${YELLOW}BOOK API TEST${NC}"
echo -e "${YELLOW}========================================${NC}"

# 1. Lấy Token
echo -e "\n${YELLOW}[1] Lấy JWT Token${NC}"
TOKEN_RESPONSE=$(curl -s -X POST \
  "$BASE_URL/token/" \
  -H "Content-Type: application/json" \
  -d "{
    \"username\": \"$USERNAME\",
    \"password\": \"$PASSWORD\"
  }")

TOKEN=$(echo $TOKEN_RESPONSE | grep -o '"access":"[^"]*' | cut -d'"' -f4)

if [ -z "$TOKEN" ]; then
  echo -e "${RED}✗ Lỗi lấy token${NC}"
  echo $TOKEN_RESPONSE
  exit 1
else
  echo -e "${GREEN}✓ Token lấy thành công${NC}"
fi

# 2. Tạo sách mới
echo -e "\n${YELLOW}[2] Tạo sách mới (POST /api/books/)${NC}"
CREATE_RESPONSE=$(curl -s -X POST \
  "$BASE_URL/books/" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Python Advanced Programming",
    "author": "Nguyen Van A",
    "price": 250000,
    "quantity": 15,
    "published_date": "2024-01-15"
  }')

echo $CREATE_RESPONSE | python -m json.tool
echo -e "${GREEN}✓ Tạo sách thành công${NC}"

# 3. Lấy danh sách sách (20 sách/trang)
echo -e "\n${YELLOW}[3] Lấy danh sách sách - Trang 1, 20 sách${NC}"
curl -s -X GET \
  "$BASE_URL/books/?page=1&page_size=20" \
  -H "Authorization: Bearer $TOKEN" | python -m json.tool

# 4. Lấy danh sách sách (100 sách/trang)
echo -e "\n${YELLOW}[4] Lấy danh sách sách - Trang 1, 100 sách${NC}"
curl -s -X GET \
  "$BASE_URL/books/?page=1&page_size=100" \
  -H "Authorization: Bearer $TOKEN" | python -m json.tool

# 5. Lọc sách theo tên
echo -e "\n${YELLOW}[5] Lọc sách theo tên (title=Python)${NC}"
curl -s -X GET \
  "$BASE_URL/books/?title=Python" \
  -H "Authorization: Bearer $TOKEN" | python -m json.tool

# 6. Lọc sách theo tác giả
echo -e "\n${YELLOW}[6] Lọc sách theo tác giả (author=Nguyen)${NC}"
curl -s -X GET \
  "$BASE_URL/books/?author=Nguyen" \
  -H "Authorization: Bearer $TOKEN" | python -m json.tool

# 7. Lọc sách theo giá
echo -e "\n${YELLOW}[7] Lọc sách theo giá (200000-400000)${NC}"
curl -s -X GET \
  "$BASE_URL/books/?price_min=200000&price_max=400000" \
  -H "Authorization: Bearer $TOKEN" | python -m json.tool

# 8. Lọc sách theo số lượng
echo -e "\n${YELLOW}[8] Lọc sách theo số lượng (5-50)${NC}"
curl -s -X GET \
  "$BASE_URL/books/?quantity_min=5&quantity_max=50" \
  -H "Authorization: Bearer $TOKEN" | python -m json.tool

# 9. Kết hợp nhiều filter
echo -e "\n${YELLOW}[9] Kết hợp nhiều filter${NC}"
curl -s -X GET \
  "$BASE_URL/books/?title=Python&author=Nguyen&price_min=200000&price_max=400000&quantity_min=5&page_size=20" \
  -H "Authorization: Bearer $TOKEN" | python -m json.tool

# 10. Lấy chi tiết sách
echo -e "\n${YELLOW}[10] Lấy chi tiết sách (GET /api/books/1/)${NC}"
curl -s -X GET \
  "$BASE_URL/books/1/" \
  -H "Authorization: Bearer $TOKEN" | python -m json.tool

# 11. Cập nhật sách (PUT)
echo -e "\n${YELLOW}[11] Cập nhật sách (PUT /api/books/1/)${NC}"
curl -s -X PUT \
  "$BASE_URL/books/1/" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Python Advanced - Updated",
    "author": "Nguyen Van A",
    "price": 280000,
    "quantity": 20,
    "published_date": "2024-03-10"
  }' | python -m json.tool

# 12. Cập nhật một phần sách (PATCH)
echo -e "\n${YELLOW}[12] Cập nhật một phần sách (PATCH /api/books/1/)${NC}"
curl -s -X PATCH \
  "$BASE_URL/books/1/" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "price": 290000,
    "quantity": 25
  }' | python -m json.tool

# 13. Xóa sách
echo -e "\n${YELLOW}[13] Xóa sách (DELETE /api/books/1/)${NC}"
curl -s -X DELETE \
  "$BASE_URL/books/1/" \
  -H "Authorization: Bearer $TOKEN"

echo -e "\n${YELLOW}========================================${NC}"
echo -e "${YELLOW}KẾT THÚC TEST${NC}"
echo -e "${YELLOW}========================================${NC}"
