import React from 'react';
import { Link } from 'react-router-dom';
import { FaPhoneAlt, FaMapMarkerAlt, FaRegEnvelope } from 'react-icons/fa';
import SectionTitle from './SectionTitle';
import Client1 from '../assets/img/clients/client-1.png';
import Client2 from '../assets/img/clients/client-2.png';
import Client3 from '../assets/img/clients/client-3.png';
import Client4 from '../assets/img/clients/client-4.png';
import Client5 from '../assets/img/clients/client-5.png';

function Location() {
  const google_map = () => {
    return (
      <div className='ratio ratio-16x9'>
        <iframe
          src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55251.335640563026!2d31.22344491961029!3d30.059558098332303!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583fa60b21beeb%3A0x79dfb296e8423bba!2sCairo%2C%20Cairo%20Governorate!5e0!3m2!1sen!2seg!4v1646204637166!5m2!1sen!2seg'
          loading='lazy'
          title='paperCuts o google map'
        ></iframe>
      </div>
    );
  };
  return (
    <section className='location-section py-5 my-5'>
      <SectionTitle subtitle='find us' title='Bookstore locations' />
      <div className='container'>
        <div className='my-5 '>{google_map()}</div>

        <div className='row mt-4 justify-content-center align-items-center align-items-stretch'>
          <div className='col-md-6 col-lg-3 my-3'>
            <div className='location-container'>
              <h4 className='mb-4'>Bookstore Central</h4>
              <p className='mb-2'>
                <FaMapMarkerAlt className='me-2' />
                <Link to='/' className='text-muted'>
                  54 Soho Street NY
                </Link>
              </p>
              <p className='mb-2'>
                <FaPhoneAlt className='me-2' />
                <Link to='/' className='text-muted'>
                  (+123) 456 789
                </Link>
              </p>
              <p className='mb-2'>
                <FaRegEnvelope className='me-2' />
                <Link to='/' className='text-muted'>
                  chapter@example.com
                </Link>
              </p>
            </div>
          </div>
          <div className='col-md-6 col-lg-3 my-3'>
            <div className='location-container'>
              <h4 className='mb-4'>Bookstore 1</h4>
              <p className='mb-2'>
                <FaMapMarkerAlt className='me-2' />
                <Link to='/' className='text-muted'>
                  54 Soho Street NY
                </Link>
              </p>
              <p className='mb-2'>
                <FaPhoneAlt className='me-2' />
                <Link to='/' className='text-muted'>
                  (+123) 456 789
                </Link>
              </p>
              <p className='mb-2'>
                <FaRegEnvelope className='me-2' />
                <Link to='/' className='text-muted'>
                  chapter@example.com
                </Link>
              </p>
            </div>
          </div>
          <div className='col-md-6 col-lg-3 my-3'>
            <div className='location-container'>
              <h4 className='mb-4'>Bookstore 2</h4>
              <p className='mb-2'>
                <FaMapMarkerAlt className='me-2' />
                <Link to='/' className='text-muted'>
                  54 Soho Street NY
                </Link>
              </p>
              <p className='mb-2'>
                <FaPhoneAlt className='me-2' />
                <Link to='/' className='text-muted'>
                  (+123) 456 789
                </Link>
              </p>
              <p className='mb-2'>
                <FaRegEnvelope className='me-2' />
                <Link to='/' className='text-muted'>
                  chapter@example.com
                </Link>
              </p>
            </div>
          </div>
          <div className='col-md-6 col-lg-3 my-3'>
            <div className='location-container'>
              <h4 className='mb-4'>Publisher</h4>
              <p className='mb-2'>
                <FaMapMarkerAlt className='me-2' />
                <Link to='/' className='text-muted'>
                  54 Soho Street NY
                </Link>
              </p>
              <p className='mb-2'>
                <FaPhoneAlt className='me-2' />
                <Link to='/' className='text-muted'>
                  (+123) 456 789
                </Link>
              </p>
              <p className='mb-2'>
                <FaRegEnvelope className='me-2' />
                <Link to='/' className='text-muted'>
                  chapter@example.com
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className='clients-container'>
          <div className='row mt-4 justify-content-center align-items-center align-items-stretch text-center'>
            <div className='col-6 col-lg-2 my-3'>
              <Link to='' className='single-client'>
                <img src={Client1} alt='client-1' className='img-fluid' />
              </Link>
            </div>
            <div className='col-6 col-lg-2 my-3'>
              <Link to='' className='single-client'>
                <img src={Client2} alt='client-2' className='img-fluid' />
              </Link>
            </div>
            <div className='col-6 col-lg-2 my-3'>
              <Link to='' className='single-client'>
                <img src={Client3} alt='client-3' className='img-fluid' />
              </Link>
            </div>
            <div className='col-6 col-lg-2 my-3'>
              <Link to='' className='single-client'>
                <img src={Client4} alt='client-4' className='img-fluid' />
              </Link>
            </div>
            <div className='col-6 col-lg-2 my-3'>
              <Link to='' className='single-client'>
                <img src={Client5} alt='client-4' className='img-fluid' />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Location;
