import React from 'react';
import { Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook, FaGithub } from 'react-icons/fa';

function ForgetPassword() {
  return (
    <>
      <section className='forget-password-page my-5 py-5'>
        <div className='container'>
          <div className='row justify-content-center align-items-stretch g-0'>
            <div className='col-md-6 my-3'>
              <div className='p-4 rounded-start border login-content'>
                <h1 className='my-4 text-center'>forget password</h1>
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
                  <div className='text-center'>
                    <button className='btn btn-aurora mt-4' type='submit'>
                      Send Code
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

export default ForgetPassword;
