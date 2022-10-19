import {START_LOADING, END_LOADING} from "../actions/appActions";

const initialState = {
    loading: true,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case START_LOADING:
            return {
                ...state,
                loading: true,
            };
        case END_LOADING:
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
}
