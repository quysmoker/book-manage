import { useEffect, useState } from 'react';

export const EditModal = ({ book, onClose, onSubmit, loading }) => {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        price: '',
        quantity: ''
    });

    useEffect(() => {
        if (book) {
            setFormData({
                title: book.title,
                author: book.author,
                price: book.price,
                quantity: book.quantity
            });
        }
    }, [book]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.title || !formData.author || !formData.price || !formData.quantity) {
            alert('Vui lòng điền tất cả các trường');
            return;
        }

        onSubmit({
            title: formData.title,
            author: formData.author,
            price: parseInt(formData.price),
            quantity: parseInt(formData.quantity)
        });
    };

    if (!book) return null;

    return (
        <div className={`modal ${book ? 'active' : ''}`} onClick={(e) => {
            if (e.target.classList.contains('modal')) onClose();
        }}>
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Chỉnh Sửa Sách</h2>
                    <button className="modal-close" onClick={onClose}>×</button>
                </div>

                <form onSubmit={handleSubmit} className="form-container">
                    <div className="form-group">
                        <label htmlFor="edit-title">Tên sách *</label>
                        <input
                            type="text"
                            id="edit-title"
                            name="title"
                            placeholder="Nhập tên sách"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="edit-author">Tác giả *</label>
                        <input
                            type="text"
                            id="edit-author"
                            name="author"
                            placeholder="Nhập tên tác giả"
                            value={formData.author}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="edit-price">Giá *</label>
                        <input
                            type="number"
                            id="edit-price"
                            name="price"
                            placeholder="Nhập giá"
                            value={formData.price}
                            onChange={handleChange}
                            required
                            min="0"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="edit-quantity">Số lượng *</label>
                        <input
                            type="number"
                            id="edit-quantity"
                            name="quantity"
                            placeholder="Nhập số lượng"
                            value={formData.quantity}
                            onChange={handleChange}
                            required
                            min="0"
                        />
                    </div>

                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={onClose}
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            className="btn btn-success"
                            disabled={loading}
                        >
                            💾 Lưu
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditModal;
