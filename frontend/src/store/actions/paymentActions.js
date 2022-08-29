import { trackPromise } from 'react-promise-tracker';
import httpClient, {setToken} from "../../services/httpClient";
import {TOKEN_KEY} from "../../common/contanst";


export const GET_BUDGET_SUCCESS = 'GET_BUDGET_SUCCESS';

export const getBudgetSuccessAction = (data) => ({
    type: GET_BUDGET_SUCCESS,
    payload: data,
});

export const getBudgetAction = () => async (dispatch) => {
    try {
        const { data } = await trackPromise(httpClient.get(`/payments/budget`));
        dispatch(getBudgetSuccessAction(data));
        
    } catch (err) {
    }
};
