import React from 'react';
import GeoLocation from '../../components/standalone/GeoLocation';
import usePageTitle from '../../hooks/usePageTitle';
import WithBanner from '../../layout/WithBanner';

function ContactUs() {
  usePageTitle('Contact Us');

  return (
    <WithBanner title='contact us' subtitle='find us'>
      <GeoLocation />
    </WithBanner>
  );
}

export default ContactUs;
