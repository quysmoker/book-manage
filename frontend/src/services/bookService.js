import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Book Services
export const bookService = {
    // Get all books with pagination and filters
    getBooks: (page = 1, pageSize = 20, filters = {}) => {
        const params = {
            page,
            page_size: pageSize,
            ...filters,
        };
        return apiClient.get('/books/', { params });
    },

    // Get book detail
    getBookDetail: (id) => {
        return apiClient.get(`/books/${id}/`);
    },

    // Create new book
    createBook: (data) => {
        return apiClient.post('/books/', data);
    },

    // Update book (PUT)
    updateBook: (id, data) => {
        return apiClient.put(`/books/${id}/`, data);
    },

    // Partial update book (PATCH)
    partialUpdateBook: (id, data) => {
        return apiClient.patch(`/books/${id}/`, data);
    },

    // Delete book
    deleteBook: (id) => {
        return apiClient.delete(`/books/${id}/`);
    },
};

export default apiClient;
