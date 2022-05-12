import React, { useState } from 'react';
import Spinner from './bootstrap/Spinner';
import registerValidate from '../validations/register.validate';
import { InputField } from './bootstrap/Form';

function RegisterForm(props) {
  const { errors, setErrors, loading } = props;
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

    setErrors({});

    const errorsAsObject = registerValidate(formData);

    if (Object.keys(errorsAsObject).length > 0) {
      setErrors(errorsAsObject);
    } else {
      props.onFormSubmit(formData);
    }
  };

  return (
    <form className='mb-3' onSubmit={onFormSubmit} noValidate>
      <div className='row justify-content-center'>
        <InputField
          outer='col-lg-6 my-3'
          id='register-first-name'
          className={errors['firstName'] ? 'is-invalid' : ''}
          label='first name'
          name='firstName'
          value={formData['firstName']}
          onChange={onInputChange}
          placeholder='eg: mohammed'
          required
          invalidFeedback={errors['firstName']}
        />
        <InputField
          outer='col-lg-6 my-3'
          id='register-last-name'
          className={errors['lastName'] ? 'is-invalid' : ''}
          label='last name'
          name='lastName'
          value={formData['lastName']}
          onChange={onInputChange}
          placeholder='eg: taysser'
          required
          invalidFeedback={errors['lastName']}
        />
        <InputField
          outer='col-lg-6 my-3'
          id='register-username'
          className={errors['username'] ? 'is-invalid' : ''}
          label='username'
          name='username'
          value={formData['username']}
          onChange={onInputChange}
          placeholder='eg: superhero'
          required
          invalidFeedback={errors['username']}
        />
        <InputField
          outer='col-lg-6 my-3'
          type='email'
          id='register-email'
          label='email address'
          className={errors['email'] ? 'is-invalid' : ''}
          name='email'
          value={formData['email']}
          onChange={onInputChange}
          placeholder='eg: mo@mo.mo'
          required
          invalidFeedback={errors['email']}
          validFeedback
        />
        <InputField
          outer='col-lg-6 my-3'
          type='password'
          className={errors['password'] ? 'is-invalid' : ''}
          id='register-password'
          label='password'
          name='password'
          minLength={8}
          value={formData['password']}
          onChange={onInputChange}
          placeholder='*********'
          required
          invalidFeedback={errors['password']}
        />
        <InputField
          outer='col-lg-6 my-3'
          type='password'
          className={errors['confirmPassword'] ? 'is-invalid' : ''}
          id='register-confirm-password'
          label='confirm password'
          name='confirmPassword'
          minLength={8}
          value={formData['confirmPassword']}
          onChange={onInputChange}
          placeholder='*********'
          required
          invalidFeedback={errors['confirmPassword']}
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
