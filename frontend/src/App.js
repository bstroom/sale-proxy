import React, {useEffect} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Spin} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {endLoadingAction} from "./store/actions/appActions";
import {useLocalStorage} from "./hooks";
import {TOKEN_KEY} from "./common/contanst";
import {getMeAction} from "./store/actions/profileActions";
import {setToken} from "./services/httpClient";
import Router from './router/Router';

const App = () => {
    const dispatch = useDispatch();
    const [token] = useLocalStorage(TOKEN_KEY);

    useEffect(() => {
        if (token) {
            setToken(token);
            dispatch(getMeAction(token))
        } else {
            dispatch(endLoadingAction());
        }
    }, [token]);
    
    const app = useSelector(state => state.app);
    return !app.loading ? <BrowserRouter>
        <Router />
    </BrowserRouter> : <div className="demo">
        <Spin size="large" />
    </div>
};

export default App;