import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FcSearch } from 'react-icons/fc';
import { BsCart4, BsBookmarkHeart, BsPersonBoundingBox } from 'react-icons/bs';
import { FaBoxes } from 'react-icons/fa';
import { GrUserSettings } from 'react-icons/gr';
import { IoIosCheckboxOutline } from 'react-icons/io';
import { RiCalendarEventFill, RiFilePaper2Line } from 'react-icons/ri';
import { FiLogOut, FiPhoneCall, FiUsers } from 'react-icons/fi';
import { unsubscribeFeature } from '../../redux/features/auth.slice';
import { GoBook } from 'react-icons/go';
import { BiCategoryAlt } from 'react-icons/bi';
import { AiOutlineDashboard, AiOutlineHome } from 'react-icons/ai';
import { MdOutlineMarkunreadMailbox } from 'react-icons/md';
import favicon from '../../assets/images/icons/favicon.png';
import 'bootstrap/js/src/collapse';
import 'bootstrap/js/src/dropdown';
import '../../assets/scss/layout/navbar.scss';

function Navbar() {
	const navigate_to = useNavigate();
	const dispatch = useDispatch();
	const { isLoggedIn, user } = useSelector((state) => state['auth']);
	const [query, setQuery] = useState('');

	const AuthLinks = () => {
		return (
			<ul className="navbar-nav">
				{isLoggedIn ? (
					<li className="nav-item dropdown">
						<a
							className="nav-link dropdown-toggle"
							href="#settings"
							id="author-profile-id"
							role="button"
							data-bs-toggle="dropdown"
							aria-expanded="false"
						>
							<img
								src={user.avatar}
								alt={user.username}
								width={25}
								className="img-fluid rounded-circle me-1"
							/>
							{user.username}
						</a>
						<ul
							className="dropdown-menu profile-dropdown"
							aria-labelledby="author-profile-id"
						>
							<li>
								<Link className="dropdown-item" to="/profile">
									setting
									<GrUserSettings />
								</Link>
							</li>
							<li>
								<Link
									className="dropdown-item"
									to={`/authors/${user.username}`}
								>
									profile
									<BsPersonBoundingBox />
								</Link>
							</li>
							<li>
								<Link className="dropdown-item" to="/cart">
									cart
									<BsCart4 />
								</Link>
							</li>
							<li>
								<Link className="dropdown-item" to="/orders">
									orders
									<FaBoxes />
								</Link>
							</li>
							<li>
								<Link className="dropdown-item" to="/checkout">
									checkout
									<IoIosCheckboxOutline />
								</Link>
							</li>
							<li>
								<Link className="dropdown-item" to="/wishlist">
									wishlist
									<BsBookmarkHeart />
								</Link>
							</li>
							{user.role === 'admin' && (
								<li>
									<Link className="dropdown-item" to="/dashboard">
										dashboard
										<AiOutlineDashboard />
									</Link>
								</li>
							)}
							<li>
								<hr className="dropdown-divider" />
							</li>
							<li>
								<Link
									className="dropdown-item danger-item"
									to="/logout"
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
						<li className="nav-item">
							<NavLink className="nav-link" to="/login">
								Login
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink className="nav-link" to="/register">
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
			<ul className="navbar-nav me-auto">
				<li className="nav-item">
					<NavLink className="nav-link" to="/">
						<AiOutlineHome className="h5 m-1 mt-0" />
						Home
					</NavLink>
				</li>
				<li className="nav-item">
					<NavLink className="nav-link" to="/books">
						<GoBook className="h5 m-1 mt-0" />
						books
					</NavLink>
				</li>
				<li className="nav-item dropdown">
					<a
						className="nav-link dropdown-toggle"
						href="#other-utilities"
						id="other-utilities-id"
						role="button"
						data-bs-toggle="dropdown"
						aria-expanded="false"
					>
						<MdOutlineMarkunreadMailbox className="h5 m-1 mt-0" />
						More
					</a>
					<ul
						className="dropdown-menu utilities-dropdown"
						aria-labelledby="other-utilities-id"
					>
						<li>
							<Link className="dropdown-item" to="/category">
								category
								<BiCategoryAlt />
							</Link>
						</li>
						<li>
							<Link className="dropdown-item" to="/authors">
								authors
								<FiUsers />
							</Link>
						</li>
						<li>
							<Link className="dropdown-item" to="/events">
								events
								<RiCalendarEventFill />
							</Link>
						</li>
						<li>
							<Link className="dropdown-item" to="/about-us">
								about us
								<RiFilePaper2Line />
							</Link>
						</li>
						<li>
							<Link className="dropdown-item" to="/contact-us">
								contact us
								<FiPhoneCall />
							</Link>
						</li>
						<li>
							<hr className="dropdown-divider" />
						</li>
						<li>
							<Link className="dropdown-item danger-item" to="/PageNotFound">
								404
								<svg
									stroke="currentColor"
									fill="none"
									strokeWidth="2"
									viewBox="0 0 24 24"
									strokeLinecap="round"
									strokeLinejoin="round"
									height="1em"
									width="1em"
									xmlns="http://www.w3.org/2000/svg"
								>
									<desc></desc>
									<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
									<path d="M3 7v4a1 1 0 0 0 1 1h3"></path>
									<path d="M7 7v10"></path>
									<path d="M10 8v8a1 1 0 0 0 1 1h2a1 1 0 0 0 1 -1v-8a1 1 0 0 0 -1 -1h-2a1 1 0 0 0 -1 1z"></path>
									<path d="M17 7v4a1 1 0 0 0 1 1h3"></path>
									<path d="M21 7v10"></path>
								</svg>
							</Link>
						</li>
					</ul>
				</li>
			</ul>
		);
	};

	const onLogoutClick = (e) => {
		e.preventDefault();
		dispatch(unsubscribeFeature());
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
			<nav className="navbar navbar-expand-md navbar-light bg-light">
				<div className="container">
					<Link className="navbar-brand" to="/">
						<img src={favicon} alt="website favicon" width="50" height="50" />
					</Link>
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbar-main-menu"
						aria-controls="navbar-main-menu"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbar-main-menu">
						<MainNavBarItems />
						<form className="me-auto" onSubmit={onFormSubmit}>
							<div className="navbar-search-form">
								<input
									className="form-control form-control-sm"
									type="search"
									name="query"
									placeholder="Search"
									value={query}
									onChange={(e) => setQuery(e.target.value)}
									aria-label="Search"
								/>
								<button className="btn btn-link btn-sm" type="submit">
									<FcSearch />
								</button>
							</div>
						</form>
						<AuthLinks />
					</div>
				</div>
			</nav>
		</>
	);
}

export default Navbar;
