import {CREATE_SUCCESS, GET_LIST_SUCCESS} from "../actions/planActions";

const initialState = {
    list: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_LIST_SUCCESS:
            return {
                ...state,
                list: action.payload,
            };
        case CREATE_SUCCESS:
            return {
                ...state,
                list: [...state.list, action.payload],
            };
        default:
            return state;
    }
}
