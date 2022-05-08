import React from 'react';
import { BsFacebook, BsInstagram, BsTelegram, BsTwitter } from 'react-icons/bs';

function SocialMedia(props) {
  const { formData, onSocialMediaInputChange } = props;

  return ( 
    <div className='row g-2'>
    <div className='col-6'>
      <div className='input-group custom-input-group input-group-sm'>
        <span
          className='input-group-text'
          id='facebook-profile'
        >
          <BsFacebook />
          <span className='mx-1'>facebook</span>
        </span>
        <input
          className='form-control'
          type='text'
          placeholder='Facebook Profile'
          aria-label='facebook-profile'
          aria-describedby='facebook-profile'
          name='facebook'
          onChange={onSocialMediaInputChange}
          value={formData.socialMedia.facebook}
        />
      </div>
    </div>
    <div className='col-6'>
      <div className='input-group custom-input-group input-group-sm'>
        <span className='input-group-text' id='twitter-profile'>
          <BsTwitter />
          <span className='mx-1'>twitter</span>
        </span>
        <input
          className='form-control'
          type='text'
          placeholder='Twitter Profile'
          aria-label='twitter-profile'
          aria-describedby='twitter-profile'
          name='twitter'
          onChange={onSocialMediaInputChange}
          value={formData.socialMedia.twitter}
        />
      </div>
    </div>
    <div className='col-6'>
      <div className='input-group custom-input-group input-group-sm'>
        <span
          className='input-group-text'
          id='telegram-profile'
        >
          <BsTelegram />
          <span className='mx-1'>telegram</span>
        </span>
        <input
          className='form-control'
          type='text'
          placeholder='Telegram Profile'
          aria-label='telegram-profile'
          aria-describedby='telegram-profile'
          name='telegram'
          onChange={onSocialMediaInputChange}
          value={formData.socialMedia.telegram}
        />
      </div>
    </div>
    <div className='col-6'>
      <div className='input-group custom-input-group input-group-sm'>
        <span
          className='input-group-text'
          id='instagram-profile'
        >
          <BsInstagram />
          <span className='mx-1'>instagram</span>
        </span>
        <input
          className='form-control'
          type='text'
          placeholder='Instagram Profile'
          aria-label='instagram-profile'
          aria-describedby='instagram-profile'
          name='instagram'
          onChange={onSocialMediaInputChange}
          value={formData.socialMedia.instagram}
        />
      </div>
    </div>
  </div>
   );
}

export default SocialMedia;