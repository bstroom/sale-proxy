import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Button, Checkbox, Input, Select, Switch, Table} from 'antd';
import {
    clearListProxyAction, deleteProxy,
    exportProxyAction,
    getListProxyAction,
    updateProxyAction
} from "../../../store/actions/proxyActions";
import { Tabs } from 'antd';
import React from 'react';
import {debounce} from "../../../common/helpers";
import {format} from "date-fns";
import {CheckOutlined, CloseOutlined} from "@ant-design/icons";
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
        status: 'ALL',
    });
    const [selectedList, setSelectedList] = useState([]);
    const [deleteLoading, setDeleteLoading] = useState(false);
    
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

    const onStatusChange = (v) => {
        setListParams({
            ...listParams,
            status: v
        });
    }
    
    const onCheckSelectChange = (id) => {
        if (selectedList.includes(id)) {
            setSelectedList(selectedList.filter(_id => _id !== id));
        } else {
            setSelectedList([...selectedList, id]);
        }
    }

    const handleSelect = () => {
        if (proxyMetadata.data?.length) {
            if (selectedList.length) {
                setSelectedList([]);
            } else {
                setSelectedList(proxyMetadata.data.map(({id}) => id));
            }
        }
    }
    
    const deleteSelect = () => {
        setDeleteLoading(true);
        dispatch(deleteProxy(selectedList, () => {
            dispatch(getListProxyAction(listParams))
            setSelectedList([]);
            setDeleteLoading(false);
        }))
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
        {
            title: 'Ip Public',
            dataIndex: 'ip_public',
            key: 'ip_public'
        },
        {
            title: 'Lastest Update',
            dataIndex: 'updated_at',
            key: 'updated_at',
            render(updatedAt) {
                return format(new Date(updatedAt), 'yyyy/MM/dd HH:mm:ss')
            }
        },
        {
            title: '',
            dataIndex: 'action',
            key: 'action',
            render(_, fields) {
                return <Checkbox onChange={() => onCheckSelectChange(fields.id)} checked={selectedList.includes(fields.id)} />
            }
        }
    ];

    return <>
        <div className="proxy-list-header">
            <div>
                <Select style={{width: '250px'}} value={listParams.filter_type} onChange={onFilterTypeChange}>
                    <Select.Option value="NORMAL">Loại proxy: Bình thường</Select.Option>
                    <Select.Option value="VIP">Loại proxy: VIP</Select.Option>
                </Select>
            </div>
            <div>
                <Select style={{width: '250px', marginLeft: '1rem'}} value={listParams.status} onChange={onStatusChange}>
                    <Select.Option value="ALL">Tình trạng: ALL</Select.Option>
                    <Select.Option value="LIVE">Tình trạng: LIVE</Select.Option>
                    <Select.Option value="NONE">Tình trạng: DIE</Select.Option>
                </Select>
            </div>
            <div className="search-area">
                <Input placeholder="Nhập ip tìm kiếm" onChange={onKeywordChange}/>
            </div>
            <div className="search-area">
                <Button 
                    type="primary" 
                    onClick={onExportProxy}
                    disabled={deleteLoading}
                    loading={deleteLoading}
                >Export All {listParams.type}</Button>
            </div>
            <div className="search-area">
                <Button 
                    type="primary" 
                    icon={!selectedList.length ? <CheckOutlined /> : <CloseOutlined />} 
                    onClick={handleSelect}
                    disabled={deleteLoading}
                    loading={deleteLoading}
                > {selectedList.length ? 'Bỏ chọn tất cả' : 'Chọn tất cả'}</Button>
                {!!selectedList.length && <Button 
                    style={{marginLeft: '1rem'}} 
                    type="primary" onClick={onExportProxy} 
                    danger 
                    onClick={deleteSelect}
                    disabled={deleteLoading}
                    loading={deleteLoading}
                >Xóa {selectedList.length} proxies</Button>}
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