// API Configuration
const API_BASE_URL = 'http://localhost:8000/api';
const BOOKS_ENDPOINT = `${API_BASE_URL}/books/`;

// State management
let currentPage = 1;
let pageSize = 20;
let totalPages = 1;
let currentFilters = {};

// Initialize
document.addEventListener('DOMContentLoaded', function () {
    fetchBooks();
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    // Add book form submission
    document.getElementById('addBookForm').addEventListener('submit', handleAddBook);

    // Edit book form submission
    document.getElementById('editBookForm').addEventListener('submit', handleEditBook);

    // Modal close on outside click
    window.addEventListener('click', function (event) {
        const editModal = document.getElementById('editModal');
        const detailModal = document.getElementById('detailModal');

        if (event.target === editModal) {
            closeEditModal();
        }
        if (event.target === detailModal) {
            closeDetailModal();
        }
    });
}

// Fetch books from API
async function fetchBooks() {
    try {
        showLoadingSpinner(true);

        // Build URL with query parameters
        const params = new URLSearchParams();
        params.append('page', currentPage);
        params.append('page_size', pageSize);

        // Add filters
        if (currentFilters.title) {
            params.append('title', currentFilters.title);
        }
        if (currentFilters.author) {
            params.append('author', currentFilters.author);
        }

        const url = `${BOOKS_ENDPOINT}?${params.toString()}`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Handle pagination response
        if (data.results) {
            // Results come from paginated API
            displayBooks(data.results);
            updatePagination(data);
        } else if (Array.isArray(data)) {
            // Results is an array (for compatibility)
            displayBooks(data);
        }

        showLoadingSpinner(false);
    } catch (error) {
        console.error('Error fetching books:', error);
        showNotification('Lỗi khi tải danh sách sách', 'error');
        showLoadingSpinner(false);
    }
}

// Display books in table
function displayBooks(books) {
    const tableBody = document.getElementById('booksTableBody');
    const emptyMessage = document.getElementById('emptyMessage');
    const table = document.getElementById('booksTable');

    if (books.length === 0) {
        tableBody.innerHTML = '';
        emptyMessage.style.display = 'block';
        table.style.display = 'none';
        return;
    }

    table.style.display = 'table';
    emptyMessage.style.display = 'none';

    tableBody.innerHTML = books.map(book => `
        <tr>
            <td>${book.id}</td>
            <td>${escapeHtml(book.title)}</td>
            <td>${escapeHtml(book.author)}</td>
            <td>${formatPrice(book.price)}</td>
            <td>${book.quantity}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-info" onclick="viewDetail(${book.id})">👁️ Chi tiết</button>
                    <button class="btn btn-warning" onclick="editBook(${book.id})">✏️ Chỉnh sửa</button>
                    <button class="btn btn-danger" onclick="deleteBook(${book.id})">🗑️ Xóa</button>
                </div>
            </td>
        </tr>
    `).join('');
}

// Update pagination info
function updatePagination(data) {
    // API response structure
    const count = data.count || 0;
    const next = data.next || null;
    const previous = data.previous || null;

    totalPages = Math.ceil(count / pageSize);

    // Update page info
    document.getElementById('pageInfo').textContent = `Trang ${currentPage} / ${totalPages} (Tổng: ${count} sách)`;

    // Update button states
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    prevBtn.disabled = !previous;
    nextBtn.disabled = !next;
}

// Add new book
async function handleAddBook(e) {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const price = parseInt(document.getElementById('price').value);
    const quantity = parseInt(document.getElementById('quantity').value);

    if (!title || !author || !price || !quantity) {
        showNotification('Vui lòng điền tất cả các trường', 'warning');
        return;
    }

    try {
        const response = await fetch(BOOKS_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title,
                author,
                price,
                quantity
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        showNotification('✅ Thêm sách thành công!', 'success');
        document.getElementById('addBookForm').reset();
        currentPage = 1;
        fetchBooks();
    } catch (error) {
        console.error('Error adding book:', error);
        showNotification('❌ Lỗi khi thêm sách', 'error');
    }
}

// View book detail
async function viewDetail(bookId) {
    try {
        const response = await fetch(`${BOOKS_ENDPOINT}${bookId}/`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const book = await response.json();

        const detailContent = document.getElementById('detailContent');
        detailContent.innerHTML = `
            <div class="detail-row">
                <strong>ID:</strong>
                <span>${book.id}</span>
            </div>
            <div class="detail-row">
                <strong>Tên sách:</strong>
                <span>${escapeHtml(book.title)}</span>
            </div>
            <div class="detail-row">
                <strong>Tác giả:</strong>
                <span>${escapeHtml(book.author)}</span>
            </div>
            <div class="detail-row">
                <strong>Giá:</strong>
                <span>${formatPrice(book.price)}</span>
            </div>
            <div class="detail-row">
                <strong>Số lượng:</strong>
                <span>${book.quantity}</span>
            </div>
            <div class="detail-row">
                <strong>Ngày xuất bản:</strong>
                <span>${formatDate(book.published_date)}</span>
            </div>
        `;

        openDetailModal();
    } catch (error) {
        console.error('Error fetching book detail:', error);
        showNotification('❌ Lỗi khi tải chi tiết sách', 'error');
    }
}

// Edit book
async function editBook(bookId) {
    try {
        const response = await fetch(`${BOOKS_ENDPOINT}${bookId}/`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const book = await response.json();

        document.getElementById('editBookId').value = book.id;
        document.getElementById('editTitle').value = book.title;
        document.getElementById('editAuthor').value = book.author;
        document.getElementById('editPrice').value = book.price;
        document.getElementById('editQuantity').value = book.quantity;

        openEditModal();
    } catch (error) {
        console.error('Error fetching book for edit:', error);
        showNotification('❌ Lỗi khi tải thông tin sách', 'error');
    }
}

// Handle edit book form submission
async function handleEditBook(e) {
    e.preventDefault();

    const bookId = document.getElementById('editBookId').value;
    const title = document.getElementById('editTitle').value;
    const author = document.getElementById('editAuthor').value;
    const price = parseInt(document.getElementById('editPrice').value);
    const quantity = parseInt(document.getElementById('editQuantity').value);

    if (!title || !author || !price || !quantity) {
        showNotification('Vui lòng điền tất cả các trường', 'warning');
        return;
    }

    try {
        const response = await fetch(`${BOOKS_ENDPOINT}${bookId}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title,
                author,
                price,
                quantity
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        showNotification('✅ Cập nhật sách thành công!', 'success');
        closeEditModal();
        fetchBooks();
    } catch (error) {
        console.error('Error updating book:', error);
        showNotification('❌ Lỗi khi cập nhật sách', 'error');
    }
}

// Delete book
async function deleteBook(bookId) {
    if (!confirm('Bạn có chắc chắn muốn xóa sách này?')) {
        return;
    }

    try {
        const response = await fetch(`${BOOKS_ENDPOINT}${bookId}/`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        showNotification('✅ Xóa sách thành công!', 'success');
        fetchBooks();
    } catch (error) {
        console.error('Error deleting book:', error);
        showNotification('❌ Lỗi khi xóa sách', 'error');
    }
}

// Filter and Search
function applyFilters() {
    currentFilters.title = document.getElementById('titleFilter').value;
    currentFilters.author = document.getElementById('authorFilter').value;
    currentPage = 1;
    fetchBooks();
}

function resetFilters() {
    document.getElementById('titleFilter').value = '';
    document.getElementById('authorFilter').value = '';
    currentFilters = {};
    currentPage = 1;
    fetchBooks();
}

// Change page size
function changePageSize() {
    pageSize = parseInt(document.getElementById('pageSize').value);
    currentPage = 1;
    fetchBooks();
}

// Pagination
function goToPreviousPage() {
    if (currentPage > 1) {
        currentPage--;
        fetchBooks();
        scrollToTop();
    }
}

function goToNextPage() {
    if (currentPage < totalPages) {
        currentPage++;
        fetchBooks();
        scrollToTop();
    }
}

// Modal functions
function openEditModal() {
    document.getElementById('editModal').classList.add('show');
}

function closeEditModal() {
    document.getElementById('editModal').classList.remove('show');
    document.getElementById('editBookForm').reset();
}

function openDetailModal() {
    document.getElementById('detailModal').classList.add('show');
}

function closeDetailModal() {
    document.getElementById('detailModal').classList.remove('show');
}

// Utility functions
function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification show ${type}`;

    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

function showLoadingSpinner(show) {
    const spinner = document.getElementById('loadingSpinner');
    if (show) {
        spinner.classList.add('show');
    } else {
        spinner.classList.remove('show');
    }
}

function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(price);
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('vi-VN', options);
}

function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
