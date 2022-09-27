import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Button, Input, Select, Switch, Table} from 'antd';
import {
    clearListProxyAction,
    exportProxyAction,
    getListProxyAction,
    updateProxyAction
} from "../../../store/actions/proxyActions";
import { Tabs } from 'antd';
import React from 'react';
import {debounce} from "../../../common/helpers";
const { TabPane } = Tabs;

const DEFAULT_TAB_KEY = 'HTTP';

const ListProxy = () => {
    const proxyMetadata = useSelector(state => state.proxies.list);
    const dispatch = useDispatch();
    const [listParams, setListParams] = useState({
        type: DEFAULT_TAB_KEY,
        filter_type: 'NORMAL',
        page: 1,
        limit: 100,
        keyword: '',
    });
    
    const handleTableChange = (page) => {
        dispatch(clearListProxyAction());
        setListParams({
            ...listParams,
            page: page.current,
            limit: page.pageSize
        })
    }
    
    const onFilterTypeChange = (v) => {
        setListParams({
            ...listParams,
            filter_type: v
        });
    }

    const onExportProxy = () => {
        dispatch(exportProxyAction(listParams.type))
    }
    
    const onKeywordChange = debounce((e) => {
        dispatch(clearListProxyAction());
        setListParams({
            ...listParams,
            keyword: e.target.value
        })
        dispatch(getListProxyAction(listParams));
    }, 800);
    
    const onUpdateVip = (fields, v) => {
        dispatch(updateProxyAction({
            ...fields,
            is_vip: v
        }, () => {
            dispatch(getListProxyAction(listParams));
        }));
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
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Password',
            dataIndex: 'password',
            key: 'password',
        },
        {
            title: 'Live',
            dataIndex: 'status',
            key: 'status',
            render(status) {
                return status === 'LIVE' ? <span style={{color: 'green'}}>LIVE</span> : 'DIE'
            }
        },
        {
            title: 'VIP Only',
            dataIndex: 'is_vip',
            key: 'is_vip',
            render(isVip, fields) {
                return <Switch defaultChecked={isVip} onChange={(v) => onUpdateVip(fields, v)}></Switch>
            }
        },
    ];

    return <>
        <div className="proxy-list-header">
            <div>
                <Select style={{width: '250px'}} value={listParams.filter_type} onChange={onFilterTypeChange}>
                    <Select.Option value="NORMAL">Loại proxy: Bình thường</Select.Option>
                    <Select.Option value="VIP">Loại proxy: VIP</Select.Option>
                </Select>
            </div>
            <div className="search-area">
                <Input placeholder="Nhập ip tìm kiếm" onChange={onKeywordChange}/>
            </div>
            <div className="search-area">
                <Button type="primary" onClick={onExportProxy}>Export All {listParams.type}</Button>
            </div>
        </div>
        <Tabs defaultActiveKey={DEFAULT_TAB_KEY} onChange={onTabChange}>
            <TabPane tab="HTTP" key="HTTP">
                <Table dataSource={proxyMetadata.data} columns={columns} rowKey="id" loading={!proxyMetadata.data?.length} pagination={{pageSize: listParams.limit, current: listParams.page, total: proxyMetadata.total, position: ['topRight']}}  onChange={handleTableChange}/>
            </TabPane>
            <TabPane tab="SOCKS4" key="SOCKS4">
                <Table dataSource={proxyMetadata.data} columns={columns} rowKey="id" loading={!proxyMetadata.data?.length} pagination={{pageSize: listParams.limit, current: listParams.page, total: proxyMetadata.total, position: ['topRight']}}  onChange={handleTableChange}/>
            </TabPane>
            <TabPane tab="SOCKS5" key="SOCKS5">
                <Table dataSource={proxyMetadata.data} columns={columns} rowKey="id" loading={!proxyMetadata.data?.length} pagination={{pageSize: listParams.limit, current: listParams.page, total: proxyMetadata.total, position: ['topRight']}}  onChange={handleTableChange}/>
            </TabPane>
            <TabPane tab="SSH" key="SSH">
                <Table dataSource={proxyMetadata.data} columns={columns} rowKey="id" loading={!proxyMetadata.data?.length} pagination={{pageSize: listParams.limit, current: listParams.page, total: proxyMetadata.total, position: ['topRight']}}  onChange={handleTableChange}/>
            </TabPane>
        </Tabs>
    </>;
}

export default ListProxy;