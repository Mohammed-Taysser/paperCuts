import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook, FaGithub } from 'react-icons/fa';
import { IoMdWarning } from 'react-icons/io';
import { Context as AuthContext } from '../context/auth';
import Alert from '../components/bootstrap/Alert';
import { AuthorsAPI, get_author_by_email } from '../api/Localhost';
import Spinner from '../components/bootstrap/Spinner';
import GetBookByCategory from '../components/GetBookByCategory';
import SectionTitle from '../components/SectionTitle';

function Login() {
  const navigate_to = useNavigate();
  const auth_context = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [wrongPassword, setWrongPassword] = useState(false);
  const [userNotExist, setUserNotExist] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submited, setSubmited] = useState(false);

  const api_get_user = async () => {
    setLoading(true);
    await AuthorsAPI.get(`?email=${email}`)
      .then((response) => {
        check_user_exist(response.data[0]);
      })
      .catch((error) => {
        check_user_exist(get_author_by_email(email));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const check_user_exist = (user) => {
    if (user) {
      setSubmited(false);
      setUserNotExist(false);

      if (password === user.password) {
        setWrongPassword(false);
        auth_context.setIsAuth(true);
        auth_context.setUserData(user);

        localStorage.setItem(
          'auth',
          JSON.stringify({ isAuth: true, userData: user })
        );
        navigate_to('/');
      } else {
        setWrongPassword(true);
      }
    } else {
      setSubmited(false);
      setUserNotExist(true);
    }
  };

  const onFormSubmit = (evt) => {
    evt.preventDefault();
    setWrongPassword(false);
    setUserNotExist(false);
    setSubmited(true);
    if (email && password) {
      api_get_user();
    }
  };

  const OtherLoginMethods = () => {
    return (
      <div className='my-3 text-center'>
        <a
          className='text-dark social-media-icon'
          href='#other-method'
          title='google'
        >
          <FcGoogle className='h5 m-0' />
        </a>
        <a
          className='text-primary social-media-icon'
          href='#other-method'
          title='facebook'
        >
          <FaFacebook className='h5 m-0' />
        </a>
        <a
          className='text-dark social-media-icon'
          href='#other-method'
          title='github'
        >
          <FaGithub className='h5 m-0' />
        </a>
        <p className='small text-muted mt-4'>or use your account</p>
      </div>
    );
  };

  const DummyCol = () => {
    return (
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
    );
  };

  if (auth_context.isAuth) {
    return (
      <section className='login-page my-5 py-5'>
        <div className='container'>
          <Alert color='warning'>
            <IoMdWarning className='mx-1 h4 my-0' /> You already sign in
          </Alert>
          <section className='my-5 pt-5'>
            <SectionTitle title='new released' subtitle='you my like' />
            <GetBookByCategory />
          </section>
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
                  <OtherLoginMethods />
                  <form
                    className={`mb-3 ${
                      submited && 'was-validated'
                    } needs-validation`}
                    noValidate
                    onSubmit={onFormSubmit}
                  >
                    <div className='my-3'>
                      <label className='form-label' htmlFor='login-email'>
                        Email Address
                      </label>
                      <input
                        className={`form-control ${
                          userNotExist ? 'is-invalid' : ''
                        }`}
                        type='email'
                        placeholder='Email Address'
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        id='login-email'
                      />
                      <div className='invalid-feedback'>
                        {userNotExist
                          ? 'no user exist, please check your email'
                          : "email can't be empty"}
                      </div>
                    </div>
                    <div className='my-3'>
                      <label className='form-label' htmlFor='login-password'>
                        Password
                      </label>
                      <input
                        className={`form-control ${
                          wrongPassword || userNotExist ? 'is-invalid' : ''
                        }`}
                        type='password'
                        placeholder='Password'
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
                      {loading ? (
                        <Spinner />
                      ) : (
                        <button className='btn btn-aurora mt-4' type='submit'>
                          Sign In
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              </div>
              <DummyCol />
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default Login;
