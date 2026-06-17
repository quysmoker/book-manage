import axios from "axios";

const API_URL = "http://localhost:8000/api";

export const login = async (username, password) => {
    const response = await axios.post(`${API_URL}/token/`, {
        username,
        password,
    });

    localStorage.setItem("access", response.data.access);
    localStorage.setItem("refresh", response.data.refresh);

    return response.data;
};

export const logout = async () => {
    try {
        await axios.post(`${API_URL}/logout/`);
    } catch (error) {
        console.log(error);
    }

    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
};

export const isAuthenticated = () => {
    return !!localStorage.getItem("access");
};
