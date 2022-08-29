import {GET_MEMBER_FAILED, GET_MEMBER_SUCCESS} from "../actions/memberActions";

const initialState = {
    list: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_MEMBER_SUCCESS:
            return {
                ...state,
                list: action.payload,
            };
        case GET_MEMBER_FAILED:
            return {
                ...state,
                list: []
            };
        default:
            return state;
    }
}
