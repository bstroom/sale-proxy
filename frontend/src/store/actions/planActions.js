import { trackPromise } from 'react-promise-tracker';
import httpClient from "../../services/httpClient";

export const GET_LIST_SUCCESS = 'GET_LIST_SUCCESS';
export const GET_USER_PLAN_SUCCESS = 'GET_USER_PLAN_SUCCESS';
export const CREATE_SUCCESS = 'CREATE_SUCCESS';
export const EDIT_PLAN_SUCCESS = 'EDIT_PLAN_SUCCESS';
export const DELETE_SUCCESS = 'DELETE_SUCCESS';

export const getListPlanAction = () => async (dispatch) => {
    try {
        const { data } = await trackPromise(httpClient.get(`/plans`));
        dispatch({
            type: GET_LIST_SUCCESS,
            payload: data,
        });
    } catch (err) {
    }
    finally {
    }
};

export const getUserPlansAction = () => async (dispatch) => {
    try {
        const { data } = await trackPromise(httpClient.get(`/user-plans`));
        dispatch({
            type: GET_USER_PLAN_SUCCESS,
            payload: data,
        });
    } catch (err) {
    }
    finally {
    }
};

export const createPlanAction = (formData) => async (dispatch) => {
    try {
        const { data } = await trackPromise(httpClient.post(`/plans`, formData));
        dispatch({
            type: CREATE_SUCCESS,
            payload: data,
        });
    } catch (err) {
        // localStorage.removeItem(TOKEN_KEY);
    }
};

export const editPlanAction = (formData,callback) => async (dispatch) => {
    try {
        const { data } = await trackPromise(httpClient.put(`/plans/${formData.id}/edit`, formData));
        if (callback) {
            callback()
        }
    } catch (err) {
        // localStorage.removeItem(TOKEN_KEY);
    }
};

export const deletePlanAction = (id) => async (dispatch) => {
    try {
        await trackPromise(httpClient.delete(`/plans/${id}`, 'DELETE_PLAN'));
        dispatch({
            type: DELETE_SUCCESS,
            payload: id,
        });
    } catch (err) {
        // localStorage.removeItem(TOKEN_KEY);
    }
};
