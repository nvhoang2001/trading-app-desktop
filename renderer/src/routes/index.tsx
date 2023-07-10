import { RouteObject, createBrowserRouter } from 'react-router-dom';

import VoidLayout from '@/layouts/Void';
import DefaultLayout from '@/layouts/Default';

import Auth from '@/components/shared/Auth';
import LoginPage from '@/pages/Login';
import Homepage from '@/pages/Homepage';
import ConfigPage from '@/pages/Configs';
import NotFoundPage from '@/pages/404';
import CrossTradePage from '@/pages/CrossTradePage';
import AuthLayout from '@/layouts/auth';

export const routes: RouteObject[] = [
    {
        path: '/dang-nhap',
        element: <AuthLayout />,
        children: [
            {
                index: true,
                element: <LoginPage />,
            },
        ],
    },
    {
        path: '/',
        element: <Auth element={<DefaultLayout />} />,
        children: [
            {
                index: true,
                element: <Homepage />,
            },
            {
                path: '/platform-diff',
                element: <CrossTradePage />,
            },
            {
                path: '/config',
                element: <ConfigPage />,
            },
            {
                path: '*',
                element: <NotFoundPage />,
            },
        ],
    },
];

export const router = createBrowserRouter(routes);
