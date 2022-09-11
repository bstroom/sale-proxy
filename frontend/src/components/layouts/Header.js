import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logoutAction} from "../../store/actions/authActions";
import {ADMIN_ROLE, USER_ROLE} from "../../common/contanst";
import {useAuth} from "../../hooks";

const Header = () => {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const [isAuth, role] = useAuth();
    const logout = () => {
        dispatch(logoutAction())
    }
    return <header>
        <div className="header-inner">
            <div className="header-left">
                <Link to='/'>
                    <h1>Proxylist.fun</h1>
                </Link>
            </div>
            <div className="header-right">
                <nav>
                    {role === ADMIN_ROLE && <Link to="/admin">Admin Dashboard</Link>}
                    {role === USER_ROLE && <Link to="/dashboard">Dashboard</Link>}
                </nav>
                {
                    !auth.isAuth && <div className="auth">
                        <span className="login">
                           <Link to="/login">Đăng nhập</Link>
                        </span>
                        <span className="register">
                            <Link to="/register">Đăng ký</Link>
                        </span>
                    </div>
                }
                {
                    isAuth && <div className="user">
                        Xin chào, {auth.user?.last_name} {auth.user?.first_name}, <a onClick={logout}>Logout</a>
                    </div>
                }
            </div>
        </div>
    </header>
}

export default Header;