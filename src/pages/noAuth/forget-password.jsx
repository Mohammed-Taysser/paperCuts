import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthorsAPI, get_author_by_email } from '../../api/Localhost';
import Alert from '../../components/bootstrap/Alert';
import { InputField } from '../../components/bootstrap/Form';
import Spinner from '../../components/bootstrap/Spinner';
import { Context as AuthContext } from '../../context/auth';
import usePageTitle from '../../hooks/usePageTitle';

function ForgetPassword() {
  usePageTitle('Forget Password');
  const navigate_to = useNavigate();
  const auth_context = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const [currentTempUser, setCurrentTempUser] = useState(null);

  const [emailNotFound, setEmailNotFound] = useState(false);
  const [passwordNotMatch, setPasswordNotMatch] = useState(false);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showEmailSearchForm, setShowEmailSearchForm] = useState(true);
  const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);

  const api_get_author_by_email = async () => {
    setLoading(true);
    await AuthorsAPI.get(`?email=${email}`)
      .then((response) => {
        check_exist_email(response.data[0]);
      })
      .catch((error) => {
        check_exist_email(get_author_by_email(email));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const api_set_author_password = async () => {
    setLoading(true);
    await AuthorsAPI.patch(`/${currentTempUser.id}`, { password })
      .then((response) => {
        navigate_to('/login');
      })
      .catch((error) => {
        check_exist_email(get_author_by_email(email));
      });
  };

  const check_exist_email = (response_data) => {
    if (response_data) {
      setEmailNotFound(false);
      setShowEmailSearchForm(false);
      setShowChangePasswordForm(true);
      setCurrentTempUser(response_data);
    } else {
      setEmailNotFound(true);
    }
  };

  const onSearchFormSubmit = (evt) => {
    evt.preventDefault();

    api_get_author_by_email();
  };

  const onChangeFormSubmit = (evt) => {
    evt.preventDefault();
    if (password === confirmPassword) {
      setPasswordNotMatch(false);
      api_set_author_password();
    } else {
      setPasswordNotMatch(true);
    }
  };

  const RenderSubmitButton = ({ label }) => {
    if (loading) {
      return <Spinner />;
    } else {
      return (
        <button className='btn btn-aurora ' type='submit'>
          {label}
        </button>
      );
    }
  };

  const isInvalidClass = (state) => {
    return state ? 'is-invalid' : '';
  };

  return (
    <>
      <section className='forget-password-page my-5 py-5'>
        <div className='container'>
          <div className='row justify-content-center align-items-stretch g-0'>
            <div className='col-md-8 my-3'>
              {auth_context.isAuth ? (
                <Alert>you already sign in</Alert>
              ) : (
                <div className='p-4 rounded-start border login-content'>
                  <h1 className='my-4 text-center'>Lost your password?</h1>
                  <p className='text-muted text-center'>
                    Please enter your email address. You will receive a link to
                    create a new password via email.
                  </p>
                  {showEmailSearchForm && (
                    <form className='mb-3' onSubmit={onSearchFormSubmit}>
                      <InputField
                        outer='my-3'
                        type='email'
                        className={isInvalidClass(emailNotFound)}
                        id='forget-password-email'
                        label='email address'
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='email address'
                        InvalidFeedback='email not exist'
                      />

                      <div className=''>
                        <RenderSubmitButton label='Search' />
                      </div>
                    </form>
                  )}
                  {showChangePasswordForm && (
                    <form className='mb-3' onSubmit={onChangeFormSubmit}>
                      <InputField
                        outer='my-3'
                        type='password'
                        id='forget-password'
                        className={isInvalidClass(passwordNotMatch)}
                        label='new password'
                        value={password}
                        minLength={8}
                        onChange={(e) => setPassword(e.target.value)}
                        InvalidFeedback={
                          passwordNotMatch && 'password not identical'
                        }
                        placeholder='new password'
                        required
                      />
                      <InputField
                        outer='my-3'
                        className={isInvalidClass(passwordNotMatch)}
                        type='password'
                        id='forget-confirm-password'
                        label='confirm password'
                        value={confirmPassword}
                        minLength={8}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder='confirm password'
                        InvalidFeedback={
                          passwordNotMatch && 'password not identical'
                        }
                        required
                      />
                      <div className='d-flex mt-4'>
                        <div className=''>
                          <RenderSubmitButton label='Save Changes' />
                        </div>
                        <div className='mx-3'>
                          <button
                            className='btn btn-outline-aurora '
                            onClick={() => {
                              setShowEmailSearchForm(true);
                              setShowChangePasswordForm(false);
                            }}
                          >
                            Search Another Email
                          </button>
                        </div>
                      </div>
                    </form>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ForgetPassword;
