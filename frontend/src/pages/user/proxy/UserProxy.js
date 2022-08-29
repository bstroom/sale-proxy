import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Button, message, Table, Tag} from 'antd';
import {usePromiseTracker} from "react-promise-tracker";
import {format, formatDistance, isAfter} from "date-fns";
import vi from "date-fns/locale/vi";
import {getOrdersAction} from "../../../store/actions/orderActions";
import {Link} from "react-router-dom";

const UserProxy = () => {
    const orderList = useSelector(state => state.orders.list);
    const {promiseInProgress} = usePromiseTracker();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getOrdersAction());
    }, [dispatch]);
    
    const onCopy = (apiKey) => {
        navigator.clipboard.writeText(apiKey);
        message.success('Đã copy vào clipboard!');
    }
    
    const columns = [
        {
            title: 'API key',
            dataIndex: 'api_key',
            key: '1',
            render(_, fields) {
                return fields.key?.key;
            }
        },
        {
            title: 'Ngày mua',
            dataIndex: 'created_at',
            key: '2',
            width: '180px',
            render(e){
                return format(new Date(e), 'yyyy-MM-dd HH:mm:ss')
            }
        },
        {
            title: 'Ngày hết hạn',
            dataIndex: 'expired_at',
            key: '3',
            width: '180px',
            render(e, field){
                return field.key ? format(new Date(field.key.expired_at), 'yyyy-MM-dd HH:mm:ss') : ''
            }
        },
        {
            title: 'Vị trí',
            dataIndex: 'geo_key',
            key: '4',
            width: '80px',
            render(geoKey) {
                return geoKey;
            }
        },
        {
            title: 'Tên gói',
            dataIndex: 'name',
            key: '5',
            width: '200px',
            render(_, fields) {
                return fields.plan.name;
            }
        },
        {
            title: 'Số lượng',
            dataIndex: 'amount',
            key: '6',
            width: '90px',
            render(_, fields) {
                return fields.plan.amount;
            }
        },
        {
            title: 'Loại cung cấp',
            dataIndex: 'proxy_type',
            key: '7',
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
                            return <Tag color={color} key={type}>
                                {type}
                            </Tag>
                        })
                    }
                </>
            }
        },
        {
            title: 'Tình trạng',
            dataIndex: 'status',
            key: '8',
            render(_, fields) {
                if (!fields.key) {
                    return ''
                }
                
                if (isAfter(new Date(fields.key?.expired_at), new Date(fields.key?.created_at))) {
                    return <span style={{color: 'green'}}>
                        Còn hạn khoảng <strong>
                        {formatDistance(new Date(fields.key?.expired_at), new Date(fields.key?.created_at),  {locale: vi})}</strong></span>
                } else {
                    return <span style={{color: 'red'}}>Hết hạn</span>
                }
            }
        },
        {
            title: 'Thao tác',
            dataIndex: 'action',
            key: '9',
            fixed: 'right',
            render(_, fields) {
                return <>
                    <Button type="primary" onClick={() => onCopy(fields.key?.key)}>Lấy API key</Button>
                    {isAfter(new Date(fields.key?.expired_at), new Date(fields.key?.created_at))  && <Button type="primary" style={{marginLeft: '5px'}}>
                        <Link to={"/dashboard/proxy/" + fields.key?.key}>Xem</Link>
                    </Button>}
                    </>;
            }
        },
    ];

    return <>
        <Table 
            loading={promiseInProgress} 
            dataSource={orderList} 
            columns={columns} 
            scroll={{ x: 1500 }}
            rowKey="id"
        />;
    </>;
}

export default UserProxy;