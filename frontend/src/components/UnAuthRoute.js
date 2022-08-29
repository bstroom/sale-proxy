import {useAuth} from "../hooks";
import {Navigate, useNavigate} from "react-router-dom";

const UnAuthRoute = ({children}) => {
    const [auth, role] = useAuth();
    const navigate = useNavigate();
    
    if (!auth) {
        return children;
    } else {
        navigate(role === 'ADMIN' ? '/admin' : '/dashboard', {replace: true});
    }
}

export default UnAuthRoute;