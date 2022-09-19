import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import { Table } from 'antd';
import {clearListProxyAction, getListProxyAction} from "../../../store/actions/proxyActions";
import { Tabs } from 'antd';
import React from 'react';
const { TabPane } = Tabs;

const DEFAULT_TAB_KEY = 'HTTP';

const ListProxy = () => {
    const proxyMetadata = useSelector(state => state.proxies.list);
    const dispatch = useDispatch();
    const [listParams, setListParams] = useState({
        type: DEFAULT_TAB_KEY,
        page: 1,
        limit: 10
    });
    
    const handleTableChange = (page) => {
        dispatch(clearListProxyAction());
        setListParams({
            ...listParams,
            page: page.current
        })
    }
    
    useEffect(() => {
        dispatch(getListProxyAction(listParams));
    }, [dispatch, listParams]);
    
    const onTabChange = (tab) => {
        dispatch(clearListProxyAction());
        
        setListParams({
            ...listParams,
            type: tab
        });  
    }
    
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
        <Tabs defaultActiveKey={DEFAULT_TAB_KEY} onChange={onTabChange}>
            <TabPane tab="HTTP" key="HTTP">
                <Table dataSource={proxyMetadata.data} columns={columns} rowKey="id" loading={!proxyMetadata.data?.length} pagination={{pageSize: listParams.limit, current: listParams.page, total: proxyMetadata.total}}  onChange={handleTableChange}/>
            </TabPane>
            <TabPane tab="SOCKS4" key="SOCKS4">
                <Table dataSource={proxyMetadata.data} columns={columns} rowKey="id" loading={!proxyMetadata.data?.length} pagination={{pageSize: listParams.limit, current: listParams.page, total: proxyMetadata.total}}  onChange={handleTableChange}/>
            </TabPane>
            <TabPane tab="SOCKS5" key="SOCKS5">
                <Table dataSource={proxyMetadata.data} columns={columns} rowKey="id" loading={!proxyMetadata.data?.length} pagination={{pageSize: listParams.limit, current: listParams.page, total: proxyMetadata.total}}  onChange={handleTableChange}/>
            </TabPane>
            <TabPane tab="SSH" key="SSH">
                <Table dataSource={proxyMetadata.data} columns={columns} rowKey="id" loading={!proxyMetadata.data?.length} pagination={{pageSize: listParams.limit, current: listParams.page, total: proxyMetadata.total}}  onChange={handleTableChange}/>
            </TabPane>
        </Tabs>
    </>;
}

export default ListProxy;