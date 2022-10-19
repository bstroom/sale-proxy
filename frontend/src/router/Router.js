import { useRoutes, Navigate } from "react-router-dom"
import { DefaultLayout } from "../components/layouts/default";
import { Login, Register } from "../pages/auth";
import { userRoutes } from './routes/user';
import { adminRoutes } from './routes/admin';
import { AdminLayout } from '../components/layouts/admin';
import { UserLayout } from '../components/layouts/user';
import { AdminRoute, PrivateRoute } from '../components/routes';

function generateRoutes(...routes) {
    return routes.map((route) => {
        let Element = route.element;

        if (!route.meta?.isFullWidth) {
            if (route.meta?.wrapper) {
                Element = (
                    <route.meta.wrapper>
                        {Element}
                    </route.meta.wrapper>
                )
            } else {
                switch (route.path) {
                    case '/admin':
                        Element = (
                            <AdminLayout>
                                <AdminRoute route={route}>{Element}</AdminRoute>
                            </AdminLayout>
                        );
                        break;
                    case '/dashboard':
                        Element = (
                            <UserLayout>
                                <PrivateRoute route={route}>{Element}</PrivateRoute>
                            </UserLayout>
                        );
                        break;
                }
            }
        }

        return {
            ...route,
            element: <>{Element}</>
        }
    });
}

const Router = () => {
    const routes = useRoutes([
        {
            path: '/',
            index: true,
            element: <Navigate replace to={'/dashboard'} />
        },
        {
            path: '/auth',
            element: <DefaultLayout />,
            children: [
                {
                    path: 'login',
                    element: <Login />,
                    meta: {
                        isFullWidth: true,
                    }
                },
                {
                    path: 'register',
                    element: <Register />,
                    meta: {
                        isFullWidth: true,
                    }
                }
            ],
        },
        ...generateRoutes(...userRoutes, ...adminRoutes)
    ]);

    return routes;
}

export default Router;