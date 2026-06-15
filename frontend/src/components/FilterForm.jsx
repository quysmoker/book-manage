import { useState } from 'react';

export const FilterForm = ({ onFilter, onReset, loading }) => {
    const [filters, setFilters] = useState({
        title: '',
        author: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFilter = (e) => {
        e.preventDefault();
        onFilter(filters);
    };

    const handleReset = () => {
        setFilters({
            title: '',
            author: ''
        });
        onReset();
    };

    return (
        <div className="section">
            <h3>🔍 Tìm Kiếm & Lọc</h3>
            <form onSubmit={handleFilter} className="form-container">
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="title">Tên sách</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            placeholder="Nhập tên sách..."
                            value={filters.title}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="author">Tác giả</label>
                        <input
                            type="text"
                            id="author"
                            name="author"
                            placeholder="Nhập tên tác giả..."
                            value={filters.author}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="btn-group">
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading}
                    >
                        🔎 Tìm Kiếm
                    </button>
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={handleReset}
                        disabled={loading}
                    >
                        ↻ Đặt Lại
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FilterForm;
