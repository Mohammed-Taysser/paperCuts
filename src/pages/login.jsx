import React from 'react';
import { Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook, FaGithub } from 'react-icons/fa';

function Login() {
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
                <form className='mb-3' action='' method=''>
                  <div className='my-3'>
                    <label className='form-label' htmlFor='login-email'>
                      email address
                    </label>
                    <input
                      className='form-control'
                      type='email'
                      placeholder=''
                      required={true}
                      id='login-email'
                    />
                  </div>
                  <div className='my-3'>
                    <label className='form-label' htmlFor='login-password'>
                      password
                    </label>
                    <input
                      className='form-control'
                      type='password'
                      placeholder=''
                      required={true}
                      id='login-password'
                    />
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

export default Login;
