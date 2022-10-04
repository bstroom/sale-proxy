import { trackPromise } from 'react-promise-tracker';
import httpClient from "../../services/httpClient";
export const GET_LIST_PROXY_SUCCESS = 'GET_LIST_PROXY_SUCCESS';
export const GET_LIST_GEO_SUCCESS = 'GET_LIST_GEO_SUCCESS';
export const CREATE_PROXY_SUCCESS = 'CREATE_PROXY_SUCCESS';
export const DELETE_PROXY_SUCCESS = 'DELETE_PROXY_SUCCESS';
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
                type: params.type,
            },
        });
    } catch (err) {
        // localStorage.removeItem(TOKEN_KEY);
    }
    finally {
    }
};

export const updateProxyAction = (data, callback) => async (dispatch) => {
    try {
        await trackPromise(httpClient.put(`/proxies/${data.id}`, data));
        if (callback) {
            callback();
        }
    } catch (err) {
    }
};

export const exportProxyAction = (type) => async (dispatch) => {
    try {
        const data = await httpClient.get(`/proxies/export/${type}`, {
            responseType: 'arraybuffer'
        });


        let blob = new Blob([data], { type: 'plain/txt' });
        let link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.download = 'proxy.txt'
        link.click()
        
    } catch (err) {
    }
};


export const clearListProxyAction = () => async (dispatch) => {
    dispatch({
        type: CLEAR_PROXY_LIST
    })
};

export const getListGeoAction = (isShowInActive = 0) => async (dispatch) => {
    try {
        const { data } = await trackPromise(httpClient.get(`/geos?is_show_inactive=${isShowInActive}`));
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

export const setActiveGeoItem = ({isActive, id}) => async (dispatch) => {
    await trackPromise(httpClient.put(`/geos/${id}`, {is_active: isActive}));
};

export const deleteProxy = (ids, callback) => async (dispatch) => {
    await  httpClient.post(`/proxies/delete`, {
        list: ids
    });
    if (callback) {
        callback();
    }
};


export const getPremiumProxyActions = (key) => async (dispatch) => {
    try {
        const { data } = await trackPromise(httpClient.get(`/premium/list-proxy`, {
            params: {
                key,
                limit: 1000
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
