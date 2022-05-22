import React from 'react';
import '../../assets/scss/components/spinner.scss';

const Spinner = (props) => {
  const spinnerClassName = `spinner-border text-${props.color} ${
    props.sm ? 'spinner-border-sm' : ''
  }`;
  return (
    <div className={`text-center ${props.className}`}>
      <div className={spinnerClassName} role='status'>
        <span className='visually-hidden'>{props.text}</span>
      </div>
      {props.text && <p className=''>{props.text}</p>}
    </div>
  );
};

Spinner.defaultProps = {
  color: 'aurora',
};

export default Spinner;
