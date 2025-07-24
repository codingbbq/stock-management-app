import { createBrowserRouter } from 'react-router-dom';
import Home from '@/pages/home';
import Login from '@/pages/login';
import Layout from '@/components/Layout/Layout';
import Dashboard from '@/pages/dashboard';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				path: '/',
				element: <Home />,
			},
			{
				path: '/login',
				element: <Login />,
			},
            {
                path: '/dashboard',
                element: <Dashboard />
            }
		],
	},
]);

export default router;
