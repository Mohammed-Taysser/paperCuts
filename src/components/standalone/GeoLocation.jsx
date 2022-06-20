import React from 'react';
import SectionTitle from './SectionTitle';
import SingleAddress from '../single/SingleAddress';

import Sponsor1 from '../../assets/images/icons/sponsors/sponsor-1.png';
import Sponsor2 from '../../assets/images/icons/sponsors/sponsor-2.png';
import Sponsor3 from '../../assets/images/icons/sponsors/sponsor-3.png';
import Sponsor4 from '../../assets/images/icons/sponsors/sponsor-4.png';
import Sponsor5 from '../../assets/images/icons/sponsors/sponsor-5.png';

import '../../assets/scss/components/geoLocation.scss';

function GeoLocation(props) {
  const GoogleMap = () => {
    return (
      <div className='ratio ratio-16x9 my-5'>
        <iframe
          src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55251.335640563026!2d31.22344491961029!3d30.059558098332303!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583fa60b21beeb%3A0x79dfb296e8423bba!2sCairo%2C%20Cairo%20Governorate!5e0!3m2!1sen!2seg!4v1646204637166!5m2!1sen!2seg'
          loading='lazy'
          title='paperCuts on google map'
        ></iframe>
      </div>
    );
  };

  const LocationDetails = () => {
    const address = [
      {
        location: 'Bookstore Central',
        email: 'chapter@example.com',
        phone: '(+123) 456 789',
      },
      {
        location: 'Bookstore 1',
        email: 'chapter@example.com',
        phone: '(+123) 456 789',
      },
      {
        location: 'Bookstore 2',
        email: 'chapter@example.com',
        phone: '(+123) 456 789',
      },
      {
        location: 'publisher',
        email: 'chapter@example.com',
        phone: '(+123) 456 789',
      },
    ];
    let address_details = [];
    address.forEach((adrs, index) => {
      address_details.push(<SingleAddress address={adrs} key={index} />);
    });
    return (
      <div className='row mt-4 justify-content-center align-items-center align-items-stretch'>
        {address_details}
      </div>
    );
  };

  const Sponsors = () => {
    let sponsor_images = [Sponsor1, Sponsor2, Sponsor3, Sponsor4, Sponsor5],
      sponsor_arr = [];

    sponsor_images.forEach((img, index) => {
      sponsor_arr.push(
        <div className='col-6 col-lg-2 my-3' key={index}>
          <div className='single-client'>
            <img src={img} alt={`client-${index}`} className='img-fluid' />
          </div>
        </div>
      );
    });

    return (
      <div className='clients-container'>
        <div className='row mt-4 justify-content-center align-items-center align-items-stretch text-center'>
          {sponsor_arr}
        </div>
      </div>
    );
  };

  return (
    <section className='location-section py-5 my-5'>
      <SectionTitle subtitle='find us' title='Bookstore locations' />
      <div className='container'>
        {props.map && <GoogleMap />}
        <LocationDetails />
        <Sponsors />
      </div>
    </section>
  );
}

GeoLocation.defaultProps = {
  map: true,
};

export default GeoLocation;
