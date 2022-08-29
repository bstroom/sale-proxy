import { Layout, Menu } from 'antd';
import React from 'react';
import Header from "../Header";
import {useNavigate} from "react-router-dom";
import { useLocation } from "react-router-dom"
const { Content, Sider } = Layout;


const UserLayout = ({children}) => {
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
    
    return <Layout className="user">
        <Layout>
            <Sider width={200} className="site-layout-background">
                <Menu
                    theme="dark"
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
                            key: '/dashboard',
                            label: 'Cửa hàng',
                        },
                        {
                            key: '/dashboard/proxy',
                            label: 'Proxy của tôi'
                        },
                        {
                            key: '/dashboard/payment',
                            label: 'Nạp tiền',
                            // children: [
                            //     {
                            //         key: '/admin/proxy/list',
                            //         label: 'Danh sách Proxy',
                            //     },
                            //     {
                            //         key: '/admin/proxy/geo',
                            //         label: 'Danh sách vị trí',
                            //     }
                            // ]
                        },
                        {
                            key: '/dashboard/profile',
                            label: 'Profile'
                        },
                    ]}
                />
            </Sider>
            <Layout
                style={{
                    padding: '0 24px 24px',
                }}
            >
                <Header/>
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

export default UserLayout;