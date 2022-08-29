import {GET_LIST_GEO_SUCCESS, GET_LIST_PROXY_SUCCESS, GET_PREMIUM_PROXY_SUCCESS} from "../actions/proxyActions";

const initialState = {
    list: [],
    geos: [],
    premiums: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_LIST_PROXY_SUCCESS:
            return {
                ...state,
                list: action.payload,
            };
        case GET_LIST_GEO_SUCCESS:
            return {
                ...state,
                geos: action.payload
            };
        case GET_PREMIUM_PROXY_SUCCESS: 
            return {
                ...state,
                premiums: action.payload
            }
        default:
            return state;
    }
}
