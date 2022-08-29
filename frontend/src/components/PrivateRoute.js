import {useAuth} from "../hooks";
import {Navigate , Route} from "react-router-dom";
import {USER_ROLE} from "../common/contanst";

function PrivateRoute({ children, ...rest }) {
    let [auth, role] = useAuth();
    return (auth && role === USER_ROLE ? children : <Navigate to="/login" />);
}

export default PrivateRoute;