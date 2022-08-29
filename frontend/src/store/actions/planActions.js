import { trackPromise } from 'react-promise-tracker';
import httpClient from "../../services/httpClient";
import {endLoadingAction, startLoadingAction} from "./appActions";
import {loginSuccessAction} from "./authActions";
import {TOKEN_KEY} from "../../common/contanst";


export const GET_LIST_SUCCESS = 'GET_LIST_SUCCESS';
export const CREATE_SUCCESS = 'CREATE_SUCCESS';


export const getListPlanAction = () => async (dispatch) => {
    try {
        const { data } = await trackPromise(httpClient.get(`/plans`));
        dispatch({
            type: GET_LIST_SUCCESS,
            payload: data,
        });
    } catch (err) {
        // localStorage.removeItem(TOKEN_KEY);
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
