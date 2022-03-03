import React, { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Context as AuthContext } from '../../context/auth';
import { FcSearch } from 'react-icons/fc';
import { BsCart4 } from 'react-icons/bs';
import 'bootstrap/js/src/collapse';
import favicon from '../../assets/img/favicon.png';

function Navbar() {
  const auth_context = useContext(AuthContext),
    navigate_to = useNavigate();

  const onLogoutClick = (e) => {
    e.preventDefault();
    auth_context.setIsAuth(false);
    auth_context.setUserData(null);
    localStorage.removeItem('auth');
    navigate_to('/login');
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
            <ul className='navbar-nav me-auto'>
              <li className='nav-item'>
                <NavLink
                  className={`nav-link ${({ isActive }) =>
                    isActive ? 'active' : null}`}
                  to='/'
                >
                  Home
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink
                  className={`nav-link ${({ isActive }) =>
                    isActive ? 'active' : null}`}
                  to='/category'
                >
                  categories
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink
                  className={`nav-link ${({ isActive }) =>
                    isActive ? 'active' : null}`}
                  to='/books'
                >
                  books
                </NavLink>
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
            <ul className='navbar-nav'>
              {auth_context.isAuth ? (
                <>
                  <li className='nav-item'>
                    <NavLink
                      className={`nav-link ${({ isActive }) =>
                        isActive ? 'active' : null}`}
                      to='/cart'
                    >
                      <BsCart4 className='h5 m-0' />
                    </NavLink>
                  </li>
                  <li className='nav-item'>
                    <NavLink
                      className={`nav-link ${({ isActive }) =>
                        isActive ? 'active' : null}`}
                      to='/profile'
                    >
                      <img src={auth_context.userData.img} alt={auth_context.userData.first_name} width={25} className='img-fluid rounded-circle me-1' />
                      {auth_context.userData.first_name}
                    </NavLink>
                  </li>
                  <li className='nav-item'>
                    <NavLink
                      className={`nav-link ${({ isActive }) =>
                        isActive ? 'active' : null}`}
                      to='/logout'
                      onClick={onLogoutClick}
                    >
                      Logout
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className='nav-item'>
                    <NavLink
                      className={`nav-link ${({ isActive }) =>
                        isActive ? 'active' : null}`}
                      to='/login'
                    >
                      Login
                    </NavLink>
                  </li>
                  <li className='nav-item'>
                    <NavLink
                      className={`nav-link ${({ isActive }) =>
                        isActive ? 'active' : null}`}
                      to='/register'
                    >
                      register
                    </NavLink>
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
