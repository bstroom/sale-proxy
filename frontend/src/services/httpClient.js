import axios from 'axios';
import {TOKEN_KEY} from "../common/contanst";

const httpClient = axios.create({
    baseURL: 'https://proxylist.fun/api',
});

httpClient.interceptors.response.use((res) => {
    return res.data;
}, (err) => {
    if ([401].includes(err.response.status)) {
        localStorage.removeItem(TOKEN_KEY);
        window.location.reload();
    }
    return Promise.reject(err.response.data);
});

export function setToken(token) {
    httpClient.defaults.headers.common = {
        'Authorization' : `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
}

export default httpClient;