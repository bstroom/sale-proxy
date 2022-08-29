import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Button, Table} from 'antd';
import {usePromiseTracker} from "react-promise-tracker";
import { useNavigate, useParams} from "react-router-dom";
import {getPremiumProxyActions} from "../../../store/actions/proxyActions";

const UserProxy = () => {
    const premiums = useSelector(state => state.proxies.premiums);
    const {promiseInProgress} = usePromiseTracker();
    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getPremiumProxyActions(params.key));
    }, [params, dispatch]);
    
    const back = () => {
        navigate(-1);
    }
    
    const exportTxt = () => {
        const element = document.createElement("a");
        const file = new Blob([
            premiums.reduce((acc, item) => {
                acc += [item.ip, item.port,item.geo_local,item.ms].join('|') + "\r\n";
                return acc;
            }, '')
        ], {type: 'text/plain'});
        element.href = URL.createObjectURL(file);
        element.download = params.key + ".txt";
        document.body.appendChild(element);
        element.click();
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
        <div style={{marginBottom: '1rem'}}>
            <Button onClick={back}>Trở lại</Button>
        </div>
        <h3>KEY: {params.key}</h3>
        <Button onClick={exportTxt} type="primary">Export</Button>
        <Table 
            loading={promiseInProgress} 
            dataSource={premiums} 
            columns={columns} 
            rowKey="id"
        />;
    </>;
}

export default UserProxy;