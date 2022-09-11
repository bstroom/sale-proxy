import {useAuth} from "../hooks";
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect} from "react";

const UnAuthRoute = ({children}) => {
    const [auth, role] = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    
    useEffect(() => {
        if (auth) {
            const search = location.search.substring(1);
            if (search) {
                const obj = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}')
                if (obj.from) {
                    if (obj.from.indexOf('admin') > 0 && role !== 'ADMIN') {
                        navigate('/dashboard');
                    } else if (obj.from !== '/') {
                        navigate(obj.from);
                    } else {
                        navigate('/dashboard')
                    }
                }
            } else {
                navigate(role === 'ADMIN' ? '/admin' : '/dashboard');
            }
        }
    }, [auth])
    
    return !auth ? children : <></>;
}

export default UnAuthRoute;