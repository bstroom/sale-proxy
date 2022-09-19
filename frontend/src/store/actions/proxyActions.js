import { trackPromise } from 'react-promise-tracker';
import httpClient from "../../services/httpClient";
export const GET_LIST_PROXY_SUCCESS = 'GET_LIST_PROXY_SUCCESS';
export const GET_LIST_GEO_SUCCESS = 'GET_LIST_GEO_SUCCESS';
export const CREATE_PROXY_SUCCESS = 'CREATE_PROXY_SUCCESS';
export const GET_PREMIUM_PROXY_SUCCESS = 'GET_PREMIUM_PROXY_SUCCESS';
export const CLEAR_PROXY_LIST = 'CLEAR_PROXY_LIST';

export const getListProxyAction = (params) => async (dispatch) => {
    try {
        const { data, total } = await trackPromise(httpClient.get(`/proxies`, {
            params
        }), 'GET_PROXY');
        dispatch({
            type: GET_LIST_PROXY_SUCCESS,
            payload: {
                data,
                total,
                type: params.type
            },
        });
    } catch (err) {
        // localStorage.removeItem(TOKEN_KEY);
    }
    finally {
    }
};

export const clearListProxyAction = () => async (dispatch) => {
    dispatch({
        type: CLEAR_PROXY_LIST
    })
};

export const getListGeoAction = () => async (dispatch) => {
    try {
        const { data } = await trackPromise(httpClient.get(`/geos`));
        dispatch({
            type: GET_LIST_GEO_SUCCESS,
            payload: data,
        });
    } catch (err) {
        // localStorage.removeItem(TOKEN_KEY);
    }
    finally {
    }
};


export const getPremiumProxyActions = (key) => async (dispatch) => {
    try {
        const { data } = await trackPromise(httpClient.get(`/premium/list-proxy`, {
            params: {
                key
            }
        }));
        
        dispatch({
            type: GET_PREMIUM_PROXY_SUCCESS,
            payload: data,
        });
    } catch (err) {
        // localStorage.removeItem(TOKEN_KEY);
    }
};
