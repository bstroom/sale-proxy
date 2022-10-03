import {useDispatch, useSelector} from "react-redux";
import {useEffect, useMemo} from "react";
import {getDashboardAction} from "../../store/actions/dashboardActions";
import {Skeleton} from "antd";
import {format, formatDistance} from "date-fns";
import vi from "date-fns/locale/vi";

const AdminDashboard = () => {
    const count = useSelector(state => state.dashboard.count);
    const orders = useSelector(state => state.dashboard.orders);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getDashboardAction());
    }, [dispatch])
    const totalByGeos = useMemo(() => {
        if (count) {
            return Object.entries(count?.total_by_geo_local).reduce((acc, [key, item]) => {
                const {length, [ length - 1 ]: last} = acc;
                if (!last) {
                    return [[{...item, key}]]
                }
                if (last.length < 5) {
                    return [...acc.slice(0, length - 2), [...last, {...item, key}]];
                } else {
                    return [...acc, [{...item, key}]];
                }
            }, [])
        } else {
            return [];
        }
    }, [count])
    return <Skeleton loading={!count} active={true}>
            <div className="admin-dashboard">
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
                </tbody>
            </table>
            {totalByGeos.map((group, index) => {
                return <table key={index}>
                    {group.map(item => {
                        return <tr key={item.key}>
                            <td>Tổng số proxy <strong>{item.label}</strong> : </td>
                            <td>{item.count}</td>
                        </tr>
                    })}
                </table>
            })}
        </div>
        <div className="user-activities">
            <h2>Hoạt động gần nhất</h2>
            {orders && <div>
                {orders.map(order => {
                    return <div>
                        {order.user.first_name + ' ' + order.user.last_name}&nbsp;
                        vừa mua gói {order.order_plans[0].plan.name} vào lúc {format(new Date(order.created_at), 'yyyy/mm/dd hh:mm:ss')} &nbsp;
                        (khoảng {formatDistance(new Date(order.created_at), new Date(),  {locale: vi})} trước)
                    </div>
                })}
            </div>}
        </div>
    </Skeleton>
}

export default AdminDashboard;