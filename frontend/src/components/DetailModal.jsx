
export const DetailModal = ({ book, onClose }) => {
    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString('vi-VN', options);
    };

    if (!book) return null;

    return (
        <div className={`modal ${book ? 'active' : ''}`} onClick={(e) => {
            if (e.target.classList.contains('modal')) onClose();
        }}>
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Chi Tiết Sách</h2>
                    <button className="modal-close" onClick={onClose}>×</button>
                </div>

                <div className="modal-body">
                    <div className="detail-row">
                        <strong>ID:</strong>
                        <span>{book.id}</span>
                    </div>

                    <div className="detail-row">
                        <strong>Tên sách:</strong>
                        <span>{book.title}</span>
                    </div>

                    <div className="detail-row">
                        <strong>Tác giả:</strong>
                        <span>{book.author}</span>
                    </div>

                    <div className="detail-row">
                        <strong>Giá:</strong>
                        <span>{formatPrice(book.price)}</span>
                    </div>

                    <div className="detail-row">
                        <strong>Số lượng:</strong>
                        <span>{book.quantity}</span>
                    </div>

                    <div className="detail-row">
                        <strong>Ngày xuất bản:</strong>
                        <span>{formatDate(book.published_date)}</span>
                    </div>
                </div>

                <div className="modal-footer">
                    <button className="btn btn-secondary" onClick={onClose}>Đóng</button>
                </div>
            </div>
        </div>
    );
};

export default DetailModal;
