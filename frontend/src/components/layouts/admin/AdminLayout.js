import { Layout, Menu } from 'antd';
import React, {useEffect, useState} from 'react';
import Header from "../Header";
import {Link, useNavigate} from "react-router-dom";
import { useLocation } from "react-router-dom"
const { Content, Sider } = Layout;

const listMenu = [
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
            },
            {
                key: '/admin/payment/create',
                label: 'Tạo thông tin',
            }
        ]
    },
];

const AdminLayout = ({children}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isMenuMobileActive, setIsMenuMobileActive] = useState(false);
    
    let [defaultOpenKeys, setDefaultOpenKey] = useState('');
    
    const onSelect = (v) => {
        navigate(v.key);
    }
    
    const showMenuMobile = () => {
        setIsMenuMobileActive(!isMenuMobileActive);
    }
    
    
    useEffect(() => {
        const paths = location.pathname.split('/').filter(Boolean);
        if (paths.length >= 3) {
            setDefaultOpenKey('/' + paths.slice(0 , -1).join('/'));
        }
        setIsMenuMobileActive(false);
    }, [location.pathname]);
    
    return <Layout className="admin">
        <Header/>
        <Layout>
            <Sider width={200} className="sidebar site-layout-background">
                <Menu
                    mode="inline"
                    defaultSelectedKeys={[location.pathname]}
                    defaultOpenKeys={[defaultOpenKeys]}
                    selectedKeys={defaultOpenKeys}
                    onSelect={onSelect}
                    
                    style={{
                        height: '100%',
                        borderRight: 0,
                    }}
                    items={listMenu}
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
        <footer>
            @ProxyList.Fun
        </footer>
        <div className="mobile">
            <div className="mobile-inner">
                <div className={isMenuMobileActive ? 'mobile-content mobile-content__active' : 'mobile-content'}>
                    <ul className="mobile-menu">
                        {listMenu.reduce((acc, item, index) => {
                           return [...acc, (<>
                               {item.children && <span className="uppercase" key={index}>{item.label}</span>}
                           </>),  ...item.children ? (item.children.map(child => {
                               return <li key={child.key}>
                                   <Link to={child.key}>
                                       {child.label}
                                   </Link>
                               </li>
                           })) : []]
                        }, [])}
                    </ul>
                </div>
                <div className="mobile-bar" onClick={showMenuMobile}>
                    MENU
                </div>
            </div>
        </div>
    </Layout>
};

export default AdminLayout;