import { Layout, Menu } from 'antd';
import React from 'react';
import Header from "../Header";
import {useNavigate} from "react-router-dom";
import { useLocation } from "react-router-dom"
const { Content, Sider } = Layout;


const AdminLayout = ({children}) => {
    const navigate = useNavigate();
    const location = useLocation();
    let defaultOpenKeys = '';
    const paths = location.pathname.split('/').filter(Boolean);
    if (paths.length >= 3) {
        defaultOpenKeys = '/' + paths.slice(0 , -1).join('/');
    }
    
    const onSelect = (v) => {
        navigate(v.key);
    }
    
    return <Layout className="admin">
        <Header/>
        <Layout>
            <Sider width={200} className="site-layout-background">
                <Menu
                    mode="inline"
                    defaultSelectedKeys={[location.pathname]}
                    defaultOpenKeys={[defaultOpenKeys]}
                    onSelect={onSelect}
                    style={{
                        height: '100%',
                        borderRight: 0,
                    }}
                    items={[
                        {
                            key: '/admin',
                            label: 'Dashboard',
                        },
                        {
                            key: '/admin/proxy',
                            label: 'Proxy',
                            children: [
                                {
                                    key: '/admin/proxy/list',
                                    label: 'Danh sách Proxy',
                                },
                                {
                                    key: '/admin/proxy/geo',
                                    label: 'Danh sách vị trí',
                                },
                                {
                                    key: '/admin/proxy/import',
                                    label: 'Import proxies',
                                }
                            ]
                        },
                        {
                            key: '/admin/plan',
                            label: 'Gói',
                            children: [
                                {
                                    key: '/admin/plan/list',
                                    label: 'Danh sách',
                                },
                                {
                                    key: '/admin/plan/create',
                                    label: 'Tạo mới',
                                }
                            ]
                        },
                        {
                            key: '/admin/member',
                            label: 'Thành viên',
                            children: [
                                {
                                    key: '/admin/member/list',
                                    label: 'Danh sách',
                                }
                            ]
                        },
                        {
                            key: '/admin/payment',
                            label: 'Payment',
                            children: [
                                {
                                    key: '/admin/payment/charge',
                                    label: 'Nạp tiền cho member',
                                },
                                {
                                    key: '/admin/payment/information',
                                    label: 'Thông tin',
                                }
                            ]
                        },
                    ]}
                />
            </Sider>
            <Layout
                style={{
                    padding: '0 24px 24px',
                }}
            >
                <Content
                    className="site-layout-background"
                    style={{
                        padding: 24,
                        margin: 0,
                        minHeight: 280,
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    </Layout>
};

export default AdminLayout;