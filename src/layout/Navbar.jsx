import React, {  useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FcSearch } from 'react-icons/fc';
import { BsCart4, BsBookmarkHeart } from 'react-icons/bs';
import { FiLogOut } from 'react-icons/fi';
import { logout } from '../redux/features/auth.slice';
import favicon from '../assets/images/icons/favicon.png';
import 'bootstrap/js/src/collapse';
import 'bootstrap/js/src/dropdown';
import '../assets/scss/layout/navbar.scss';

function Navbar() {
  const navigate_to = useNavigate();
	const dispatch = useDispatch()
	const { jwt_token } = useSelector((state) => state['auth']);
  const [query, setQuery] = useState('');

  const AuthLinks = () => {
    return (
      <ul className='navbar-nav'>
        {jwt_token ? (
          <>
            <li className='nav-item'>
              <NavLink className='nav-link' to='/wishlist'>
                <BsBookmarkHeart className='h5 m-0' />
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className='nav-link' to='/cart'>
                <BsCart4 className='h5 m-0' />
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className='nav-link' to='/profile'>
                <img
                  src={jwt_token.avatar}
                  alt={jwt_token.username}
                  width={25}
                  className='img-fluid rounded-circle me-1'
                />
                {jwt_token.username}
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink
                className='nav-link'
                to='/logout'
                onClick={onLogoutClick}
              >
                Logout <FiLogOut />
              </NavLink>
            </li>
          </>
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
            Home
          </NavLink>
        </li>
        <li className='nav-item'>
          <NavLink className='nav-link' to='/category'>
            category
          </NavLink>
        </li>
        <li className='nav-item'>
          <NavLink className='nav-link' to='/books'>
            books
          </NavLink>
        </li>
        <li className='nav-item'>
          <NavLink className='nav-link' to='/pages'>
            PAGES
          </NavLink>
        </li>
      </ul>
    );
  };

  const onLogoutClick = (e) => {
    e.preventDefault();
    dispatch(logout())
    localStorage.removeItem('token');
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
            <AuthLinks />
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
