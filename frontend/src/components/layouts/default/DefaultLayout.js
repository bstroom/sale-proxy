import Header from "../Header";
import { Outlet } from "react-router-dom";

const DefaultLayout = ({children}) => {
    return <div className="wrapper">
        <Outlet />
    </div>
}

export default DefaultLayout;