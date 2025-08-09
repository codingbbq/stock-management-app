import { useAuth } from '@/lib/AuthContext';
import { Link } from 'react-router-dom';

const Navigation: React.FC = () => {
	const { isLoggedIn, logout } = useAuth();

	const handleLogout = () => {
		logout();
	}
	return (
		<>
			<div className='sticky top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 dark:border-slate-50/[0.06] bg-white/95 supports-backdrop-blur:bg-white/60 dark:bg-transparent'>
				<div className='max-w-8xl mx-auto'>
					<div className='py-4 border-b border-slate-900/10 lg:px-8 lg:border-0 dark:border-slate-300/10 px-4'>
						<div className='relative flex items-center'>
							<Link
								className='mr-3 flex-none overflow-hidden md:w-auto'
								to='/'
							>
								<span>Modern Printers</span>
							</Link>

							<div className='relative hidden lg:flex items-center ml-auto'>
								<nav className='text-sm leading-6 font-semibold text-slate-700 dark:text-slate-200'>
									<ul className='flex space-x-8'>
										{!isLoggedIn && (
											<li>
												<Link
													className='hover:text-sky-500 dark:hover:text-sky-400'
													to='/login'
												>
													Log In
												</Link>
											</li>
										)}
										{isLoggedIn && (
											<li>
												<button
													onClick={handleLogout}
													className='hover:text-sky-500 dark:hover:text-sky-400'
												>
													Logout
												</button>
											</li>
										)}
									</ul>
								</nav>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Navigation;
