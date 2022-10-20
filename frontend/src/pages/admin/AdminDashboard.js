import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { getDashboardAction } from "../../store/actions/dashboardActions";
import { Skeleton, Tag } from "antd";
import { format, formatDistance } from "date-fns";
import { currencyFormat, randomHex } from "../../common/helpers";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale, registerables } from "chart.js";
Chart.register(CategoryScale);

const AdminDashboard = () => {
    const count = useSelector((state) => state.dashboard.count);
    const orders = useSelector((state) => state.dashboard.orders);
    const dispatch = useDispatch();

    const totalByGeos = useMemo(() => {
        const init = {
            labels: [],
            data: [],
            colors: [],
        };
        if (count) {
            const groups = Object.entries(count.total_by_geo_local).reduce((acc, [key, item]) => {
                return {
                    labels: [...acc.labels, item.label],
                    data: [...acc.data, item.count],
                    colors: [...acc.colors, randomHex()],
                };
            }, init);
            return {
                data: [count.total_http, count.total_socks, count.total_ssh, ...groups.data],
                labels: ['HTTP', 'SOCKS', 'SSH', ...groups.labels],
                colors: [randomHex(), randomHex(), randomHex(), ...groups.colors],
            };
        }

        return init;
    }, [count]);

    useEffect(() => {
        dispatch(getDashboardAction());
    }, [dispatch]);

    return (
        <Skeleton loading={!count} active={true}>
            <div className="chart">
                <Bar
                    data={{
                        labels: totalByGeos.labels,
                        datasets: [
                            {
                                label: 'Proxies',
                                data: totalByGeos.data,
                                backgroundColor: totalByGeos.colors,
                            },
                        ],
                    }}
                    options={{
                        maintainAspectRatio: false,
                        responsive: true,
                        title: {
                            display: true,
                            text: "Total proxies",
                            fontSize: 20,
                        },
                        legend: {
                            display: true,
                            position: 'top',
                            labels: {
                                fontColor: "#000",
                            },
                        },
                    }}
                ></Bar>
            </div>
            <div className="information-group">
                <div className="user-activities">
                    <div className="user-activities__header">
                        <h3>Hoạt động gần nhất</h3>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Khách hàng</th>
                                <th>Hoạt động</th>
                                <th>Gói</th>
                                <th>Trạng thái</th>
                                <th>Thời gian</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!!orders &&
                                orders.map((order) => {
                                    return (
                                        <tr key={order.id}>
                                            <td>{order.id}</td>
                                            <td>{order.user.first_name + " " + order.user.last_name}</td>
                                            <td>Chi tiêu {currencyFormat(Number(order.order_plans[0].price))}đ</td>
                                            <td>{order.order_plans[0].plan.name}</td>
                                            <td>
                                                <Tag color="green">Success</Tag>
                                            </td>
                                            <td>{format(new Date(order.created_at), "yyyy/mm/dd hh:mm:ss")}</td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="admin-dashboard">
            <div className="user-activities matrix">
                    <div className="user-activities__header">
                        <h3>Proxies Matrix</h3>
                    </div>
                    <div className="name-list">
                        {totalByGeos.data.map((n, i) => {
                            return <div className="name-item">
                                <div><span className="label" style={{borderColor: totalByGeos.colors[i]}}>{totalByGeos.labels[i]}</span></div>
                                <div className="value"><span>{n}</span></div>
                            </div>
                        })}
                    </div>
                </div>
            </div>
        </Skeleton>
    );
};

export default AdminDashboard;
