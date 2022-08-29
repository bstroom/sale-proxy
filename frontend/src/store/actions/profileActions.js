import { trackPromise } from 'react-promise-tracker';
import httpClient from "../../services/httpClient";
import {endLoadingAction, startLoadingAction} from "./appActions";

export const GET_ME_SUCCESS = 'GET_ME_SUCCESS';
export const EDIT_PROFILE_SUCCESS = 'EDIT_PROFILE_SUCCESS';
export const GET_PAYMENT_HISTORY_SUCCESS = 'GET_PAYMENT_HISTORY_SUCCESS';

export const getMeActionSuccessAction = (data) => ({
    type: GET_ME_SUCCESS,
    payload: data,
});

export const getMeAction = (token) => async (dispatch) => {
    try {
        dispatch(startLoadingAction())
        const { data } = await trackPromise(httpClient.get(`/profile/me`));
        dispatch(getMeActionSuccessAction({
            user: data,
            token
        }));
    } catch (err) {
        // localStorage.removeItem(TOKEN_KEY);
    }
    finally {
        dispatch(endLoadingAction());
    }
};

export const editProfileAction = (data) => async (dispatch) => {
    try {
        const { statusCode } = await trackPromise(httpClient.post(`/profile/me`, data));
        if (statusCode === 200 && !data.new_password) {
            dispatch({
                type: EDIT_PROFILE_SUCCESS,
                payload: data
            })
        }
    } catch (err) {
        // localStorage.removeItem(TOKEN_KEY);
    }
};

export const getPaymentHistoryAction = () => async (dispatch) => {
    try {
        const { data } = await trackPromise(httpClient.get(`/payments/history`));
        dispatch({
            type: GET_PAYMENT_HISTORY_SUCCESS,
            payload: data,
        });
    } catch (err) {
        // localStorage.removeItem(TOKEN_KEY);
    }
    finally {
    }
};
