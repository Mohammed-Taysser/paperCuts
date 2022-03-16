import React from 'react';

const Spinner = (props) => {
  return (
    <div className={`text-center ${props.className}`}>
      <div className={`spinner-border text-${props.color}`} role='status'>
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
