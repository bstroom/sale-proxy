import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getListPlanAction} from "../../../store/actions/planActions";
import { Table, Tag } from 'antd';
import {currencyFormat} from "../../../common/helpers";
import {usePromiseTracker} from "react-promise-tracker";

const ListPlan = () => {
    const planList = useSelector(state => state.plans.list);
    const {promiseInProgress} = usePromiseTracker();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getListPlanAction());
    }, [dispatch]);
    
    const columns = [
        {
            title: 'Tên gói',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Số lượng',
            dataIndex: 'amount',
            key: 'amount',
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
            render(price, field) {
                const mapping = {
                    WEEK: 'Tuần',
                    MONTH: 'Tháng',
                    YEAR: 'Năm'
                }
                
                return currencyFormat(price, true) + ' / ' + mapping[field.type];
            }
        },
        {
            title: 'Loại cung cấp',
            dataIndex: 'proxy_type',
            key: 'proxy_type',
            render(types) {
                return <>
                    {
                        types.split(',').map((type) => {
                            let color = 'geekblue';
                            if (type === 'SOCKS4') {
                                color='green';
                            }
                            if (type === 'SOCKS5') {
                                color = 'volcano'
                            }
                            if (type === 'SSH') {
                                color = 'yellow'
                            }
                            return <Tag color={color} key={type}>
                                {type}
                            </Tag>
                        })
                    }
                    </>
            }
        },
    ];
    
    return <>
        <Table loading={promiseInProgress} dataSource={planList} columns={columns} rowKey="id" />;
    </>;
}

export default ListPlan;