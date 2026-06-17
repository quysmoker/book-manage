
import { useEffect, useState } from 'react';

import AddBookForm from './components/AddBookForm';
import BookList from './components/BookList';
import DetailModal from './components/DetailModal';
import EditModal from './components/EditModal';
import FilterForm from './components/FilterForm';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';

import { logout } from './services/authService';
import { bookService } from './services/bookService';

import './styles/index.css';

import './styles/index.css';

function App() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [totalCount, setTotalCount] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [filters, setFilters] = useState({});

    const [selectedBook, setSelectedBook] = useState(null);
    const [editingBook, setEditingBook] = useState(null);

    const [notification, setNotification] = useState({
        message: '',
        type: 'success',
        visible: false
    });

    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
    };

    const handleLogout = async () => {
        await logout();
        setIsLoggedIn(false);
    };

    const fetchBooks = async (page = 1, pageSize = 20, filters = {}) => {
        try {
            setLoading(true);

            const response = await bookService.getBooks(
                page,
                pageSize,
                filters
            );

            setBooks(response.data.results || response.data);
            setTotalCount(response.data.count || response.data.length);

            setTotalPages(
                Math.ceil(
                    (response.data.count || response.data.length) /
                    pageSize
                )
            );

            setCurrentPage(page);

        } catch (error) {
            console.error(error);

            showNotification(
                'Lỗi khi tải danh sách sách',
                'error'
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isLoggedIn) {
            fetchBooks(1, pageSize, filters);
        }
    }, [isLoggedIn]);

    const handleFilter = (newFilters) => {
        setFilters(newFilters);
        fetchBooks(1, pageSize, newFilters);
    };

    const handleResetFilter = () => {
        setFilters({});
        fetchBooks(1, pageSize, {});
    };

    const handleAddBook = async (formData) => {
        try {
            setLoading(true);

            await bookService.createBook(formData);

            showNotification(
                '✅ Thêm sách thành công!',
                'success'
            );

            fetchBooks(1, pageSize, filters);

        } catch (error) {
            console.error(error);

            showNotification(
                '❌ Lỗi khi thêm sách',
                'error'
            );
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteBook = async (bookId) => {

        if (!window.confirm(
            'Bạn có chắc chắn muốn xóa sách này?'
        )) {
            return;
        }

        try {
            setLoading(true);

            await bookService.deleteBook(bookId);

            showNotification(
                '✅ Xóa sách thành công!',
                'success'
            );

            fetchBooks(
                currentPage,
                pageSize,
                filters
            );

        } catch (error) {
            console.error(error);

            showNotification(
                '❌ Lỗi khi xóa sách',
                'error'
            );
        } finally {
            setLoading(false);
        }
    };

    const handleViewDetail = async (bookId) => {
        try {
            const response =
                await bookService.getBookDetail(bookId);

            setSelectedBook(response.data);

        } catch (error) {
            console.error(error);

            showNotification(
                '❌ Lỗi khi tải chi tiết sách',
                'error'
            );
        }
    };

    const handleEditBook = async (bookId) => {
        try {
            const response =
                await bookService.getBookDetail(bookId);

            setEditingBook(response.data);

        } catch (error) {
            console.error(error);

            showNotification(
                '❌ Lỗi khi tải thông tin sách',
                'error'
            );
        }
    };

    const handleUpdateBook = async (formData) => {
        try {
            setLoading(true);

            await bookService.updateBook(
                editingBook.id,
                formData
            );

            showNotification(
                '✅ Cập nhật sách thành công!',
                'success'
            );

            setEditingBook(null);

            fetchBooks(
                currentPage,
                pageSize,
                filters
            );

        } catch (error) {
            console.error(error);

            showNotification(
                '❌ Lỗi khi cập nhật sách',
                'error'
            );
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (newPage) => {
        if (
            newPage >= 1 &&
            newPage <= totalPages
        ) {
            fetchBooks(
                newPage,
                pageSize,
                filters
            );

            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    };

    const handlePageSizeChange = (newPageSize) => {
        setPageSize(newPageSize);

        fetchBooks(
            1,
            newPageSize,
            filters
        );
    };

    const showNotification = (
        message,
        type = 'success'
    ) => {

        setNotification({
            message,
            type,
            visible: true
        });

        setTimeout(() => {
            setNotification(prev => ({
                ...prev,
                visible: false
            }));
        }, 3000);
    };

    if (!isLoggedIn) {
        return (
            <LoginForm
                onLoginSuccess={
                    handleLoginSuccess
                }
            />
        );
    }

    return (
        <div className="app-container">


            <header className="app-header">
                <div>
                    <h1>📚 Book Management System</h1>
                    <p>Quản lý thư viện sách</p>
                </div>

                <button
                    className="btn btn-danger"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </header>



            <FilterForm
                onFilter={handleFilter}
                onReset={handleResetFilter}
                loading={loading}
            />

            <AddBookForm
                onSubmit={handleAddBook}
                loading={loading}
            />

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

            <DetailModal
                book={selectedBook}
                onClose={() =>
                    setSelectedBook(null)
                }
            />

            <EditModal
                book={editingBook}
                onClose={() =>
                    setEditingBook(null)
                }
                onSubmit={handleUpdateBook}
                loading={loading}
            />

            <Notification
                message={notification.message}
                type={notification.type}
                visible={notification.visible}
            />

        </div>
    );


}

export default App;
