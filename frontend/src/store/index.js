import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import {LOGOUT} from "./actions/authActions";

const initialState = {};
const isDev = false;

const middleware = [applyMiddleware(thunk), ...(isDev ? window.__REDUX_DEVTOOLS_EXTENSION__() : [])];
const store = createStore(
    (state, action) => {
        return rootReducer(action.type === LOGOUT ? undefined : state, action);
    },
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__
        ? compose(...middleware)
        : applyMiddleware(thunk),
);

export default store;