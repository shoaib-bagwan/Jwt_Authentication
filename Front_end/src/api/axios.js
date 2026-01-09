import axios from "axios";
const api = axios.create({
    baseURL: "http://localhost:8000"
});
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
        console.log("TOKEN:", localStorage.getItem("token"));
        console.log("HEADERS:", config.headers);
    }
    return config
});
export default api;