import {useAuth} from "../hooks";
import {useLocation, Navigate} from "react-router-dom";

const UnAuthRoute = ({children}) => {
    const [auth, role] = useAuth();
    const location = useLocation();

    const search = location.search.substring(1);
    let pathNavigate = '/';
    
    if (search) {
        const obj = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}')
        if (obj.from) {
            if (obj.from.indexOf('admin') >= 0 && role !== 'ADMIN') {
                pathNavigate = '/dashboard';
            } else if (obj.from !== '/') {
                pathNavigate = obj.from;
            } else {
                pathNavigate = role === 'ADMIN' ? '/admin' : '/dashboard';
            }
        }
    }
    return !auth ? children : <Navigate to={pathNavigate}></Navigate>;
}

export default UnAuthRoute;