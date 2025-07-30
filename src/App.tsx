import { RouterProvider } from 'react-router-dom';
import router from './lib/router';
import React from 'react';
import { AuthProvider } from './lib/AuthContext';

const App: React.FC = () => {
	return (
		<>
			<React.StrictMode>
				<AuthProvider>
					<RouterProvider router={router} />
				</AuthProvider>
			</React.StrictMode>
		</>
	);
};

export default App;
