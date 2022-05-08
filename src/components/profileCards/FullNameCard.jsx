import React from 'react';
import { InputField } from '../bootstrap/Form';

const FullName = (props) => {
  const { formData, onInputChange } = props;

  return (
    <>
      <InputField
        outer='col-4'
        className='form-control-sm'
        maxLength={48}
        value={formData['firstName']}
        name='firstName'
        placeholder='first name'
        onChange={onInputChange}
      />
      <InputField
        outer='col-4'
        className='form-control-sm'
        maxLength={48}
        value={formData['lastName']}
        name='lastName'
        placeholder='last name'
        onChange={onInputChange}
      />
    </>
  );
};

export default FullName;
