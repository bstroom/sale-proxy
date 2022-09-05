import {Login, Register} from "./pages/auth";
import {Home} from "./pages/home";
import {CreatePlan, EditPlan, ListPlan} from "./pages/admin/plan";
import {ListProxy, GeoList, ImportProxy} from "./pages/admin/proxy";
import {MemberList} from "./pages/admin/member";

import {DefaultLayout} from "./components/layouts/default";
import AdminLayout from "./components/layouts/admin/AdminLayout";
import {UserLayout} from "./components/layouts/user";
import {UserDashboard} from "./pages/user/dashboard";
import {Payment} from "./pages/user/payment";
import {UserProxy, UserProxyDetail} from "./pages/user/proxy";
import {Charge, Information} from "./pages/admin/payment";
import {UserProfile} from "./pages/user/profile";
import AdminDashboard from "./pages/admin/AdminDashboard";

export const routes = [
    {
        path: '/login',
        page: Login,
        exact: true,
        private: false,
        admin: false,
        layout: DefaultLayout
    },
    {
        path: '/register',
        page: Register,
        exact: true,
        private: false,
        admin: false,
        layout: DefaultLayout
    },
    {
        path: '/',
        page: Home,
        exact: false,
        private: true,
        admin: false,
        layout: DefaultLayout
    },
    {
        path: '/admin',
        page: AdminDashboard,
        exact: false,
        private: true,
        admin: true,
        layout: AdminLayout,
        children: [
            {
                path: '/plan/list',
                page: ListPlan,
                exact: true,
            },
            {
                path: '/plan/create',
                page: CreatePlan,
                exact: true,
            },
            {
                path: '/plan/detail/:id',
                page: EditPlan,
                exact: true,
            },
            {
                path: '/proxy/list',
                page: ListProxy,
                exact: true,
            },
            {
                path: '/proxy/geo',
                page: GeoList,
                exact: true,
            },
            {
                path: '/proxy/import',
                page: ImportProxy,
                exact: true,
            },
            {
                path: '/member/list',
                page: MemberList,
                exact: true,
            },
            {
                path: '/payment/charge',
                page: Charge,
                exact: true,
            },
            {
                path: '/payment/information',
                page: Information,
                exact: true,
            },
            {
                path: '/',
                page: AdminDashboard,
                exact: false,
            },
        ]
    },
    {
        path: '/dashboard',
        page: UserDashboard,
        exact: false,
        private: true,
        admin: false,
        layout: UserLayout,
        children: [
            {
                path: '/',
                page: UserDashboard,
                exact: false,
            },
            {
                path: '/proxy',
                page: UserProxy,
                exact: true,
            },
            {
                path: '/proxy/:key',
                page: UserProxyDetail,
                exact: true,
            },
            {
                path: '/payment',
                page: Payment,
                exact: true,
            },
            {
                path: '/profile',
                page: UserProfile,
                exact: true,
            },
        ]
    }
];