import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FcSearch } from 'react-icons/fc';
import { FiLogOut } from 'react-icons/fi';
import { logout } from '../../redux/features/auth.slice';
import { GoBook } from 'react-icons/go';
import { AiOutlineDashboard, AiOutlineHome } from 'react-icons/ai';
import { MdOutlineMarkunreadMailbox } from 'react-icons/md';
import { MORE_DROPDOWN_LINK, USER_DROPDOWN_LINK } from '../../constants/navbar';
import favicon from '../../assets/images/icons/favicon.png';

const AuthLinks = ({ isLoggedIn, user, onLogoutClick }) => {
	return (
		<ul className='navbar-nav'>
			{isLoggedIn ? (
				<li className='nav-item dropdown'>
					<a
						className='nav-link dropdown-toggle'
						href='#settings'
						id='author-profile-id'
						role='button'
						data-bs-toggle='dropdown'
						aria-expanded='false'
					>
						<img
							src={user?.avatar}
							alt={user?.username}
							width={25}
							className='img-fluid rounded-circle me-1'
						/>
						{user?.firstName}
					</a>
					<ul
						className='dropdown-menu profile-dropdown'
						aria-labelledby='author-profile-id'
					>
						{USER_DROPDOWN_LINK.map((item) => (
							<li key={item.title}>
								<Link
									className='dropdown-item'
									to={
										item.title === 'profile'
											? `${item.path}/${user?.username}`
											: item.path
									}
								>
									{item.title}
									<item.icon />
								</Link>
							</li>
						))}

						{user?.role === 'admin' && (
							<li>
								<Link className='dropdown-item' to='/dashboard'>
									dashboard
									<AiOutlineDashboard />
								</Link>
							</li>
						)}
						<li>
							<hr className='dropdown-divider' />
						</li>
						<li>
							<Link
								className='dropdown-item danger-item'
								to='/logout'
								onClick={onLogoutClick}
							>
								Logout
								<FiLogOut />
							</Link>
						</li>
					</ul>
				</li>
			) : (
				<>
					<li className='nav-item'>
						<NavLink className='nav-link' to='/login'>
							Login
						</NavLink>
					</li>
					<li className='nav-item'>
						<NavLink className='nav-link' to='/register'>
							register
						</NavLink>
					</li>
				</>
			)}
		</ul>
	);
};

const MainNavBarItems = () => {
	return (
		<ul className='navbar-nav me-auto'>
			<li className='nav-item'>
				<NavLink className='nav-link' to='/'>
					<AiOutlineHome className='h5 m-1 mt-0' />
					Home
				</NavLink>
			</li>
			<li className='nav-item'>
				<NavLink className='nav-link' to='/books'>
					<GoBook className='h5 m-1 mt-0' />
					books
				</NavLink>
			</li>
			<li className='nav-item dropdown'>
				<a
					className='nav-link dropdown-toggle'
					href='#other-utilities'
					id='other-utilities-id'
					role='button'
					data-bs-toggle='dropdown'
					aria-expanded='false'
				>
					<MdOutlineMarkunreadMailbox className='h5 m-1 mt-0' />
					More
				</a>
				<ul
					className='dropdown-menu utilities-dropdown'
					aria-labelledby='other-utilities-id'
				>
					{MORE_DROPDOWN_LINK.map((item) => (
						<li key={item.title}>
							<Link className='dropdown-item' to={item.path}>
								{item.title}
								<item.icon />
							</Link>
						</li>
					))}
				</ul>
			</li>
		</ul>
	);
};

function Navbar() {
	const navigate_to = useNavigate();
	const dispatch = useDispatch();
	const { isLoggedIn, user } = useSelector((state) => state['auth']);
	const [query, setQuery] = useState('');

	const onLogoutClick = (e) => {
		e.preventDefault();
		dispatch(logout());
		navigate_to('/login');
	};

	const onFormSubmit = (evt) => {
		evt.preventDefault();
		let newQuery = query;
		setQuery('');
		navigate_to(`/books?title=${newQuery}`);
	};

	return (
		<>
			<nav className='navbar navbar-expand-md navbar-light bg-light'>
				<div className='container'>
					<Link className='navbar-brand' to='/'>
						<img src={favicon} alt='website favicon' width='50' height='50' />
					</Link>
					<button
						className='navbar-toggler'
						type='button'
						data-bs-toggle='collapse'
						data-bs-target='#navbar-main-menu'
						aria-controls='navbar-main-menu'
						aria-expanded='false'
						aria-label='Toggle navigation'
					>
						<span className='navbar-toggler-icon'></span>
					</button>
					<div className='collapse navbar-collapse' id='navbar-main-menu'>
						<MainNavBarItems />
						<form className='me-auto' onSubmit={onFormSubmit}>
							<div className='navbar-search-form'>
								<input
									className='form-control form-control-sm'
									type='search'
									name='query'
									placeholder='Search'
									value={query}
									onChange={(e) => setQuery(e.target.value)}
									aria-label='Search'
								/>
								<button className='btn btn-link btn-sm' type='submit'>
									<FcSearch />
								</button>
							</div>
						</form>
						<AuthLinks
							isLoggedIn={isLoggedIn}
							user={user}
							onLogoutClick={onLogoutClick}
						/>
					</div>
				</div>
			</nav>
		</>
	);
}

export default Navbar;
