import React from 'react';
import Banner from '../../components/standalone/Banner';
import Location from '../../components/standalone/GeoLocation';
import usePageTitle from '../../hooks/usePageTitle';

function ContactUs() {
  usePageTitle('Contact Us');

  return (
    <>
      <Banner title='contact us' subtitle='find us' />
      <Location />
    </>
  );
}

export default ContactUs;
