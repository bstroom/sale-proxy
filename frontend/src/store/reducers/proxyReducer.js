import {
    CLEAR_PROXY_LIST,
    GET_LIST_GEO_SUCCESS,
    GET_LIST_PROXY_SUCCESS,
    GET_PREMIUM_PROXY_SUCCESS,
} from "../actions/proxyActions";

const initialState = {
    list: {
        data: [],
        type: 'HTTP',
        total: 0
    },
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
        case CLEAR_PROXY_LIST:
            return {
                ...state,
                list: {...initialState.list}
            }
        default:
            return state;
    }
}
