
import { useState } from 'react';

const AddBookForm = ({ onSubmit, loading }) => {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        price: '',
        quantity: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (
            !formData.title ||
            !formData.author ||
            !formData.price ||
            !formData.quantity
        ) {
            alert('Vui lòng nhập đầy đủ thông tin');
            return;
        }

        onSubmit({
            title: formData.title,
            author: formData.author,
            price: parseInt(formData.price),
            quantity: parseInt(formData.quantity)
        });

        setFormData({
            title: '',
            author: '',
            price: '',
            quantity: ''
        });
    };

    return (
        <div
            style={{
                background: '#ffffff',
                borderRadius: '12px',
                padding: '24px',
                marginBottom: '24px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
            }}
        >
            <h2
                style={{
                    marginBottom: '20px',
                    color: '#1976d2'
                }}
            >
                📚 Thêm Sách Mới
            </h2>

            <form onSubmit={handleSubmit}>
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns:
                            'repeat(auto-fit, minmax(250px, 1fr))',
                        gap: '16px'
                    }}
                >
                    <div>
                        <label>Tên sách</label>

                        <input
                            type="text"
                            name="title"
                            placeholder="Ví dụ: Django Advanced"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            style={{
                                width: '100%',
                                padding: '10px',
                                marginTop: '6px',
                                borderRadius: '6px',
                                border: '1px solid #ddd'
                            }}
                        />
                    </div>

                    <div>
                        <label>Tác giả</label>

                        <input
                            type="text"
                            name="author"
                            placeholder="Ví dụ: Nguyễn Văn A"
                            value={formData.author}
                            onChange={handleChange}
                            required
                            style={{
                                width: '100%',
                                padding: '10px',
                                marginTop: '6px',
                                borderRadius: '6px',
                                border: '1px solid #ddd'
                            }}
                        />
                    </div>

                    <div>
                        <label>Giá</label>

                        <input
                            type="number"
                            name="price"
                            placeholder="100000"
                            value={formData.price}
                            onChange={handleChange}
                            required
                            min="0"
                            style={{
                                width: '100%',
                                padding: '10px',
                                marginTop: '6px',
                                borderRadius: '6px',
                                border: '1px solid #ddd'
                            }}
                        />
                    </div>

                    <div>
                        <label>Số lượng</label>

                        <input
                            type="number"
                            name="quantity"
                            placeholder="10"
                            value={formData.quantity}
                            onChange={handleChange}
                            required
                            min="0"
                            style={{
                                width: '100%',
                                padding: '10px',
                                marginTop: '6px',
                                borderRadius: '6px',
                                border: '1px solid #ddd'
                            }}
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        marginTop: '20px',
                        padding: '12px 24px',
                        background: '#1976d2',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                    }}
                >
                    {loading
                        ? 'Đang thêm...'
                        : '➕ Thêm Sách'}
                </button>
            </form>
        </div>
    );
};

export default AddBookForm;
