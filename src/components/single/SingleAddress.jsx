import React from 'react';
import { FaPhoneAlt, FaMapMarkerAlt, FaRegEnvelope } from 'react-icons/fa';

function SingleAddress(props) {
  const { address } = props;

  return (
    <div className='col-md-6 col-lg-3 my-3'>
      <div className='location-container'>
        <h4 className='mb-4'>{address.location}</h4>
        <p className='mb-2'>
          <FaMapMarkerAlt className='me-2' />
          <span className='text-muted'>54 Soho Street NY</span>
        </p>
        <p className='mb-2'>
          <FaPhoneAlt className='me-2' />
          <a href={`tel:${address.phone}`} className='text-muted'>
            {address.phone}
          </a>
        </p>
        <p className='mb-2'>
          <FaRegEnvelope className='me-2' />
          <a href={`mailto:${address.email}`} className='text-muted'>
            {address.email}
          </a>
        </p>
      </div>
    </div>
  );
}

export default SingleAddress;
