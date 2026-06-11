"""
Test Script cho Book API
Sử dụng requests library để test các endpoints

Cài đặt: pip install requests
"""

import requests
import json
from datetime import datetime

BASE_URL = "http://localhost:8000/api"
USERNAME = "admin"  # Thay đổi username của bạn
PASSWORD = "admin"  # Thay đổi password của bạn


class BookAPITester:
    def __init__(self, base_url=BASE_URL):
        self.base_url = base_url
        self.token = None
        self.headers = None
    
    def get_token(self, username=USERNAME, password=PASSWORD):
        """Lấy JWT token"""
        url = f"{self.base_url}/token/"
        data = {
            "username": username,
            "password": password
        }
        
        try:
            response = requests.post(url, json=data)
            if response.status_code == 200:
                result = response.json()
                self.token = result['access']
                self.headers = {
                    'Authorization': f'Bearer {self.token}',
                    'Content-Type': 'application/json'
                }
                print("✓ Token lấy thành công!")
                return True
            else:
                print(f"✗ Lỗi lấy token: {response.status_code}")
                print(response.json())
                return False
        except Exception as e:
            print(f"✗ Lỗi: {e}")
            return False
    
    def test_create_book(self):
        """Test tạo sách mới"""
        print("\n" + "="*50)
        print("TEST: Tạo sách mới (POST /api/books/)")
        print("="*50)
        
        url = f"{self.base_url}/books/"
        data = {
            "title": "Python Advanced Programming",
            "author": "Nguyen Van A",
            "price": 250000,
            "quantity": 15,
            "published_date": "2024-01-15"
        }
        
        try:
            response = requests.post(url, json=data, headers=self.headers)
            print(f"Status Code: {response.status_code}")
            print(f"Response:\n{json.dumps(response.json(), indent=2)}")
            
            if response.status_code == 201:
                print("✓ Tạo sách thành công!")
                return response.json()
            else:
                print("✗ Tạo sách thất bại!")
                return None
        except Exception as e:
            print(f"✗ Lỗi: {e}")
            return None
    
    def test_get_all_books_with_pagination(self):
        """Test lấy danh sách sách với phân trang"""
        print("\n" + "="*50)
        print("TEST: Lấy danh sách sách - Trang 1, 20 sách (GET /api/books/)")
        print("="*50)
        
        url = f"{self.base_url}/books/"
        params = {
            "page": 1,
            "page_size": 20
        }
        
        try:
            response = requests.get(url, params=params, headers=self.headers)
            print(f"Status Code: {response.status_code}")
            data = response.json()
            
            print(f"Tổng số sách: {data.get('count')}")
            print(f"Trang tiếp theo: {data.get('next')}")
            print(f"Số lượng sách trong trang: {len(data.get('results', []))}")
            print(f"\nChi tiết:\n{json.dumps(data, indent=2)}")
            
            if response.status_code == 200:
                print("✓ Lấy danh sách thành công!")
            else:
                print("✗ Lấy danh sách thất bại!")
        except Exception as e:
            print(f"✗ Lỗi: {e}")
    
    def test_get_all_books_page_size_100(self):
        """Test lấy danh sách sách với page_size=100"""
        print("\n" + "="*50)
        print("TEST: Lấy danh sách sách - Trang 1, 100 sách (GET /api/books/)")
        print("="*50)
        
        url = f"{self.base_url}/books/"
        params = {
            "page": 1,
            "page_size": 100
        }
        
        try:
            response = requests.get(url, params=params, headers=self.headers)
            print(f"Status Code: {response.status_code}")
            data = response.json()
            
            print(f"Tổng số sách: {data.get('count')}")
            print(f"Số lượng sách trong trang: {len(data.get('results', []))}")
            
            if response.status_code == 200:
                print("✓ Lấy danh sách thành công!")
            else:
                print("✗ Lấy danh sách thất bại!")
        except Exception as e:
            print(f"✗ Lỗi: {e}")
    
    def test_filter_by_title(self, title="Python"):
        """Test lọc sách theo tên"""
        print("\n" + "="*50)
        print(f"TEST: Lọc sách theo tên (title='{title}')")
        print("="*50)
        
        url = f"{self.base_url}/books/"
        params = {
            "title": title
        }
        
        try:
            response = requests.get(url, params=params, headers=self.headers)
            print(f"Status Code: {response.status_code}")
            data = response.json()
            
            print(f"Tìm thấy {data.get('count')} sách")
            print(f"Chi tiết:\n{json.dumps(data.get('results', []), indent=2)}")
            
            if response.status_code == 200:
                print("✓ Lọc thành công!")
            else:
                print("✗ Lọc thất bại!")
        except Exception as e:
            print(f"✗ Lỗi: {e}")
    
    def test_filter_by_author(self, author="Nguyen"):
        """Test lọc sách theo tác giả"""
        print("\n" + "="*50)
        print(f"TEST: Lọc sách theo tác giả (author='{author}')")
        print("="*50)
        
        url = f"{self.base_url}/books/"
        params = {
            "author": author
        }
        
        try:
            response = requests.get(url, params=params, headers=self.headers)
            print(f"Status Code: {response.status_code}")
            data = response.json()
            
            print(f"Tìm thấy {data.get('count')} sách")
            print(f"Chi tiết:\n{json.dumps(data.get('results', []), indent=2)}")
            
            if response.status_code == 200:
                print("✓ Lọc thành công!")
            else:
                print("✗ Lọc thất bại!")
        except Exception as e:
            print(f"✗ Lỗi: {e}")
    
    def test_filter_by_price_range(self, price_min=200000, price_max=400000):
        """Test lọc sách theo khoảng giá"""
        print("\n" + "="*50)
        print(f"TEST: Lọc sách theo giá ({price_min} - {price_max})")
        print("="*50)
        
        url = f"{self.base_url}/books/"
        params = {
            "price_min": price_min,
            "price_max": price_max
        }
        
        try:
            response = requests.get(url, params=params, headers=self.headers)
            print(f"Status Code: {response.status_code}")
            data = response.json()
            
            print(f"Tìm thấy {data.get('count')} sách")
            print(f"Chi tiết:\n{json.dumps(data.get('results', []), indent=2)}")
            
            if response.status_code == 200:
                print("✓ Lọc thành công!")
            else:
                print("✗ Lọc thất bại!")
        except Exception as e:
            print(f"✗ Lỗi: {e}")
    
    def test_filter_by_quantity_range(self, quantity_min=5, quantity_max=50):
        """Test lọc sách theo khoảng số lượng"""
        print("\n" + "="*50)
        print(f"TEST: Lọc sách theo số lượng ({quantity_min} - {quantity_max})")
        print("="*50)
        
        url = f"{self.base_url}/books/"
        params = {
            "quantity_min": quantity_min,
            "quantity_max": quantity_max
        }
        
        try:
            response = requests.get(url, params=params, headers=self.headers)
            print(f"Status Code: {response.status_code}")
            data = response.json()
            
            print(f"Tìm thấy {data.get('count')} sách")
            print(f"Chi tiết:\n{json.dumps(data.get('results', []), indent=2)}")
            
            if response.status_code == 200:
                print("✓ Lọc thành công!")
            else:
                print("✗ Lọc thất bại!")
        except Exception as e:
            print(f"✗ Lỗi: {e}")
    
    def test_combined_filters(self):
        """Test kết hợp nhiều filter"""
        print("\n" + "="*50)
        print("TEST: Kết hợp nhiều filter")
        print("="*50)
        
        url = f"{self.base_url}/books/"
        params = {
            "title": "Python",
            "author": "Nguyen",
            "price_min": 200000,
            "price_max": 400000,
            "quantity_min": 5,
            "page_size": 20
        }
        
        try:
            response = requests.get(url, params=params, headers=self.headers)
            print(f"Status Code: {response.status_code}")
            data = response.json()
            
            print(f"Filter: {params}")
            print(f"Tìm thấy {data.get('count')} sách")
            print(f"Chi tiết:\n{json.dumps(data.get('results', []), indent=2)}")
            
            if response.status_code == 200:
                print("✓ Lọc thành công!")
            else:
                print("✗ Lọc thất bại!")
        except Exception as e:
            print(f"✗ Lỗi: {e}")
    
    def test_get_book_detail(self, book_id=1):
        """Test lấy chi tiết sách"""
        print("\n" + "="*50)
        print(f"TEST: Lấy chi tiết sách (GET /api/books/{book_id}/)")
        print("="*50)
        
        url = f"{self.base_url}/books/{book_id}/"
        
        try:
            response = requests.get(url, headers=self.headers)
            print(f"Status Code: {response.status_code}")
            print(f"Response:\n{json.dumps(response.json(), indent=2)}")
            
            if response.status_code == 200:
                print("✓ Lấy chi tiết thành công!")
            else:
                print("✗ Lấy chi tiết thất bại!")
        except Exception as e:
            print(f"✗ Lỗi: {e}")
    
    def test_update_book(self, book_id=1):
        """Test cập nhật toàn bộ sách (PUT)"""
        print("\n" + "="*50)
        print(f"TEST: Cập nhật sách (PUT /api/books/{book_id}/)")
        print("="*50)
        
        url = f"{self.base_url}/books/{book_id}/"
        data = {
            "title": "Python Advanced - Updated",
            "author": "Nguyen Van A",
            "price": 280000,
            "quantity": 20,
            "published_date": "2024-03-10"
        }
        
        try:
            response = requests.put(url, json=data, headers=self.headers)
            print(f"Status Code: {response.status_code}")
            print(f"Response:\n{json.dumps(response.json(), indent=2)}")
            
            if response.status_code == 200:
                print("✓ Cập nhật thành công!")
            else:
                print("✗ Cập nhật thất bại!")
        except Exception as e:
            print(f"✗ Lỗi: {e}")
    
    def test_partial_update_book(self, book_id=1):
        """Test cập nhật một phần sách (PATCH)"""
        print("\n" + "="*50)
        print(f"TEST: Cập nhật một phần sách (PATCH /api/books/{book_id}/)")
        print("="*50)
        
        url = f"{self.base_url}/books/{book_id}/"
        data = {
            "price": 290000,
            "quantity": 25
        }
        
        try:
            response = requests.patch(url, json=data, headers=self.headers)
            print(f"Status Code: {response.status_code}")
            print(f"Response:\n{json.dumps(response.json(), indent=2)}")
            
            if response.status_code == 200:
                print("✓ Cập nhật thành công!")
            else:
                print("✗ Cập nhật thất bại!")
        except Exception as e:
            print(f"✗ Lỗi: {e}")
    
    def test_delete_book(self, book_id=1):
        """Test xóa sách"""
        print("\n" + "="*50)
        print(f"TEST: Xóa sách (DELETE /api/books/{book_id}/)")
        print("="*50)
        
        url = f"{self.base_url}/books/{book_id}/"
        
        try:
            response = requests.delete(url, headers=self.headers)
            print(f"Status Code: {response.status_code}")
            if response.text:
                print(f"Response:\n{json.dumps(response.json(), indent=2)}")
            
            if response.status_code == 204:
                print("✓ Xóa thành công!")
            else:
                print("✗ Xóa thất bại!")
        except Exception as e:
            print(f"✗ Lỗi: {e}")
    
    def run_all_tests(self):
        """Chạy tất cả các test"""
        print("\n" + "="*70)
        print("BOOK API TEST SUITE")
        print("="*70)
        
        # Lấy token
        if not self.get_token():
            print("\n✗ Không thể lấy token. Kiểm tra username/password!")
            return
        
        # Chạy các test
        self.test_create_book()
        self.test_get_all_books_with_pagination()
        self.test_get_all_books_page_size_100()
        self.test_filter_by_title("Python")
        self.test_filter_by_author("Nguyen")
        self.test_filter_by_price_range(200000, 400000)
        self.test_filter_by_quantity_range(5, 50)
        self.test_combined_filters()
        self.test_get_book_detail(1)
        self.test_update_book(1)
        self.test_partial_update_book(1)
        
        print("\n" + "="*70)
        print("KẾT THÚC TEST SUITE")
        print("="*70)


if __name__ == "__main__":
    tester = BookAPITester()
    tester.run_all_tests()
