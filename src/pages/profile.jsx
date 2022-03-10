import React, { useContext } from 'react';
import { Context as AuthContext } from '../context/auth';
import { MdContentCopy } from 'react-icons/md';

function Profile() {
  const auth_context = useContext(AuthContext);
  const { userData } = auth_context;

  const copy_to_clipboard = (text) => {
    const temp_textarea = document.createElement('textarea');
    temp_textarea.value = text;
    document.body.appendChild(temp_textarea);
    temp_textarea.select();
    document.execCommand('copy');
    document.body.removeChild(temp_textarea);
  };

  return (
    <section className='profile-page my-5'>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-md-11'>
            <h1 className='h2 mb-5 special-header'>
              Personal Account Settings
            </h1>

            <div className='card my-4'>
              <div className='card-body'>
                <h3 className='h4 card-title'>your name</h3>
                <p className='card-text'>
                  This is your URL namespace within paperCuts.
                </p>
                <div className='d-md-flex'>
                  <div className='col-md-5'>
                    <div className='input-group custom-input-group input-group-sm'>
                      <span className='input-group-text' id='full-name-input'>
                        paperCuts.com/
                      </span>
                      <input
                        className='form-control'
                        type='text'
                        placeholder='Full Name'
                        aria-label='Full Name'
                        aria-describedby='full-name-input'
                        value={`${userData.first_name} ${userData.last_name}`}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className='card-footer bg-light'>
                <div className='d-flex justify-content-between align-items-center'>
                  <p className='m-0 small text-dark'>
                    Please use 48 characters at maximum.
                  </p>
                  <button
                    className='btn btn-aurora btn-sm px-3'
                    type='submit'
                    aria-label='save changes'
                  >
                    save
                  </button>
                </div>
              </div>
            </div>
            <div className='card my-4'>
              <div className='card-body'>
                <h4 className='card-title'>your username</h4>
                <p className='card-text'>
                  This is your URL namespace within paperCuts.
                </p>
                <div className='d-md-flex'>
                  <div className='col-md-5'>
                    <input
                      className='form-control form-control-sm'
                      type='text'
                      value='Mohammed-Taysser'
                      placeholder='Username'
                      aria-label='Username'
                    />
                  </div>
                </div>
              </div>
              <div className='card-footer bg-light'>
                <div className='d-flex justify-content-between align-items-center'>
                  <p className='m-0 small text-dark'>
                    Please use 16 characters at minimum.
                  </p>
                  <button
                    className='btn btn-aurora btn-sm px-3'
                    type='submit'
                    aria-label='save changes'
                  >
                    save
                  </button>
                </div>
              </div>
            </div>
            <div className='card my-4'>
              <div className='card-body'>
                <h4 className='card-title'>your email</h4>
                <p className='card-text'>
                  Please enter the email address you want to use to log in with
                  paperCuts.
                </p>
                <div className='d-md-flex'>
                  <div className='col-md-5'>
                    <input
                      className='form-control form-control-sm'
                      type='email'
                      value={userData.email}
                      placeholder='email address'
                      aria-label='your email address'
                    />
                  </div>
                </div>
              </div>
              <div className='card-footer bg-light'>
                <div className='d-flex justify-content-between align-items-center'>
                  <p className='m-0 small text-dark'>
                    We will email you to verify the change.
                  </p>
                  <button
                    className='btn btn-aurora btn-sm px-3'
                    type='submit'
                    aria-label='save changes'
                  >
                    save
                  </button>
                </div>
              </div>
            </div>
            <div className='card my-4'>
              <div className='card-body'>
                <div className='d-flex align-items-center'>
                  <div className='flex-grow-1 me-3'>
                    <h4 className='card-title'>your Avatar</h4>
                    <p className='card-text'>
                      his is your avatar.Click on the avatar to upload a custom
                      one from your files.
                    </p>
                  </div>
                  <div className='flex-shrink-0'>
                    <img
                      className='img-fluid rounded-circle'
                      src={userData.img}
                      alt={userData.first_name}
                      width='80px'
                      height='80px'
                    />
                  </div>
                </div>
              </div>
              <div className='card-footer bg-light'>
                <div className='d-flex justify-content-between align-items-center'>
                  <p className='m-0 small text-dark'>
                    An avatar is optional but strongly recommended.
                  </p>
                </div>
              </div>
            </div>
            <div className='card my-4'>
              <div className='card-body'>
                <h4 className='card-title'>your ID</h4>
                <p className='card-text'>
                  This is your user ID within paperCuts.
                </p>
                <div className='d-md-flex'>
                  <div className='col-md-5'>
                    <div className='input-group input-group-sm'>
                      <input
                        className='form-control'
                        type='text'
                        placeholder='ID'
                        aria-label='your id'
                        disabled
                        value='rXnB5e5aQpkYm2dC1uciGVLr'
                      />
                      <button
                        className='btn btn-aurora css-tooltip'
                        type='button'
                        data-tooltip='Copy To Clipboard'
                        onClick={(e) => {
                          copy_to_clipboard('rXnB5e5aQpkYm2dC1uciGVLr');
                        }}
                      >
                        <MdContentCopy />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className='card-footer bg-light'>
                <div className='d-flex justify-content-between align-items-center'>
                  <p className='m-0 small text-dark'>
                    Used when interacting with the paperCuts API.
                  </p>
                  <button
                    className='btn btn-aurora btn-sm px-3'
                    type='submit'
                    aria-label='save changes'
                  >
                    save
                  </button>
                </div>
              </div>
            </div>
            <div className='card my-4 border-danger'>
              <div className='card-body'>
                <h4 className='card-title'>Delete Personal Account</h4>
                <p className='card-text'>
                  Permanently remove your Personal Account and all of its
                  contents from the paperCuts platform. This action is not
                  reversible, so please continue with caution.
                </p>
              </div>
              <div className='card-footer bg-light'>
                <div className='d-flex justify-content-end align-items-center'>
                  <button
                    className='btn btn-danger btn-sm px-3'
                    type='submit'
                    aria-label='save changes'
                  >
                    Delete Personal Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Profile;
