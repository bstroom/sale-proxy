import { trackPromise } from 'react-promise-tracker';
import httpClient from "../../services/httpClient";

export const ORDER_SUCCESS = 'ORDER_SUCCESS';
export const GET_ORDERS_SUCCESS = 'GET_ORDERS_SUCCESS';

export const orderAction = (formData, callback, errorCallback) => async (dispatch) => {
    try {
        const {data} = await trackPromise(httpClient.post(`/orders`, formData));
        if(callback && data) {
            callback();
        } else {
            errorCallback()
        }
    } catch (err) {
        errorCallback()
    }
};

export const getOrdersAction = () => async (dispatch) => {
    try {
        const {data} = await httpClient.get(`/orders`);
        dispatch({
            type: GET_ORDERS_SUCCESS,
            payload: data
        });
    } catch (err) {
    }
};
