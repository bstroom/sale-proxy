import React, {useEffect} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Spin} from 'antd';
import PrivateRoute from "./components/PrivateRoute";
import UnAuthRoute from "./components/UnAuthRoute";
import {useDispatch, useSelector} from "react-redux";
import {endLoadingAction, startLoadingAction} from "./store/actions/appActions";
import {useLocalStorage} from "./hooks";
import {TOKEN_KEY} from "./common/contanst";
import {getMeAction} from "./store/actions/profileActions";
import {setToken} from "./services/httpClient";
import AdminRoute from "./components/AdminRoute";
import {routes} from "./routes";

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
    return !app.loading ? 
        <div className="container">
            <BrowserRouter>
            <Routes>
            {routes.map(route => {
                if (!route.private && !route.admin) {
                    return  <Route key={route.path} exact={route.exact} path={route.path} element={
                            <route.layout>
                                <UnAuthRoute>
                                    <route.page />
                                </UnAuthRoute>
                            </route.layout>
                     }></Route>     
                 
                }
                if (route.private && !route.admin) {
                    if (!route.children) {
                        return <Route key={route.path} exact={route.exact} path={route.path} element={
                            <route.layout>
                                <PrivateRoute>
                                    <route.page />
                                </PrivateRoute>
                            </route.layout>
                        }></Route> 
                    }
                    return  <Route key={route.path} exact={route.exact} path={route.path}>
                        {
                            route.children.map((child) => <Route exact={child.exact} key={route.path + child.path} path={route.path + child.path} element={
                                <route.layout>
                                    <PrivateRoute>
                                        <child.page />
                                    </PrivateRoute>
                                </route.layout>
                            } />)
                        }
                    </Route>
                }
    
                if (route.private && route.admin) {
                    return  <Route key={route.path} exact={route.exact} path={route.path}>
                        {
                            route.children.map((child) => <Route exact={child.exact} key={route.path + child.path} path={route.path + child.path} element={
                                <route.layout>
                                    <AdminRoute>
                                        <child.page />
                                    </AdminRoute>
                                </route.layout>
                            } />)
                        }
                        </Route>
                }
            })}
            </Routes>
        </BrowserRouter>
    </div> : 
    <div className="demo">
        <Spin size="large" />
    </div>
};

export default App;