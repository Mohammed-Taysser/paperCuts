import React, { useState } from 'react';
import Spinner from './bootstrap/Spinner';
import { InputField } from './bootstrap/Form';
import { isEqualObject } from './ManipulateData';

function RegisterForm(props) {
  const { existEmail, existUsername, loading } = props;
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [passwordNoMatch, setPasswordNoMatch] = useState(false);
  const [debouncedFormData, setDebouncedFormData] = useState({});
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const onInputChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const onFormSubmit = (evt) => {
    evt.preventDefault();
    setIsFormSubmitted(true);
    if (
      !isFormDataEmpty() &&
      confirmPasswordConstrains() &&
      !isEqualObject(debouncedFormData, formData)
    ) {
      props.onFormSubmit(formData);
      setIsFormSubmitted(false);
    }
    setDebouncedFormData(formData);
  };

  const isFormDataEmpty = () => {
    if (formData) {
      return !Object.values(formData).every(
        (val) => val !== null && val !== ''
      );
    } else {
      return true;
    }
  };

  const confirmPasswordConstrains = () => {
    if (formData.confirmPassword !== formData.password) {
      setPasswordNoMatch(true);
      setIsFormSubmitted(false);
    }
    if (formData.confirmPassword === formData.password) {
      setPasswordNoMatch(false);
    }
    return (
      formData.password &&
      formData.confirmPassword &&
      formData.password.length >= 8 &&
      formData.confirmPassword.length >= 8 &&
      formData.confirmPassword === formData.password
    );
  };
  return (
    <form
      className={`mb-3 needs-validation ${
        isFormSubmitted ? 'was-validated' : ''
      }`}
      onSubmit={onFormSubmit}
      noValidate
    >
      <div className='row justify-content-center'>
        <InputField
          outer='col-lg-6 my-3'
          id='register-first-name'
          label='first name'
          name='firstName'
          value={formData['firstName']}
          onChange={onInputChange}
          placeholder='first name'
          required
          invalidFeedback
          validFeedback
        />
        <InputField
          outer='col-lg-6 my-3'
          id='register-last-name'
          label='last name'
          name='lastName'
          value={formData['lastName']}
          onChange={onInputChange}
          placeholder='last name'
          required
          invalidFeedback
          validFeedback
        />
        <InputField
          outer='col-lg-6 my-3'
          id='register-username'
          className={existUsername ? 'is-invalid' : ''}
          label='username'
          name='username'
          value={formData['username']}
          onChange={onInputChange}
          placeholder='username'
          required
          invalidFeedback={
            existUsername
              ? 'username already exist'
              : 'please provide valid username'
          }
          validFeedback
        />
        <InputField
          outer='col-lg-6 my-3'
          type='email'
          id='register-email'
          label='email address'
          className={existEmail ? 'is-invalid' : ''}
          name='email'
          value={formData['email']}
          onChange={onInputChange}
          placeholder='email address'
          required
          invalidFeedback={
            existEmail ? 'email already exist' : 'please provide valid email'
          }
          validFeedback
        />
        <InputField
          outer='col-lg-6 my-3'
          type='password'
          className={passwordNoMatch ? 'is-invalid' : ''}
          id='register-password'
          label='password'
          name='password'
          minLength={8}
          value={formData['password']}
          onChange={onInputChange}
          placeholder='password'
          required
          invalidFeedback={
            passwordNoMatch
              ? 'password not match'
              : "password can't be empty or less than 8 characters"
          }
          validFeedback
        />
        <InputField
          outer='col-lg-6 my-3'
          type='password'
          className={passwordNoMatch ? 'is-invalid' : ''}
          id='register-confirm-password'
          label='confirm password'
          name='confirmPassword'
          minLength={8}
          value={formData['confirmPassword']}
          onChange={onInputChange}
          placeholder='confirm password'
          required
          invalidFeedback={
            passwordNoMatch
              ? 'password not match'
              : "password can't be empty or less than 8 characters"
          }
          validFeedback
        />
      </div>
      <div className=''>
        {loading ? (
          <Spinner />
        ) : (
          <button className='btn btn-aurora mt-4' type='submit'>
            Sign Up
          </button>
        )}
      </div>
    </form>
  );
}

RegisterForm.defaultProps = {
  onFormSubmit: (data) => console.log(data),
};

export default RegisterForm;
