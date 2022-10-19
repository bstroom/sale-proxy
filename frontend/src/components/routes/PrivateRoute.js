// ** React Imports
import { Navigate } from 'react-router-dom'
import {useSelector} from "react-redux";

const PrivateRoute = ({ children, route }) => {
  // ** Hooks & Vars
  const {isAuth, user} = useSelector(state => state.auth);

  if (route) {
    if (!isAuth) {
      return <Navigate to='/auth/login' />
    }
  }

  return children;
}

export default PrivateRoute
