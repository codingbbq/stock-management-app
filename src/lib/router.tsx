import { createBrowserRouter } from 'react-router-dom';
import Home from '@/pages/home';
import Login from '@/pages/login';
import Layout from '@/components/Layout/Layout';


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
			}
		],
	},
]);

export default router;
