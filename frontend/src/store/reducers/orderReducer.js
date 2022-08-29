import {GET_ORDERS_SUCCESS} from "../actions/orderActions";

const initialState = {
    list: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ORDERS_SUCCESS:
            return {
                ...state,
                list: action.payload,
            };
        default:
            return state;
    }
}
