import {useAuth} from "../hooks";
import {Navigate, Route, useLocation} from "react-router-dom";
import {ADMIN_ROLE, USER_ROLE} from "../common/contanst";

function PrivateRoute({ children, ...rest }) {
    let [auth, role] = useAuth();
    const location = useLocation();
    
    return (auth && [USER_ROLE, ADMIN_ROLE].includes(role) ? children : <Navigate to={`/login?from=${location.pathname}`} />);
}

export default PrivateRoute;