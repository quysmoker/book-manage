import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access');

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

export const bookService = {
    getBooks: (page = 1, pageSize = 20, filters = {}) => {
        const params = {
            page,
            page_size: pageSize,
            ...filters,
        };

        return apiClient.get('/books/', { params });
    },

    getBookDetail: (id) => {
        return apiClient.get(`/books/${id}/`);
    },

    createBook: (data) => {
        return apiClient.post('/books/', data);
    },

    updateBook: (id, data) => {
        return apiClient.put(`/books/${id}/`, data);
    },

    partialUpdateBook: (id, data) => {
        return apiClient.patch(`/books/${id}/`, data);
    },

    deleteBook: (id) => {
        return apiClient.delete(`/books/${id}/`);
    },
};

export default apiClient;
