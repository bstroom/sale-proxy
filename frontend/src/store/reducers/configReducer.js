import {GET_CONFIG_SUCCESS} from "../actions/configActions";

const initialState = {
    payment: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_CONFIG_SUCCESS:
            return {
                ...state,
                payment: action.payload,
            };
        default:
            return state;
    }
}
