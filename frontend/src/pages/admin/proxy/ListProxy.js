import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import { Table } from 'antd';
import {getListProxyAction} from "../../../store/actions/proxyActions";
import { Tabs } from 'antd';
import React from 'react';
const { TabPane } = Tabs;

const ListProxy = () => {
    const proxyList = useSelector(state => state.proxies.list);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getListProxyAction());
    }, [dispatch]);

    const columns = [
        {
            title: 'IP',
            dataIndex: 'ip',
            key: 'ip',
        },
        {
            title: 'Port',
            dataIndex: 'port',
            key: 'port',
        },
        {
            title: 'Vị trí',
            dataIndex: 'geo_local',
            key: 'geo_local',
        },
        {
            title: 'Ms',
            dataIndex: 'ms',
            key: 'ms',
        },
    ];

    return <>
        <Tabs defaultActiveKey="1">
            <TabPane tab="HTTP" key="1">
                <Table dataSource={proxyList.filter((i) => i.type === 'HTTP')} columns={columns} rowKey="id"/>
            </TabPane>
            <TabPane tab="SOCKS4" key="2">
                <Table dataSource={proxyList.filter((i) => i.type === 'SOCKS4')} columns={columns} rowKey="id"/>
            </TabPane>
            <TabPane tab="SOCKS5" key="3">
                <Table dataSource={proxyList.filter((i) => i.type === 'SOCKS5')} columns={columns} rowKey="id"/>
            </TabPane>
            <TabPane tab="SSH" key="4">
                <Table dataSource={proxyList.filter((i) => i.type === 'SSH')} columns={columns} rowKey="id"/>
            </TabPane>
        </Tabs>
    </>;
}

export default ListProxy;