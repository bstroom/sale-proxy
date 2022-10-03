import {trackPromise} from "react-promise-tracker";
import httpClient from "../../services/httpClient";

export const GET_DASHBOARD_SUCCESS = 'GET_DASHBOARD_SUCCESS';
export const getDashboardAction = () => async (dispatch) => {
    try {
        const { data } = await httpClient.get(`/dashboard`);
        dispatch({
            type: GET_DASHBOARD_SUCCESS,
            payload: data,
        });
    } catch (err) {
    }
};
