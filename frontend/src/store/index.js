import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import {LOGOUT} from "./actions/authActions";

const initialState = {};

const store = createStore(
    (state, action) => rootReducer(action.type === LOGOUT ? undefined : state, action),
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__
        ? compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__())
        : applyMiddleware(thunk),
);

export default store;