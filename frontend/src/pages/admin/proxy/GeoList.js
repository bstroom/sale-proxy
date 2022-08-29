import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Switch, Table} from 'antd';
import {getListGeoAction} from "../../../store/actions/proxyActions";
import {usePromiseTracker} from "react-promise-tracker";

const ListGeo = () => {
    const geoList = useSelector(state => state.proxies.geos);
    const dispatch = useDispatch();
    const {promiseInProgress} = usePromiseTracker();
    
    useEffect(() => {
        dispatch(getListGeoAction());
    }, [dispatch]);

    const columns = [
        {
            title: 'Quốc gia',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Mã',
            dataIndex: 'code',
            key: 'code',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'is_active',
            key: 'is_active',
            render(isActive) {
                return <Switch checked={isActive}></Switch>;
            }
        },
    ];

    return <>
        <Table 
            loading={promiseInProgress} 
            dataSource={geoList} 
            columns={columns} 
            pagination={false}
            rowKey="id"
        />
    </>
}

export default ListGeo;