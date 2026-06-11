import os
import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'book_manage.settings')
django.setup()

from django.contrib.auth.models import User

# Xóa admin user nếu tồn tại
User.objects.filter(username='admin').delete()

# Tạo user admin mới với password admin
User.objects.create_superuser('admin', 'admin@localhost.com', 'admin')
print("✓ Superuser 'admin' created with password 'admin'")
