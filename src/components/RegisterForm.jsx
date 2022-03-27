import React, { useState } from 'react';
import { InputField } from './bootstrap/Form';
import Spinner from './bootstrap/Spinner';

function RegisterForm(props) {
  const { existEmail, formSubmitted, loading } = props;
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const onInputChange = (evt) => {
    let new_data = {
      ...formData,
      [evt.target.name]: evt.target.value,
    };
    setFormData(new_data);
    props.setFormData(new_data);
  };

  const onFormSubmit = (evt) => {
    evt.preventDefault();
    props.setFormData(formData);
    props.onFormSubmit(formData);
  };

  return (
    <form
      className={`mb-3 needs-validation ${
        formSubmitted ? 'was-validated' : ''
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
          id='register-password'
          label='password'
          name='password'
          minLength={8}
          value={formData['password']}
          onChange={onInputChange}
          placeholder='password'
          required
          invalidFeedback={"password can't be empty or less than 8 characters"}
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
