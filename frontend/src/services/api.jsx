import axios from "axios";

const api = axios.create({
    baseURL: "https://url-shortner-8l3w.onrender.com",
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;