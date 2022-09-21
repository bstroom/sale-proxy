import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Switch, Table} from 'antd';
import {getListGeoAction, setActiveGeoItem} from "../../../store/actions/proxyActions";
import {usePromiseTracker} from "react-promise-tracker";

const ListGeo = () => {
    const geoList = useSelector(state => state.proxies.geos);
    const dispatch = useDispatch();
    const {promiseInProgress} = usePromiseTracker();
    
    const onActiveChange = (id, isActive) => {
        dispatch(setActiveGeoItem({
            id,
            isActive
        }))
    }
    
    useEffect(() => {
        dispatch(getListGeoAction(1));
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
            render(isActive, fields) {
                return <Switch defaultChecked={isActive} onChange={(v) => onActiveChange(fields.id, v)}></Switch>;
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