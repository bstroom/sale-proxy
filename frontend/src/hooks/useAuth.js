import {useSelector} from "react-redux";

const useAuth = () => {
    const {isAuth, user} = useSelector(state => state.auth);
    return [isAuth, user?.role || false];
}

export default useAuth;