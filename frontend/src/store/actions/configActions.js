import { trackPromise } from 'react-promise-tracker';
import httpClient from "../../services/httpClient";

export const GET_CONFIG_SUCCESS = 'GET_CONFIG_SUCCESS';

export const createConfigAction = (formData, callback, errorCallback) => async (dispatch) => {
    try {
        console.log(formData);
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

export const getConfigAction = () => async (dispatch) => {
    try {
        const {data} = await httpClient.get(`/configs`);
        dispatch({
            type: GET_CONFIG_SUCCESS,
            payload: data
        });
    } catch (err) {
    }
};
