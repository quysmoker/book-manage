import { useEffect, useState } from 'react';
import AddBookForm from './components/AddBookForm';
import BookList from './components/BookList';
import DetailModal from './components/DetailModal';
import EditModal from './components/EditModal';
import FilterForm from './components/FilterForm';
import Notification from './components/Notification';
import { bookService } from './services/bookService';
import './styles/index.css';

function App() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [totalCount, setTotalCount] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [filters, setFilters] = useState({});

    // Modal states
    const [selectedBook, setSelectedBook] = useState(null);
    const [editingBook, setEditingBook] = useState(null);

    // Notification states
    const [notification, setNotification] = useState({
        message: '',
        type: 'success',
        visible: false
    });

    // Fetch books
    const fetchBooks = async (page = 1, pageSize = 20, filters = {}) => {
        try {
            setLoading(true);
            const response = await bookService.getBooks(page, pageSize, filters);

            setBooks(response.data.results || response.data);
            setTotalCount(response.data.count || response.data.length);
            setTotalPages(Math.ceil((response.data.count || response.data.length) / pageSize));
            setCurrentPage(page);
        } catch (error) {
            console.error('Error fetching books:', error);
            showNotification('Lỗi khi tải danh sách sách', 'error');
        } finally {
            setLoading(false);
        }
    };

    // Initialize
    useEffect(() => {
        fetchBooks(1, pageSize, filters);
    }, []);

    // Handle filter
    const handleFilter = (newFilters) => {
        setFilters(newFilters);
        fetchBooks(1, pageSize, newFilters);
    };

    // Handle reset filter
    const handleResetFilter = () => {
        setFilters({});
        fetchBooks(1, pageSize, {});
    };

    // Handle add book
    const handleAddBook = async (formData) => {
        try {
            setLoading(true);
            await bookService.createBook(formData);
            showNotification('✅ Thêm sách thành công!', 'success');
            fetchBooks(1, pageSize, filters);
        } catch (error) {
            console.error('Error adding book:', error);
            showNotification('❌ Lỗi khi thêm sách', 'error');
        } finally {
            setLoading(false);
        }
    };

    // Handle delete book
    const handleDeleteBook = async (bookId) => {
        if (!window.confirm('Bạn có chắc chắn muốn xóa sách này?')) {
            return;
        }

        try {
            setLoading(true);
            await bookService.deleteBook(bookId);
            showNotification('✅ Xóa sách thành công!', 'success');
            fetchBooks(currentPage, pageSize, filters);
        } catch (error) {
            console.error('Error deleting book:', error);
            showNotification('❌ Lỗi khi xóa sách', 'error');
        } finally {
            setLoading(false);
        }
    };

    // Handle view detail
    const handleViewDetail = async (bookId) => {
        try {
            const response = await bookService.getBookDetail(bookId);
            setSelectedBook(response.data);
        } catch (error) {
            console.error('Error fetching book detail:', error);
            showNotification('❌ Lỗi khi tải chi tiết sách', 'error');
        }
    };

    // Handle edit book
    const handleEditBook = async (bookId) => {
        try {
            const response = await bookService.getBookDetail(bookId);
            setEditingBook(response.data);
        } catch (error) {
            console.error('Error fetching book for edit:', error);
            showNotification('❌ Lỗi khi tải thông tin sách', 'error');
        }
    };

    // Handle update book
    const handleUpdateBook = async (formData) => {
        try {
            setLoading(true);
            await bookService.updateBook(editingBook.id, formData);
            showNotification('✅ Cập nhật sách thành công!', 'success');
            setEditingBook(null);
            fetchBooks(currentPage, pageSize, filters);
        } catch (error) {
            console.error('Error updating book:', error);
            showNotification('❌ Lỗi khi cập nhật sách', 'error');
        } finally {
            setLoading(false);
        }
    };

    // Handle page change
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            fetchBooks(newPage, pageSize, filters);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    // Handle page size change
    const handlePageSizeChange = (newPageSize) => {
        setPageSize(newPageSize);
        fetchBooks(1, newPageSize, filters);
    };

    // Show notification
    const showNotification = (message, type = 'success') => {
        setNotification({
            message,
            type,
            visible: true
        });

        setTimeout(() => {
            setNotification(prev => ({ ...prev, visible: false }));
        }, 3000);
    };

    return (
        <div className="app-container">
            {/* Header */}
            <div className="app-header">
                <h1>📚 Book Management System</h1>
                <p>Quản lý danh sách sách của bạn</p>
            </div>

            {/* Filter Form */}
            <FilterForm
                onFilter={handleFilter}
                onReset={handleResetFilter}
                loading={loading}
            />

            {/* Add Book Form */}
            <AddBookForm
                onSubmit={handleAddBook}
                loading={loading}
            />

            {/* Book List */}
            <BookList
                books={books}
                loading={loading}
                onEdit={handleEditBook}
                onDelete={handleDeleteBook}
                onDetail={handleViewDetail}
                currentPage={currentPage}
                pageSize={pageSize}
                totalCount={totalCount}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
            />

            {/* Modals */}
            <DetailModal
                book={selectedBook}
                onClose={() => setSelectedBook(null)}
            />

            <EditModal
                book={editingBook}
                onClose={() => setEditingBook(null)}
                onSubmit={handleUpdateBook}
                loading={loading}
            />

            {/* Notification */}
            <Notification
                message={notification.message}
                type={notification.type}
                visible={notification.visible}
            />
        </div>
    );
}

export default App;
