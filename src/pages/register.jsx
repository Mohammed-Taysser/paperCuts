import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { IoMdWarning } from 'react-icons/io';
import { FaFacebook, FaGithub } from 'react-icons/fa';
import { Context as AuthContext } from '../context/auth';
import {
  UserAPI,
  get_user_by_email,
  get_user_by_username,
} from '../api/Localhost';
import Alert from '../components/bootstrap-component/Alert';
import jsonServerToast from '../context/IsJsonServerDown';

const INIT_FORM_DATA = {
  firstName: '',
  lastName: '',
  username: '',
  img: 'https://cdn.jsdelivr.net/gh/Mohammed-Taysser/rakm1@master/paperCuts/authors/img/avatar-2.png',
  email: '',
  password: '',
  confirmPassword: '',
};

function Register() {
  const navigate_to = useNavigate();
  const auth_context = useContext(AuthContext);
  const is_jsonServer_down = useContext(jsonServerToast);
  const [formData, setFormData] = useState(INIT_FORM_DATA);
  const [existUsername, setExistUsername] = useState(false);
  const [existEmail, setExistEmail] = useState(false);
  const [passwordNotMatch, setPasswordNotMatch] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    if (
      !existEmail &&
      !existUsername &&
      !is_form_data_empty() &&
      !is_jsonServer_down
    ) {
      api_create_user();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [existEmail, existUsername]);

  const api_get_user_by_email = async () => {
    await UserAPI.get(`?email=${formData['email']}`)
      .then((response) => {
        // handle success
        check_exist_email(response.data[0]);
      })
      .catch((error) => {
        check_exist_email(get_user_by_email(formData['email']));
      });
  };

  const api_get_user_by_username = async () => {
    await UserAPI.get(`?username=${formData['username']}`)
      .then((response) => {
        check_exist_username(response.data[0]);
      })
      .catch((error) => {
        check_exist_username(get_user_by_username(formData['username']));
      });
  };

  const api_create_user = async () => {
    await UserAPI.post(`/`, formData)
      .then((response) => {
        create_user();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const check_exist_email = (email) => {
    if (email) {
      setFormSubmitted(false);
      setExistEmail(true);
    } else {
      setExistEmail(false);
    }
  };

  const check_exist_username = (username) => {
    if (username) {
      setFormSubmitted(false);
      setExistUsername(true);
    } else {
      setExistUsername(false);
    }
  };

  const create_user = () => {
    localStorage.setItem(
      'auth',
      JSON.stringify({ isAuth: true, userData: formData })
    );
    setFormData(INIT_FORM_DATA);
    navigate_to('/');
  };

  const onInputChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const is_form_data_empty = () => {
    return !Object.values(formData).every((val) => val !== null && val !== '');
  };

  const onFormSubmit = (evt) => {
    evt.preventDefault();
    setFormSubmitted(true);
    if (!is_form_data_empty()) {
      if (formData['password'] === formData['confirmPassword']) {
        setPasswordNotMatch(false);
        if (is_jsonServer_down) {
          check_exist_email(get_user_by_email(formData['email']));
          check_exist_username(get_user_by_username(formData['userName']));
        } else {
          api_get_user_by_email();
          api_get_user_by_username();
        }
      } else {
        setPasswordNotMatch(true);
        setFormSubmitted(false);
      }
    }
  };

  const other_sign_up_methods = () => {
    return (
      <div className='my-3 text-center'>
        <Link className='text-dark social-media-icon' to='#' title='google'>
          <FcGoogle className='h5 m-0' />
        </Link>
        <Link
          className='text-primary social-media-icon'
          to='#'
          title='facebook'
        >
          <FaFacebook className='h5 m-0' />
        </Link>
        <Link className='text-dark social-media-icon' to='#' title='github'>
          <FaGithub className='h5 m-0' />
        </Link>
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
        </div>
      </section>
    );
  } else {
    return (
      <section className='register-page my-5 py-5'>
        <div className='container'>
          <div className='row justify-content-center align-items-stretch g-0'>
            <div className='col-md-6 my-3'>
              <div className='p-4 rounded-start border register-content'>
                <h1 className='my-4 text-center'>Sign up</h1>
                {other_sign_up_methods()}
                <p className='small text-muted mt-4 text-center'>
                  or use your account
                </p>
                <form
                  className={`mb-3 needs-validation ${
                    formSubmitted ? 'was-validated' : ''
                  }`}
                  onSubmit={onFormSubmit}
                  noValidate
                >
                  <div className='row justify-content-center'>
                    <div className='col-md-6 my-3'>
                      <div className=''>
                        <label
                          className='form-label require'
                          htmlFor='register-first-name'
                        >
                          first name
                        </label>
                        <input
                          className='form-control'
                          type='text'
                          name='firstName'
                          value={formData['firstName']}
                          onChange={onInputChange}
                          placeholder='first name'
                          required
                          id='register-first-name'
                        />
                        <div className='invalid-feedback'>
                          first name can't be empty
                        </div>
                        <div className='valid-feedback'>looks good !</div>
                      </div>
                    </div>
                    <div className='col-md-6 my-3'>
                      <div className=''>
                        <label
                          className='form-label require'
                          htmlFor='register-last-name'
                        >
                          last name
                        </label>
                        <input
                          className='form-control'
                          type='text'
                          name='lastName'
                          value={formData['lastName']}
                          onChange={onInputChange}
                          placeholder='last name'
                          required={true}
                          id='register-last-name'
                        />
                        <div className='invalid-feedback'>
                          last name can't be empty
                        </div>
                        <div className='valid-feedback'>looks good !</div>
                      </div>
                    </div>
                    <div className='col-md-6 my-3'>
                      <div className=''>
                        <label
                          className='form-label require'
                          htmlFor='register-username'
                        >
                          username
                        </label>
                        <input
                          className={`form-control ${
                            existUsername ? 'is-invalid' : ''
                          }`}
                          type='text'
                          name='username'
                          value={formData['userName']}
                          onChange={onInputChange}
                          placeholder='username'
                          required
                          id='register-username'
                        />
                        <div className='invalid-feedback'>
                          {existUsername
                            ? 'username already exist'
                            : "username can't be empty"}
                        </div>
                        <div className='valid-feedback'>looks good !</div>
                      </div>
                    </div>
                    <div className='col-md-6 my-3'>
                      <div className=''>
                        <label
                          className='form-label require'
                          htmlFor='register-email'
                        >
                          email address
                        </label>
                        <input
                          className={`form-control ${
                            existEmail ? 'is-invalid' : ''
                          }`}
                          type='email'
                          name='email'
                          value={formData['email']}
                          onChange={onInputChange}
                          placeholder='email address'
                          required
                          id='register-email'
                        />

                        <div className='invalid-feedback'>
                          {existEmail
                            ? 'email already exist'
                            : 'please provide valid email'}
                        </div>
                        <div className='valid-feedback'>looks good !</div>
                      </div>
                    </div>

                    <div className='col-md-6 my-3'>
                      <div className=''>
                        <label
                          className='form-label require'
                          htmlFor='register-password'
                        >
                          password
                        </label>
                        <input
                          className={`form-control ${
                            passwordNotMatch ? 'is-invalid' : ''
                          }`}
                          type='password'
                          placeholder='password'
                          name='password'
                          value={formData['password']}
                          onChange={onInputChange}
                          required
                          minLength={8}
                          id='register-password'
                        />
                        <div className='invalid-feedback'>
                          {passwordNotMatch
                            ? 'password must be identical'
                            : "password can't be empty or less than 8 characters"}
                        </div>
                        <div className='valid-feedback'>looks good !</div>
                      </div>
                    </div>
                    <div className='col-md-6 my-3'>
                      <div className=''>
                        <label
                          className='form-label require'
                          htmlFor='register-confirm-password'
                        >
                          confirm password
                        </label>
                        <input
                          className={`form-control ${
                            passwordNotMatch ? 'is-invalid' : ''
                          }`}
                          type='password'
                          name='confirmPassword'
                          value={formData['confirmPassword']}
                          onChange={onInputChange}
                          placeholder='confirm password'
                          minLength={8}
                          required
                          id='register-password'
                        />
                        <div className='invalid-feedback'>
                          {passwordNotMatch
                            ? 'password must be identical'
                            : "password confirm can't be empty or less than 8 characters"}
                        </div>
                        <div className='valid-feedback'>looks good !</div>
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
}

export default Register;
