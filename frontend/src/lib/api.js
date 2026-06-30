import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

export const api = axios.create({ baseURL: API });

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("cv_token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export const authApi = {
    register: (data) => api.post("/auth/register", data).then(r => r.data),
    login: (data) => api.post("/auth/login", data).then(r => r.data),
    me: () => api.get("/auth/me").then(r => r.data),
};

export const reportsApi = {
    upload: (file) => {
        const fd = new FormData();
        fd.append("file", file);
        return api.post("/credit-reports/upload", fd, {
            headers: { "Content-Type": "multipart/form-data" },
        }).then(r => r.data);
    },
    latest: () => api.get("/credit-reports/latest").then(r => r.data),
    list: () => api.get("/credit-reports").then(r => r.data),
    updateDispute: (analysisId, disputeId, status) =>
        api.patch(`/credit-reports/${analysisId}/disputes/${disputeId}`, { status }).then(r => r.data),
};
