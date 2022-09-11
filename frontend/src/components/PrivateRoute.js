import {useAuth} from "../hooks";
import {Navigate, Route, useLocation} from "react-router-dom";
import {USER_ROLE} from "../common/contanst";

function PrivateRoute({ children, ...rest }) {
    let [auth, role] = useAuth();
    const location = useLocation();
    
    return (auth && role === USER_ROLE ? children : <Navigate to={`/login?from=${location.pathname}`} />);
}

export default PrivateRoute;