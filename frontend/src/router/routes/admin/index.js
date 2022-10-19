import { DefaultLayout } from "../../../components/layouts/default";
import { UserDashboard } from "../../../pages/user/dashboard";
import { Payment } from "../../../pages/user/payment";
import { UserProxy, UserProxyDetail } from "../../../pages/user/proxy";
import { UserProfile } from "../../../pages/user/profile";
import { CreatePlan, EditPlan, ListPlan } from "../../../pages/admin/plan";
import AdminDashboard from "../../../pages/admin/AdminDashboard";
import { Navigate } from "react-router-dom";
import { GeoList, ImportProxy, ListProxy } from "../../../pages/admin/proxy";
import { MemberList } from "../../../pages/admin/member";
import { Charge, CreatePayment, EditPayment, Information } from "../../../pages/admin/payment";

export const adminRoutes = [
    {
        path: '/admin',
        element: <DefaultLayout />,
        children: [
            {
                path: '',
                element: <AdminDashboard />,
                index: true,
            },
            {
                path: 'plan',
                children: [
                    {
                        path: 'list',
                        element: <ListPlan />,
                    },
                    {
                        path: 'create',
                        element: <CreatePlan />,
                    },
                    {
                        path: 'detail/:id',
                        element: <EditPlan />,
                    }
                ]
            },
            {
                path: 'proxy',
                children: [
                    {
                        path: 'list',
                        element: <ListProxy />,
                    },
                    {
                        path: 'import',
                        element: <ImportProxy />,
                    },
                    {
                        path: 'geo',
                        element: <GeoList />,
                    }
                ]
            },
            {
                path: 'member',
                element: <MemberList />,
                children: [
                    {
                        path: 'list',
                        element: <MemberList />,
                    }
                ]
            },
            {
                path: 'payment',
                children: [
                    {
                        path: 'charge',
                        element: <Charge />,
                    },
                    {
                        path: 'information',
                        element: <Information />,
                    },
                    {
                        path: ':id',
                        element: <EditPayment />,
                    },
                    {
                        path: 'create',
                        element: <CreatePayment />,
                    },
                ]
            },
        ]
    }
];
