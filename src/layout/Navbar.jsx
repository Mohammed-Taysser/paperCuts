import React, { useContext, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Context as AuthContext } from '../context/auth';
import { FcSearch } from 'react-icons/fc';
import { BsCart4, BsBookmarkHeart } from 'react-icons/bs';
import { FiLogOut } from 'react-icons/fi';
import 'bootstrap/js/src/collapse';
import 'bootstrap/js/src/dropdown';
import favicon from '../assets/images/icons/favicon.png';

function Navbar() {
  const auth_context = useContext(AuthContext),
    navigate_to = useNavigate();
  const [query, setQuery] = useState('');

  const PagesDropDownItems = () => {
    return (
      <ul className='dropdown-menu' aria-labelledby='sitemap-pages'>
        <li>
          <Link className='dropdown-item' to='/events'>
            events
          </Link>
        </li>
        <li>
          <Link className='dropdown-item' to='/authors'>
            authors
          </Link>
        </li>
        <li>
          <Link className='dropdown-item' to='/checkout'>
            checkout
          </Link>
        </li>
        <li>
          <Link className='dropdown-item' to='/orders'>
            orders
          </Link>
        </li>
        <li>
          <hr className='dropdown-divider' />
        </li>
        <li>
          <Link className='dropdown-item' to='/forget-password'>
            forget password
          </Link>
        </li>
        <li>
          <Link className='dropdown-item' to='/page-not-found'>
            404
          </Link>
        </li>
      </ul>
    );
  };

  const AuthLinks = () => {
    return (
      <ul className='navbar-nav'>
        {auth_context.isAuth ? (
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
                  src={auth_context.userData.avatar}
                  alt={auth_context.userData.firstName}
                  width={25}
                  className='img-fluid rounded-circle me-1'
                />
                {auth_context.userData.firstName}
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
        <li className='nav-item dropdown'>
          <a
            className='nav-link dropdown-toggle'
            href='#pages'
            id='sitemap-pages'
            role='button'
            data-bs-toggle='dropdown'
            aria-expanded='false'
          >
            Pages
          </a>
          <PagesDropDownItems />
        </li>
      </ul>
    );
  };

  const onLogoutClick = (e) => {
    e.preventDefault();
    auth_context.setIsAuth(false);
    auth_context.setUserData(null);
    localStorage.removeItem('auth');
    navigate_to('/login');
  };

  const onFormSubmit = (evt) => {
    evt.preventDefault();
    navigate_to(`/books?title=${query}`);
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
