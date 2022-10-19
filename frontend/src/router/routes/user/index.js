import { DefaultLayout } from "../../../components/layouts/default";
import { UserDashboard } from "../../../pages/user/dashboard";
import { Payment } from "../../../pages/user/payment";
import { UserProxy, UserProxyDetail } from "../../../pages/user/proxy";
import { UserProfile } from "../../../pages/user/profile";

export const userRoutes = [
    {
        path: '/dashboard',
        element: <DefaultLayout />,
        children: [
            {
                path: '/dashboard',
                element: <UserDashboard />,
                index: true,
            },
            {
                path: 'proxy',
                element: <UserProxy />,
            },
            {
                path: 'proxy/:key',
                element: <UserProxyDetail />,
            },
            {
                path: 'payment',
                element: <Payment />,
            },
            {
                path: 'profile',
                element: <UserProfile />,
            },
        ]
    }
];
