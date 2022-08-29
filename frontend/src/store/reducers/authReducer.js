// import { GET_ERRORS } from 'actions/types';

import {LOGIN_SUCCESS, LOGOUT} from "../actions/authActions";
import {EDIT_PROFILE_SUCCESS, GET_ME_SUCCESS} from "../actions/profileActions";

const initialState = {
    user: null,
    token: null,
    isAuth: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuth: true,
                user: action.payload.user,
                token: action.payload.token
            };
        case GET_ME_SUCCESS:
            return {
                ...state,
                isAuth: true,
                user: action.payload.user,
                token: action.payload.token
            };
        case EDIT_PROFILE_SUCCESS:
            return {
                ...state,
                user: {
                    ...state.user,
                    ...action.payload
                }
            }
        case LOGOUT:
            return {...initialState};
        default:
            return state;
    }
}
