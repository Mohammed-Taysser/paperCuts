import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { IoMdWarning } from 'react-icons/io';
import { FaFacebook, FaGithub } from 'react-icons/fa';
import { Context as AuthContext } from '../context/auth';
import { AuthorsAPI, get_author_by_email } from '../api/Localhost';
import Alert from '../components/bootstrap/Alert';
import SectionTitle from '../components/SectionTitle';
import GetBookByCategory from '../components/GetBookByCategory';
import RegisterForm from '../components/RegisterForm';

function Register() {
  const navigate_to = useNavigate();
  const auth_context = useContext(AuthContext);
  const [formData, setFormData] = useState(null);
  const [existEmail, setExistEmail] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const api_get_author_by_email = async () => {
    setLoading(true);
    await AuthorsAPI.get(`?email=${formData['email']}`)
      .then((response) => {
        check_exist_email(response.data[0]);
      })
      .catch((error) => {
        check_exist_email(get_author_by_email(formData['email']));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const check_exist_email = (response_data) => {
    setFormSubmitted(false);
    if (response_data) {
      setExistEmail(true);
    } else {
      setExistEmail(false);
      api_create_author();
    }
  };

  const api_create_author = async () => {
    if (!existEmail && !is_empty()) {
      setLoading(true);

      let author_data = {
        ...formData,
        username: null,
        info: null,
        extraInfo: null,
        gender: null,
        avatar: 'https://cdn.jsdelivr.net/gh/Mohammed-Taysser/rakm1@master/paperCuts/authors/img/avatar-2.png',
        signature: null,
        language: [],
        socialMedia: [],
        category: [],
        books: [],
      };

      await AuthorsAPI.post(`/`, author_data)
        .then((response) => {
          save_user(response.data);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          // setLoading(false);
        });
    } else {
      setFormSubmitted(true);
    }
  };

  const save_user = (user_data) => {
    localStorage.setItem(
      'auth',
      JSON.stringify({ isAuth: true, userData: user_data })
    );
    auth_context.setUserData(user_data);
    auth_context.setIsAuth(true);
    navigate_to('/');
  };

  const is_empty = () => {
    if (formData) {
      return !Object.values(formData).every(
        (val) => val !== null && val !== ''
      );
    } else {
      return true;
    }
  };

  const onFormSubmit = (data) => {
    setExistEmail(false);
    setFormSubmitted(true);
    if (data !== null && !is_empty()) {
      api_get_author_by_email();
    }
  };

  const OtherSignUpMethods = () => {
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
      </div>
    );
  };

  if (auth_context.isAuth) {
    return (
      <section className='register-page my-5 py-5'>
        <div className='container'>
          <Alert color='success'>
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
      <section className='register-page my-5 py-5'>
        <div className='container'>
          <div className='row justify-content-center align-items-stretch g-0'>
            <div className='col-lg-6 my-3'>
              <div className='p-4 rounded-start border register-content'>
                <h1 className='my-4 text-center'>Sign up</h1>
                <OtherSignUpMethods />
                <p className='small text-muted mt-4 text-center'>
                  or use your account
                </p>
                <RegisterForm
                  onFormSubmit={onFormSubmit}
                  existEmail={existEmail}
                  formSubmitted={formSubmitted}
                  setFormSubmitted={setFormSubmitted}
                  loading={loading}
                  setFormData={setFormData}
                />
              </div>
            </div>
            <div className='col-lg-6 my-3'>
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
