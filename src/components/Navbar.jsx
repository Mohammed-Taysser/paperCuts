import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/auth';
import { FcSearch } from 'react-icons/fc';
import 'bootstrap/js/src/collapse';
import favicon from '../assets/img/favicon.png';

function Navbar() {
  const auth_context = useContext(AuthContext);
  const onLogoutClick = (e) => {
    e.preventDefault();
    auth_context.setIsAuth(false);
    auth_context.setUserId(null);
    localStorage.removeItem('auth');
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
            <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
              <li className='nav-item'>
                <Link className='nav-link active' to='/'>
                  Home
                </Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to='/category'>
                  categories
                </Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to='/books'>
                  books
                </Link>
              </li>
            </ul>
            <form className='me-auto' action='/search'>
              <div className='navbar-search-form'>
                <input
                  className='form-control form-control-sm'
                  type='search'
                  name='query'
                  placeholder='Search'
                  aria-label='Search'
                />
                <button className='btn btn-link btn-sm' type='submit'>
                  <FcSearch />
                </button>
              </div>
            </form>
            <ul className='navbar-nav mb-2 mb-lg-0'>
              {auth_context.isAuth ? (
                <>
                  <li className='nav-item'>
                    <Link className='nav-link' to='/profile'>
                      Profile
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link
                      className='nav-link'
                      to='/logout'
                      onClick={onLogoutClick}
                    >
                      Logout
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className='nav-item'>
                    <Link className='nav-link' to='/login'>
                      Login
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link className='nav-link' to='/register'>
                      register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
