import React from 'react';

function ForgetPassword() {
  const onFormSubmit = (evt) => {
    evt.preventDefault();
  };

  return (
    <>
      <section className='forget-password-page my-5 py-5'>
        <div className='container'>
          <div className='row justify-content-center align-items-stretch g-0'>
            <div className='col-md-8 my-3'>
              <div className='p-4 rounded-start border login-content'>
                <h1 className='my-4 text-center'>Lost your password?</h1>
                <p className='text-muted text-center'>
                  Please enter your email address. You will receive a link to
                  create a new password via email.
                </p>
                <form className='mb-3' onSubmit={onFormSubmit}>
                  <div className='my-3'>
                    <label className='form-label' htmlFor='rest-password-email'>
                      email address
                    </label>
                    <input
                      className='form-control'
                      type='email'
                      placeholder=''
                      required={true}
                      id='rest-password-email'
                    />
                  </div>
                  <div className='text-center'>
                    <button className='btn btn-aurora mt-4' type='submit'>
                      Reset password
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ForgetPassword;
