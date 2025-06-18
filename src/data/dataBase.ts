import axios from 'axios';

const api = axios.create({
    baseURL: 'https://diplom-64mc.onrender.com/',
    withCredentials: true,
});

export default api;
