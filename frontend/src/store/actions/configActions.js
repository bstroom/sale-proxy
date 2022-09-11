import { trackPromise } from 'react-promise-tracker';
import httpClient from "../../services/httpClient";

export const GET_CONFIG_SUCCESS = 'GET_CONFIG_SUCCESS';

export const createConfigAction = (formData, callback, errorCallback) => async (dispatch) => {
    try {
        const {data} = await trackPromise(httpClient.post(`/configs`, formData));
        
        if(callback && data) {
            callback();
        } else {
            errorCallback()
        }
    } catch (err) {
        errorCallback()
    }
};

export const editConfigAction = (id, formData, callback, errorCallback) => async (dispatch) => {
    try {
        const {data} = await trackPromise(httpClient.put(`/configs/${id}`, formData));

        if(callback && data) {
            callback();
        } else {
            errorCallback()
        }
    } catch (err) {
        errorCallback()
    }
};

export const getConfigAction = (id, callback) => async (dispatch) => {
    try {
        const {data} = await httpClient.get(`/configs/${id}`);
        if (callback && data) {
            callback(data);
        }
    } catch (err) {
    }
};


export const getListConfigAction = () => async (dispatch) => {
    try {
        const {data} = await httpClient.get(`/configs`);
        dispatch({
            type: GET_CONFIG_SUCCESS,
            payload: data
        });
    } catch (err) {
    }
};
