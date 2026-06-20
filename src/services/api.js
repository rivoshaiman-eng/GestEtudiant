import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8000/api"
});

// Ajouter le token d'authentification à chaque requête
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('student_app_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;