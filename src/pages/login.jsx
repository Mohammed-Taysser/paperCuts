import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook, FaGithub } from 'react-icons/fa';
import { IoMdWarning } from 'react-icons/io';
import { Context as AuthContext } from '../context/auth';
import Alert from '../components/bootstrap-component/Alert';
import { UserAPI, get_user_by_email } from '../api/Localhost';
import jsonServerToast from '../context/IsJsonServerDown';

function Login() {
  const navigate_to = useNavigate();
  const auth_context = useContext(AuthContext);
  const is_jsonServer_down = useContext(jsonServerToast);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [wrongPassword, setWrongPassword] = useState(false);
  const [userNotExist, setUserNotExist] = useState(false);

  const api_get_user = async () => {
    await UserAPI.get(`?email=${email}`)
      .then((response) => {
        // handle success
        check_user_exist(response.data[0]);
      })
      .catch((error) => {
        check_user_exist(get_user_by_email(email));
      });
  };

  const check_user_exist = (user) => {
    if (user) {
      setUserNotExist(false);
      password === user.password
        ? setWrongPassword(false)
        : setWrongPassword(true);

      auth_context.setIsAuth(true);
      auth_context.setUserData(user);

      localStorage.setItem(
        'auth',
        JSON.stringify({ isAuth: true, userData: user })
      );
      navigate_to('/');
    } else {
      setUserNotExist(true);
    }
  };

  const onFormSubmit = (evt) => {
    evt.preventDefault();
    if (is_jsonServer_down) {
      check_user_exist(get_user_by_email(email));
    } else {
      api_get_user();
    }
  };

  if (auth_context.isAuth) {
    return (
      <section className='login-page my-5 py-5'>
        <div className='container'>
          <Alert color='warning'>
            <IoMdWarning className='mx-1 h4 my-0' /> You already sign in
          </Alert>
        </div>
      </section>
    );
  } else {
    return (
      <>
        <section className='login-page my-5 py-5'>
          <div className='container'>
            <div className='row justify-content-center align-items-stretch g-0'>
              <div className='col-md-6 my-3'>
                <div className='p-4 rounded-start border login-content'>
                  <h1 className='my-4 text-center'>Sign in</h1>
                  <div className='my-3 text-center'>
                    <Link
                      className='text-dark social-media-icon'
                      to='#'
                      title='google'
                    >
                      <FcGoogle className='h5 m-0' />
                    </Link>
                    <Link
                      className='text-primary social-media-icon'
                      to='#'
                      title='facebook'
                    >
                      <FaFacebook className='h5 m-0' />
                    </Link>
                    <Link
                      className='text-dark social-media-icon'
                      to='#'
                      title='github'
                    >
                      <FaGithub className='h5 m-0' />
                    </Link>
                    <p className='small text-muted mt-4'>or use your account</p>
                  </div>
                  <form className='mb-3' onSubmit={onFormSubmit}>
                    <div className='my-3'>
                      <label className='form-label' htmlFor='login-email'>
                        email address
                      </label>
                      <input
                        className={`form-control ${
                          userNotExist ? 'is-invalid' : ''
                        }`}
                        type='email'
                        placeholder=''
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        id='login-email'
                      />
                      <div className='invalid-feedback'>
                        no user exist, please check your email
                      </div>
                    </div>
                    <div className='my-3'>
                      <label className='form-label' htmlFor='login-password'>
                        password
                      </label>
                      <input
                        className={`form-control ${
                          wrongPassword || userNotExist ? 'is-invalid' : ''
                        }`}
                        type='password'
                        placeholder=''
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        id='login-password'
                      />
                      <div className='invalid-feedback'>
                        please check your password
                      </div>
                    </div>
                    <p className='text-end'>
                      <Link className='text-muted' to='/forget-password'>
                        forget password
                      </Link>
                    </p>
                    <div className='text-center'>
                      <button className='btn btn-aurora mt-4' type='submit'>
                        Sign In
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className='col-md-6 my-3'>
                <div className='bg-gradient p-4 rounded-end h-100 d-flex justify-content-center align-items-center align-content-center bg-login'>
                  <div className='text-center text-white'>
                    <h2 className='mb-3'>Hello, Friend!</h2>
                    <p>Enter your personal details and start journey with us</p>
                    <Link
                      className='rounded-pill mt-2 px-3 py-2 btn btn-outline-light'
                      to='/register'
                      title='register'
                    >
                      sign up
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default Login;
