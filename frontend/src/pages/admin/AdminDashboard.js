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
                    <td>Tổng số proxy <strong>HTTP</strong> : </td>
                    <td>{count?.total_http}</td>
                </tr>
                <tr>
                    <td>Tổng số proxy <strong>SOCKS</strong> : </td>
                    <td>{count?.total_socks}</td>
                </tr>
                <tr>
                    <td>Tổng số proxy <strong>SSH</strong> : </td>
                    <td>{count?.total_ssh}</td>
                </tr>
                {count?.total_by_geo_local && Object.entries(count?.total_by_geo_local).map(([key, total]) => {
                    return <tr>
                        <td>Tổng số proxy <strong>{key.toUpperCase()}</strong> : </td>
                        <td>{total}</td>
                    </tr>
                })}
            </tbody>
        </table>
    </div>
}

export default AdminDashboard;