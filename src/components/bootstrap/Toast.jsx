import React from 'react';
import 'bootstrap/js/src/toast';
import FavIcon from '../../assets/img/favicon.png';

function Toast(props) {
  return (
    <div aria-live='polite' aria-atomic='true' className='position-relative'>
      <div className='toast-container position-absolute top-0 end-0 p-3 z-index-10'>
        <div
          className='toast show'
          role='alert'
          aria-live='assertive'
          aria-atomic='true'
        >
          <div className='toast-header'>
            <img
              src={props.img}
              className='rounded me-2'
              alt='toast shape'
              width={20}
              height={20}
            />
            <strong className='me-auto'>{props.title}</strong>
            <small className='text-muted'>{props.time}</small>
            <button
              type='button'
              className='btn-close'
              data-bs-dismiss='toast'
              aria-label='Close'
            ></button>
          </div>
          <div className='toast-body'>{props.children}</div>
        </div>
      </div>
    </div>
  );
}

Toast.defaultProps = {
  title: 'paperCuts',
  time: 'just now',
  children: 'Heads up, toasts will stack automatically',
  img: FavIcon,
};

export default Toast;
