import React from 'react';

const Alert = (props) => {
  return (
    <div
      className={`alert alert-${props.color} d-flex align-items-center`}
      role='alert'
    >
      {props.children}
    </div>
  );
};

Alert.defaultProps = {
  color: 'warning',
  children: (
    <>
      Alert with{' '}
      <a href='#go-some-where' className='alert-link'>
        link
      </a>
      .
    </>
  ),
};

export default Alert;
