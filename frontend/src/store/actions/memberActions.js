import { trackPromise } from 'react-promise-tracker';
import httpClient from "../../services/httpClient";
import {endLoadingAction, startLoadingAction} from "./appActions";
import {loginSuccessAction} from "./authActions";
import {TOKEN_KEY} from "../../common/contanst";


export const GET_MEMBER_SUCCESS = 'GET_MEMBER_SUCCESS';
export const GET_MEMBER_FAILED = 'GET_MEMBER_FAILED';

export const getMembersAction = () => async (dispatch) => {
    try {
        const { data } = await trackPromise(httpClient.get(`/members`));
        dispatch({
            type: GET_MEMBER_SUCCESS,
            payload: data,
        });
    } catch (err) {
        dispatch({
            type: GET_MEMBER_FAILED,
        })
    }
};
