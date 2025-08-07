import { RouterProvider } from 'react-router-dom';
import router from './lib/router';
import React from 'react';
import { AuthProvider } from './lib/AuthContext';
import { LoaderProvider } from './lib/LoaderContext';

const App: React.FC = () => {
	return (
		<>
			<React.StrictMode>
				<LoaderProvider>
					<AuthProvider>
						<RouterProvider router={router} />
					</AuthProvider>
				</LoaderProvider>
			</React.StrictMode>
		</>
	);
};

export default App;
