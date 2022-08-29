import {useAuth} from "../hooks";
import {Navigate , Route} from "react-router-dom";
import {ADMIN_ROLE} from "../common/contanst";

function AdminRoute({ children, ...rest }) {
    let [auth, role] = useAuth();
    return (auth && role === ADMIN_ROLE ? children : <Navigate to="/" />);
}

export default AdminRoute;