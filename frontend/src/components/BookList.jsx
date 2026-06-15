
export const BookList = ({
    books,
    loading,
    onEdit,
    onDelete,
    onDetail,
    currentPage,
    pageSize,
    totalCount,
    totalPages,
    onPageChange,
    onPageSizeChange
}) => {
    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    };

    if (loading) {
        return (
            <div className="section">
                <h3>📖 Danh Sách Sách</h3>
                <div className="spinner active"></div>
            </div>
        );
    }

    if (books.length === 0) {
        return (
            <div className="section">
                <h3>📖 Danh Sách Sách</h3>
                <div className="empty-state">
                    <h3>📭 Không có sách nào</h3>
                    <p>Vui lòng thêm sách mới để bắt đầu</p>
                </div>
            </div>
        );
    }

    return (
        <div className="section">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <h3>📖 Danh Sách Sách</h3>
                <div className="page-size-selector">
                    <label>Hiển thị mỗi trang:</label>
                    <select value={pageSize} onChange={(e) => onPageSizeChange(parseInt(e.target.value))}>
                        <option value="20">20 record</option>
                        <option value="100">100 record</option>
                    </select>
                </div>
            </div>

            <div className="table-container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Tên Sách</th>
                            <th>Tác Giả</th>
                            <th>Giá</th>
                            <th>Số Lượng</th>
                            <th>Hành Động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((book) => (
                            <tr key={book.id}>
                                <td>{book.id}</td>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>{formatPrice(book.price)}</td>
                                <td>{book.quantity}</td>
                                <td>
                                    <div className="table-actions">
                                        <button
                                            className="btn btn-info"
                                            onClick={() => onDetail(book.id)}
                                            title="Xem chi tiết"
                                        >
                                            👁️ Chi tiết
                                        </button>
                                        <button
                                            className="btn btn-warning"
                                            onClick={() => onEdit(book.id)}
                                            title="Chỉnh sửa"
                                        >
                                            ✏️ Sửa
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => onDelete(book.id)}
                                            title="Xóa"
                                        >
                                            🗑️ Xóa
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="pagination-container">
                <button
                    className="btn btn-pagination"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    ◀ Trang trước
                </button>

                <div className="pagination-info">
                    Trang {currentPage} / {totalPages} (Tổng: {totalCount} sách)
                </div>

                <button
                    className="btn btn-pagination"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Trang sau ▶
                </button>
            </div>
        </div>
    );
};

export default BookList;
