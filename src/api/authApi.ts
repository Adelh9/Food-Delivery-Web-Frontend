import axios from "axios";
import Qs from "qs";

const BASE_URL = 'https://food-delivery.kreosoft.ru/api';

const authApi = axios.create({
    baseURL: BASE_URL,
    withCredentials: false,
    paramsSerializer: params => Qs.stringify(params, {arrayFormat: 'repeat'})
});
authApi.defaults.headers.common['Content-Type'] = 'application/json';
authApi.defaults.headers.common['Accept'] = 'application/json';

/// youremail@example.com
/// youremail1

authApi.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('jwt');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },

    (error) => {
        return Promise.reject(error);
    }
);

export default authApi;
