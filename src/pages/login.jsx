import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook, FaGithub } from 'react-icons/fa';
import { IoMdWarning } from 'react-icons/io';
import { Context as AuthContext } from '../context/auth';
import { InputField } from '../components/bootstrap/Form';
import Spinner from '../components/bootstrap/Spinner';
import Alert from '../components/bootstrap/Alert';
import { AuthorsAPI, get_author_by_email } from '../api/Localhost';
import GetBookByCategory from '../components/GetBookByCategory';
import SectionTitle from '../components/SectionTitle';

function Login() {
  const navigate_to = useNavigate();
  const auth_context = useContext(AuthContext);
  const [wrongPassword, setWrongPassword] = useState(false);
  const [userNotExist, setUserNotExist] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const api_get_author = async () => {
    setLoading(true);
    await AuthorsAPI.get(`?email=${formData['email']}`)
      .then((response) => {
        check_user_exist(response.data[0]);
      })
      .catch((error) => {
        check_user_exist(get_author_by_email(formData['email']));
      })
      .finally(() => {
        // setLoading(false);
      });
  };

  const check_user_exist = (user) => {
    if (user) {
      setSubmitted(false);
      setUserNotExist(false);

      if (formData['password'] === user.password) {
        setWrongPassword(false);
        auth_context.setUserData(user);
        auth_context.setIsAuth(true);

        localStorage.setItem(
          'auth',
          JSON.stringify({ isAuth: true, userData: user })
        );
        navigate_to('/');
      } else {
        setWrongPassword(true);
      }
    } else {
      setSubmitted(false);
      setUserNotExist(true);
    }
  };

  const onInputChange = (evt) => {
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
    });
  };

  const onFormSubmit = (evt) => {
    evt.preventDefault();
    setWrongPassword(false);
    setUserNotExist(false);
    setSubmitted(true);
    if (formData['email'] && formData['password']) {
      api_get_author();
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
            <h2 className='mb-3'>welcome back!</h2>
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
                      submitted && 'was-validated'
                    } needs-validation`}
                    noValidate
                    onSubmit={onFormSubmit}
                  >
                    <InputField
                      outer='my-3'
                      type='email'
                      id='login-email'
                      label='email address'
                      className={userNotExist ? 'is-invalid' : ''}
                      name='email'
                      value={formData['email']}
                      onChange={onInputChange}
                      placeholder='email address'
                      required
                      invalidFeedback={
                        userNotExist
                          ? 'no user exist, please check your email'
                          : 'please provide valid email'
                      }
                      validFeedback
                    />
                    <InputField
                      outer='my-3'
                      type='password'
                      className={
                        wrongPassword || userNotExist ? 'is-invalid' : ''
                      }
                      id='login-password'
                      label='password'
                      name='password'
                      minLength={8}
                      value={formData['password']}
                      onChange={onInputChange}
                      placeholder='password'
                      required
                      invalidFeedback={'please check your password'}
                      validFeedback
                    />
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
