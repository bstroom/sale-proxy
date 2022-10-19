import {useSelector} from "react-redux";
import {useNavigate} from 'react-router-dom';

const useUnAuth = () => {
    const {isAuth, user} = useSelector(state => state.auth);
    const navigate = useNavigate();

    if (isAuth) {
        if (user?.role === 'ADMIN') {
            navigate('/admin');
        } else {
            navigate('/dashboard');
        }
    }

}

export default useUnAuth;