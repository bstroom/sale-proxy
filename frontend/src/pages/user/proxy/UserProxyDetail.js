import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Button, message, Select, Table} from 'antd';
import {usePromiseTracker} from "react-promise-tracker";
import { useNavigate, useParams} from "react-router-dom";
import {getListGeoAction, getPremiumProxyActions} from "../../../store/actions/proxyActions";

const UserProxy = () => {
    const premiums = useSelector(state => state.proxies.premiums);
    const geoList = useSelector(state => state.proxies.geos);
    const [proxyFiltered, setProxyFiltered] = useState([]);
    const [filterCode, setFilterCode] = useState('ALL');
    const {promiseInProgress} = usePromiseTracker();
    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getPremiumProxyActions(params.key));
        dispatch(getListGeoAction());
    }, [params, dispatch]);
    
    useEffect(() => {
        if (filterCode === 'ALL') {
            setProxyFiltered(premiums);
            return;
        }

        setProxyFiltered(premiums.filter((proxy) => proxy.geo_local === filterCode));
    }, [filterCode]);
    
    const back = () => {
        navigate(-1);
    }
    
    const exportTxt = () => {
        if (!proxyFiltered.length) {
            message.error('Danh sách rỗng!')    ;
            return;
        }
        
        const element = document.createElement("a");
        const file = new Blob([
            proxyFiltered.reduce((acc, item) => {
                acc += item.ip + ':' + item.port + "\r\n";
                return acc;
            }, '')
        ], {type: 'text/plain'});
        element.href = URL.createObjectURL(file);
        element.download = params.key + ".txt";
        document.body.appendChild(element);
        element.click();
    }
    
    const handleFilterChange = (v) => {
        setFilterCode(v);
    }
    
    const columns = [
        {
            title: 'IP',
            dataIndex: 'ip',
            key: '1',
        },
        {
            title: 'Port',
            dataIndex: 'port',
            key: '2'
        },
        {
            title: 'Vị trí',
            dataIndex: 'geo_local',
            key: '3',
        },
        {
            title: 'Ms',
            dataIndex: 'ms',
            key: '4',
        },
    ];

    return <>
        <div className="user-proxy-detail-header">
            <div className="user-proxy-detail-left">
                <div style={{marginBottom: '1rem'}}>
                    <Button onClick={back}>Trở lại</Button>
                </div>
                <h3>KEY: {params.key}</h3>
            </div>
            <div className="user-proxy-detail-right">
                <Select defaultValue={filterCode} style={{ width: 200 }} onChange={handleFilterChange}>
                    <Select.Option value="ALL">Tất cả</Select.Option>
                    {geoList.map(geo => {
                        return <Select.Option value={geo.code}>{geo.name}</Select.Option>;
                    })}
                </Select>
                <Button onClick={exportTxt} type="primary" style={{marginLeft: "10px"}}>Export</Button>
            </div>
        </div>
        
        <Table 
            loading={promiseInProgress} 
            dataSource={proxyFiltered} 
            columns={columns} 
            rowKey="id"
        />;
    </>;
}

export default UserProxy;