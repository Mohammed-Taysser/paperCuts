import React from 'react';

function Username(props) {
  const { formData, onInputChange } = props;

  return (
    <div className='col-md-5'>
      <div className='input-group custom-input-group input-group-sm'>
        <span className='input-group-text' id='username-input'>
          paperCuts.com/
        </span>
        <input
          className='form-control'
          type='text'
          placeholder='username'
          aria-label='username'
          aria-describedby='username-input'
          name='username'
          onChange={onInputChange}
          value={formData.username}
        />
      </div>
    </div>
  );
}

export default Username;
