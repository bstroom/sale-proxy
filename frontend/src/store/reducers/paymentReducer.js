import {GET_BUDGET_SUCCESS} from "../actions/paymentActions";
import {GET_PAYMENT_HISTORY_SUCCESS} from "../actions/profileActions";

const initialState = {
    budget: null,
    paymentHistory: null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_BUDGET_SUCCESS:
            return {
                ...state,
                budget: action.payload
            };
        case GET_PAYMENT_HISTORY_SUCCESS:
            return {
                ...state,
                paymentHistory: action.payload
            }
        default:
            return state;
    }
}
