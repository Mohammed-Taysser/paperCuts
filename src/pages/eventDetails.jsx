import React from 'react';
import { Link } from 'react-router-dom';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaTelegram,
} from 'react-icons/fa';
import Banner from '../components/Banner';
import SecondaryBannerImage from '../assets/img/background/secondary-banner.jpg';

function EventsDetails() {
  return (
    <>
      <Banner title='our Events' subtitle='info' img={SecondaryBannerImage} />
      <section className='py-5 events-details-page text-dark'>
        <div className='container my-5 py-5'>
          <div className='border-bottom'>
            <div className='row justify-content-center align-items-center'>
              <div className='col-md-3 my-3'>
                <h1 className='display-4'>21 july</h1>
              </div>
              <div className='col-md-4 my-3'>
                <h3 className=''>Festival of Books</h3>
                <div className='special-small-title'>13:00pm - 15:00pm</div>
              </div>
              <div className='col-md-3 my-3'>
                <h3 className=''>Lake Balboa</h3>
                <div className='special-small-title text-muted'>
                  City Library
                </div>
              </div>
              <div className='col-md-2 my-3'>
                <span className='badge rounded-pill bg-aurora px-3 py-2 text-white'>
                  $14.00
                </span>
              </div>
            </div>
          </div>
          <div className='my-4'>
            <div className='row justify-content-center align-items-center'>
              <div className='col-md-6 my-3'>
                <img
                  src='https://chapterone.qodeinteractive.com/wp-content/uploads/2019/07/event-single-image-5-1.jpg'
                  alt='event'
                  className='img-fluid'
                />
              </div>
              <div className='col-md-6 my-3'>
                <div className='ratio ratio-4x3'>
                  <iframe
                    src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7174449.442873114!2d28.493433407753876!3d28.595302279474986!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14368976c35c36e9%3A0x2c45a00925c4c444!2sEgypt!5e0!3m2!1sen!2seg!4v1644822191608!5m2!1sen!2seg'
                    loading='lazy'
                    title='paperCuts o google map'
                  ></iframe>
                </div>
              </div>
            </div>
            <p className='mt-4'>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident.
            </p>
          </div>
          <div className='event-details mt-5'>
            <h2 className='mb-4'>Event details</h2>
            <hr />
            <div className='row justify-content-center'>
              <div className='col-md-6 my-3'>
                <div className='mt-3 text-muted'>
                  <div className='mb-2'>
                    <h5 className='d-inline-block mb-0'> Date: </h5>
                    <span className='mx-3 special-small-title'>
                      21 July 2019.
                    </span>
                  </div>
                  <div className='mb-2'>
                    <h5 className='d-inline-block mb-0'> Time: </h5>
                    <span className='mx-3 special-small-title'>
                      13:00pm - 15:00pm
                    </span>
                  </div>
                  <div className='mb-2'>
                    <h5 className='d-inline-block mb-0'> Venue: </h5>
                    <span className='mx-3 special-small-title'>
                      Lake Balboa
                    </span>
                  </div>
                </div>
              </div>
              <div className='col-md-6 my-3'>
                <div className='mt-3 text-muted'>
                  <div className='mb-2'>
                    <h5 className='d-inline-block mb-0'> Address: </h5>
                    <span className='mx-3 special-small-title'>
                      LA, California.
                    </span>
                  </div>
                  <div className='mb-2'>
                    <h5 className='d-inline-block mb-0'> Hosting: </h5>
                    <span className='mx-3 special-small-title'>
                      City Library
                    </span>
                  </div>
                  <div className='mb-2'>
                    <h5 className='d-inline-block mb-0'> Mail: </h5>
                    <span className='mx-3 special-small-title'>
                      chapter@example.com
                    </span>
                  </div>
                  <div className='mb-2'>
                    <h5 className='d-inline-block mb-0'> Phone: </h5>
                    <span className='mx-3 special-small-title'>
                      +12 345 678 900
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className='mt-4'>
              <hr />
              <div className='row justify-content-between align-items-center my-4'>
                <div className='col-md-3 order-1 text-muted'>
                  <Link className='special-small-title small text-muted' to=''>
                    <FiChevronLeft className='h6 mb-1' />
                    <span className='special-small-title small'>previous</span>
                  </Link>
                </div>
                <div className='col-md-3 order-3 order-md-2 text-center'>
                  <Link className='text-dark h5 mx-2' to=''>
                    <FaFacebookF />
                  </Link>
                  <Link className='text-dark h5 mx-2' to=''>
                    <FaInstagram />
                  </Link>
                  <Link className='text-dark h5 mx-2' to=''>
                    <FaTelegram />
                  </Link>
                  <Link className='text-dark h5 mx-2' to=''>
                    <FaTwitter />
                  </Link>
                </div>
                <div className='col-md-3 order-2 text-muted oder-md-1 text-md-end text-end text-md-start'>
                  <Link className='text-muted' to=''>
                    <span className='special-small-title small'>next</span>
                    <FiChevronRight className='h6 mb-1' />
                  </Link>
                </div>
              </div>
              <hr />
            </div>
            <div className='d-flex justify-content-end mt-4'>
              <Link to='' className='btn btn-aurora'>
                see tickets
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default EventsDetails;
