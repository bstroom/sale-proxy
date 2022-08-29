import { trackPromise } from 'react-promise-tracker';
import httpClient, {setToken} from "../../services/httpClient";
import {TOKEN_KEY} from "../../common/contanst";


export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';

export const loginSuccessAction = (data) => ({
    type: LOGIN_SUCCESS,
    payload: data,
});

export const loginAction = (credentials) => async (dispatch) => {
    try {
        const { data } = await trackPromise(httpClient.post(`/auth/login`, credentials));
        localStorage.setItem(TOKEN_KEY, data.token);
        setToken(data.token);
        dispatch(loginSuccessAction({
            user: data.user,
            token: data.token
        }));
    } catch (err) {
        localStorage.removeItem(TOKEN_KEY);
        dispatch({
            type: LOGOUT
        });
    }
};

export const registerAction = (user, callback) => async (dispatch) => {
    try {
        const { data } = await trackPromise(httpClient.post(`/auth/register`, user));
        if (callback) {
            callback(null, data);
        }
    } catch (err) {
        callback(err);
    }
};

export const logoutAction = (user, callback) => async (dispatch) => {
    try {
        const { data } = await trackPromise(httpClient.post(`/auth/logout`));
    } finally {
        localStorage.removeItem(TOKEN_KEY);
        dispatch({
            type: LOGOUT
        });
    }
};
