import {useAuth} from "../hooks";
import {Navigate, Route, useLocation} from "react-router-dom";
import {ADMIN_ROLE} from "../common/contanst";

function AdminRoute({ children, ...rest }) {
    let [auth, role] = useAuth();
    const location = useLocation();
    
    return (auth && role === ADMIN_ROLE ? children : <Navigate to={`/login?from=${location.pathname}`} />);
}

export default AdminRoute;