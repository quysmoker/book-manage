import { useState } from 'react';

export const AddBookForm = ({ onSubmit, loading }) => {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        price: '',
        quantity: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation
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

        // Reset form
        setFormData({
            title: '',
            author: '',
            price: '',
            quantity: ''
        });
    };

    return (
        <div className="section" style={{ background: '#f0f7ff' }}>
            <h3>➕ Thêm Sách Mới</h3>
            <form onSubmit={handleSubmit} className="form-container">
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="title">Tên sách *</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            placeholder="Nhập tên sách"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="author">Tác giả *</label>
                        <input
                            type="text"
                            id="author"
                            name="author"
                            placeholder="Nhập tên tác giả"
                            value={formData.author}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="price">Giá *</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            placeholder="Nhập giá"
                            value={formData.price}
                            onChange={handleChange}
                            required
                            min="0"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="quantity">Số lượng *</label>
                        <input
                            type="number"
                            id="quantity"
                            name="quantity"
                            placeholder="Nhập số lượng"
                            value={formData.quantity}
                            onChange={handleChange}
                            required
                            min="0"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="btn btn-success"
                    disabled={loading}
                    style={{ alignSelf: 'flex-start' }}
                >
                    ➕ Thêm Sách
                </button>
            </form>
        </div>
    );
};

export default AddBookForm;
