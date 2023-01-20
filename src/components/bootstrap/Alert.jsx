import React from 'react';
import { IoMdAlert, IoMdWarning, IoIosCheckmarkCircle } from 'react-icons/io';
import 'bootstrap/js/src/alert';

/**
 * @use `noIcon` to disable icons
 * @use `sm` to make alert smaller
 * @use `dismiss` to make alert dismissible
 * @use `color` as bootstrap colors default is warning to change alert color
 * @param {Object} props Object of setting (book, withWishlist, md)
 * @returns  JSX
 */
const Alert = (props) => {
  const className = `alert alert-${props.color} d-flex align-items-center ${
    props.className || ''
  } ${props.dismiss && ' alert-dismissible fade show'} ${
    props.sm && 'p-1 small'
  }`;

  const ShowIcon = () => {
    let icon = null,
      iconClassName = `mx-1 ${props.sm ? 'h5' : 'h4'} my-0`;
    switch (props.color) {
      case 'primary':
        icon = <IoMdAlert className={iconClassName} />;
        break;
      case 'success':
        icon = <IoIosCheckmarkCircle className={iconClassName} />;
        break;
      case 'danger':
      default:
        icon = <IoMdWarning className={iconClassName} />;
        break;
    }
    return icon;
  };

  return (
    <div className={className} role='alert'>
      {!props.noIcon && <ShowIcon />}
      <div className={props.outerClass}>{props.children}</div>
      {props.dismiss && (
        <button
          type='button'
          className={`btn-close ${props.sm && 'mt-1 p-1'}`}
          data-bs-dismiss='alert'
          aria-label='Close'
        ></button>
      )}
    </div>
  );
};

Alert.defaultProps = {
  color: 'warning',
  dismiss: false,
  noIcon: false,
  children: (
    <>
      A simple alert with
      <a href='#go-some-where' className='alert-link mx-1'>
        an example link.
      </a>
      Give it a click if you like.
    </>
  ),
};

export default Alert;
