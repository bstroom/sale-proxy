import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getDashboardAction} from "../../store/actions/dashboardActions";

const AdminDashboard = () => {
    const count = useSelector(state => state.dashboard.count);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getDashboardAction());
    }, [dispatch])
    return <div>
        <table>
            <tbody>
                <tr>
                    <td>Tổng số users: </td>
                    <td>{count?.total_user}</td>
                </tr>
                <tr>
                    <td>Tổng số proxy HTTP: </td>
                    <td>{count?.total_http}</td>
                </tr>
                <tr>
                    <td>Tổng số proxy SOCKS4: </td>
                    <td>{count?.total_socks4}</td>
                </tr>
                <tr>
                    <td>Tổng số proxy SOCK5: </td>
                    <td>{count?.total_socks5}</td>
                </tr>
                <tr>
                    <td>Tổng số proxy SSH: </td>
                    <td>{count?.total_ssh}</td>
                </tr>
            </tbody>
        </table>
    </div>
}

export default AdminDashboard;