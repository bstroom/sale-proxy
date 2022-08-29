import {GET_DASHBOARD_SUCCESS} from "../actions/dashboardActions";

const initialState = {
    count: null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_DASHBOARD_SUCCESS:
            return {
                ...state,
                count: action.payload,
            };
        default:
            return state;
    }
}
