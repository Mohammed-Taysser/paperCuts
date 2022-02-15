import React from 'react';
import { Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook, FaGithub } from 'react-icons/fa';

function Register() {
  return (
    <section className='register-page my-5 py-5'>
      <div className='container'>
        <div className='row justify-content-center align-items-stretch g-0'>
          <div className='col-md-6 my-3'>
            <div className='p-4 rounded-start border register-content'>
              <h1 className='my-4 text-center'>Sign up</h1>
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
                <div className='row justify-content-center'>
                  <div className='col-md-6 my-3'>
                    <div className=''>
                      <label
                        className='form-label'
                        htmlFor='register-first-name'
                      >
                        first name
                      </label>
                      <input
                        className='form-control'
                        type='text'
                        placeholder='first-name'
                        required={true}
                        id='register-first-name'
                      />
                    </div>
                  </div>
                  <div className='col-md-6 my-3'>
                    <div className=''>
                      <label
                        className='form-label'
                        htmlFor='register-last-name'
                      >
                        last name
                      </label>
                      <input
                        className='form-control'
                        type='text'
                        placeholder='last-name'
                        required={true}
                        id='register-last-name'
                      />
                    </div>
                  </div>
                  <div className='col-md-6 my-3'>
                    <div className=''>
                      <label className='form-label' htmlFor='register-username'>
                        username
                      </label>
                      <input
                        className='form-control'
                        type='text'
                        placeholder='username'
                        required={true}
                        id='register-username'
                      />
                    </div>
                  </div>
                  <div className='col-md-6 my-3'>
                    <div className=''>
                      <label className='form-label' htmlFor='register-email'>
                        email address
                      </label>
                      <input
                        className='form-control'
                        type='email'
                        placeholder='email address'
                        required={true}
                        id='register-email'
                      />
                    </div>
                  </div>

                  <div className='col-md-6 my-3'>
                    <div className=''>
                      <label className='form-label' htmlFor='register-password'>
                        password
                      </label>
                      <input
                        className='form-control'
                        type='password'
                        placeholder='password'
                        required={true}
                        id='register-password'
                      />
                    </div>
                  </div>
                  <div className='col-md-6 my-3'>
                    <div className=''>
                      <label
                        className='form-label'
                        htmlFor='register-confirm-password'
                      >
                        confirm password
                      </label>
                      <input
                        className='form-control'
                        type='password'
                        placeholder='confirm password'
                        required={true}
                        id='register-password'
                      />
                    </div>
                  </div>
                </div>

                <div className='text-center'>
                  <button className='btn btn-aurora mt-4' type='submit'>
                    Sign Up
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
                  to='/login'
                  title='login'
                >
                  sign in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
