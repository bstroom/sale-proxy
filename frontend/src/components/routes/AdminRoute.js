// ** React Imports
import { Navigate } from 'react-router-dom'
import {useSelector} from "react-redux";

const AdminRoute = ({ children, route }) => {
  // ** Hooks & Vars
  const {isAuth, user} = useSelector(state => state.auth);
  const isAdmin = isAuth && user.role === 'ADMIN';

  if (route) {
    if (!isAdmin) {
      if (!isAuth) {
        return <Navigate to='/auth/login' />
      } else {
        return <Navigate to='/dashboard' />
      }
    }
  }

  return children;
}

export default AdminRoute
