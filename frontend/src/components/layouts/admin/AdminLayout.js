import { Layout, Menu } from "antd";
import React, { useEffect, useState } from "react";
import Header from "../Header";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
const { Content, Sider } = Layout;

const listMenu = [
    {
        key: "/admin",
        label: "Dashboard",
    },
    {
        key: "/admin/proxy",
        label: "Proxy",
        children: [
            {
                key: "/admin/proxy/list",
                label: "Danh sách Proxy",
            },
            {
                key: "/admin/proxy/geo",
                label: "Danh sách vị trí",
            },
            {
                key: "/admin/proxy/import",
                label: "Import proxies",
            },
        ],
    },
    {
        key: "/admin/plan",
        label: "Gói",
        children: [
            {
                key: "/admin/plan/list",
                label: "Danh sách",
            },
            {
                key: "/admin/plan/create",
                label: "Tạo mới",
            },
        ],
    },
    {
        key: "/admin/member",
        label: "Thành viên",
        children: [
            {
                key: "/admin/member/list",
                label: "Danh sách",
            },
        ],
    },
    {
        key: "/admin/payment",
        label: "Payment",
        children: [
            {
                key: "/admin/payment/charge",
                label: "Nạp tiền cho member",
            },
            {
                key: "/admin/payment/information",
                label: "Thông tin",
            },
            {
                key: "/admin/payment/create",
                label: "Tạo thông tin",
            },
        ],
    },
];

const AdminLayout = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isMenuMobileActive, setIsMenuMobileActive] = useState(false);

    let [defaultOpenKeys, setDefaultOpenKey] = useState("");

    const onSelect = (v) => {
        navigate(v.key);
    };

    const showMenuMobile = () => {
        setIsMenuMobileActive(!isMenuMobileActive);
    };

    useEffect(() => {
        const paths = location.pathname.split("/").filter(Boolean);
        if (paths.length >= 3) {
            setDefaultOpenKey("/" + paths.slice(0, -1).join("/"));
        }
        setIsMenuMobileActive(false);
    }, [location.pathname]);

    return (
        <Layout className="admin">
            <div className="admin-layout">
                <div className="main-menu menu-light menu-accordion menu-shadow" data-scroll-to-active="true">
                    <div className="navbar-header">
                        <ul className="nav navbar-nav flex-row">
                            <li className="nav-item me-auto">
                                <a className="navbar-brand" href="/">
                                    <span className="brand-logo"></span>
                                    <h2 className="brand-text">1Proxy.net</h2>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="shadow-bottom"></div>
                    <div className="main-menu-content">
                        <ul className="navigation navigation-main" id="main-menu-navigation" data-menu="menu-navigation">
                            <li className="has-sub open nav-item">
                                <Link className="d-flex align-items-center parent" to="/admin">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-home"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                                    <span className="menu-title text-truncate" data-i18n="Dashboards">
                                        Dashboards
                                    </span>
                                    <span className="badge badge-light-warning rounded-pill ms-auto me-1">2</span>
                                </Link>
                            </li>
                            <li className=" navigation-header">
                                <span data-i18n="Apps &amp; Pages">Apps &amp; Pages</span>
                                <i data-feather="more-horizontal"></i>
                            </li>
                            <li className="has-sub open nav-item">
                                <Link className="d-flex align-items-center parent" to="/admin/proxy/list">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-file-text"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                                    <span className="menu-title text-truncate" data-i18n="Email">
                                        Proxies
                                    </span>
                                </Link>
                                <ul className="menu-content">
                                    <li>
                                        <Link className="d-flex align-items-center" to="/admin/proxy/list">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-circle"><circle cx="12" cy="12" r="10"></circle></svg>
                                            <span className="menu-item text-truncate" data-i18n="List">
                                                Danh sách
                                            </span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="d-flex align-items-center" to="/admin/proxy/geo">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-circle"><circle cx="12" cy="12" r="10"></circle></svg>
                                            <span className="menu-item text-truncate" data-i18n="Preview">
                                                Danh sách vị trí
                                            </span>
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="has-sub open nav-item">
                                <Link className="d-flex align-items-center parent" to="/admin/plan/list">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check-square"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>
                                    <span className="menu-title text-truncate" data-i18n="Kanban">
                                        Plans
                                    </span>
                                </Link>
                                <ul className="menu-content">
                                    <li>
                                        <Link className="d-flex align-items-center" to="/admin/plan/create">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-circle"><circle cx="12" cy="12" r="10"></circle></svg>
                                            <span className="menu-item text-truncate" data-i18n="List">
                                                Tạo gói
                                            </span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="d-flex align-items-center" to="/admin/plan/list">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-circle"><circle cx="12" cy="12" r="10"></circle></svg>
                                            <span className="menu-item text-truncate" data-i18n="Preview">
                                                Danh sách
                                            </span>
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="has-sub open nav-item">
                                <Link className="d-flex align-items-center parent" to="/admin/member">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                    <span className="menu-title text-truncate" data-i18n="Kanban">
                                        Members
                                    </span>
                                </Link>
                                <ul className="menu-content">
                                    <li>
                                        <Link className="d-flex align-items-center" to="/admin/member">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-circle"><circle cx="12" cy="12" r="10"></circle></svg>
                                            <span className="menu-item text-truncate" data-i18n="List">
                                                Danh sách
                                            </span>
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="has-sub open nav-item">
                                <Link className="d-flex align-items-center parent" href="#">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-grid"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                                    <span className="menu-title text-truncate" data-i18n="Invoice">
                                        Payment
                                    </span>
                                </Link>
                                <ul className="menu-content">
                                    <li>
                                        <Link className="d-flex align-items-center" to="/admin/payment/charge">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-circle"><circle cx="12" cy="12" r="10"></circle></svg>
                                            <span className="menu-item text-truncate" data-i18n="List">
                                                Nạp tiền
                                            </span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="d-flex align-items-center" to="/admin/payment/information">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-circle"><circle cx="12" cy="12" r="10"></circle></svg>
                                            <span className="menu-item text-truncate" data-i18n="Preview">
                                                Thông tin
                                            </span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="d-flex align-items-center" to="/admin/payment/create">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-circle"><circle cx="12" cy="12" r="10"></circle></svg>
                                            <span className="menu-item text-truncate" data-i18n="Preview">
                                                Tạo thanh toán
                                            </span>
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
                <Layout
                    style={{
                        padding: "0 24px 0 24px",
                    }}
                >
                    <Header />
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
            </div>
            <footer>@1Proxy.Net</footer>
            <div className="mobile">
                <div className="mobile-inner">
                    <div className={isMenuMobileActive ? "mobile-content mobile-content__active" : "mobile-content"}>
                        <ul className="mobile-menu">
                            {listMenu.reduce((acc, item, index) => {
                                return [
                                    ...acc,
                                    <>
                                        {item.children && (
                                            <span className="uppercase" key={index}>
                                                {item.label}
                                            </span>
                                        )}
                                    </>,
                                    ...(item.children
                                        ? item.children.map((child) => {
                                                return (
                                                    <li key={child.key}>
                                                        <Link to={child.key}>{child.label}</Link>
                                                    </li>
                                                );
                                            })
                                        : []),
                                ];
                            }, [])}
                        </ul>
                    </div>
                    <div className="mobile-bar" onClick={showMenuMobile}>
                        MENU
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default AdminLayout;
