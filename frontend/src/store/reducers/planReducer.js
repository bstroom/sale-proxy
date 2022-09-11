import {
    CREATE_SUCCESS,
    DELETE_SUCCESS,
    EDIT_PLAN_SUCCESS,
    GET_LIST_SUCCESS,
    GET_USER_PLAN_SUCCESS
} from "../actions/planActions";

const initialState = {
    list: [],
    userList: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_LIST_SUCCESS:
            return {
                ...state,
                list: action.payload,
            };
         case GET_USER_PLAN_SUCCESS:
             return {
                ...state,
                userList: action.payload,
            };
        case DELETE_SUCCESS:
            return {
                ...state,
                list: state.list.filter(i => i.id !== action.payload),
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
