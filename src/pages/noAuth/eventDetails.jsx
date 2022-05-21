import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaTelegram,
} from 'react-icons/fa';
import { getEventBySlug } from '../../api/events';
import { monthNames } from '../../components/ManipulateData';
import SecondaryBannerImage from '../../assets/images/background/secondary-banner.jpg';
import Spinner from '../../components/bootstrap/Spinner';
import Alert from '../../components/bootstrap/Alert';
import usePageTitle from '../../hooks/usePageTitle';
import WithBanner from '../../layout/WithBanner';

function EventsDetails() {
  const [, setPageTitle] = usePageTitle('Event Details');
  const { slug } = useParams();
  const [currentEvent, setCurrentEvents] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(null);

  useEffect(() => {
    get_events_api();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const get_events_api = () => {
    getEventBySlug(slug)
      .then((response) => {
        setCurrentEvents(response.data);
        setPageTitle(response.data.title);
      })
      .catch((error) => {
        setLoadingError(error.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const date_details = (date) => {
    let current_date = new Date(date);

    return `${current_date.getDay()} ${
      monthNames[current_date.getMonth()]
    } ${current_date.getFullYear()}.`;
  };

  const top_date = (date) => {
    let current_date = new Date(date);
    return `${current_date.getDay()} ${monthNames[current_date.getMonth()]}`;
  };

  const EventDetailsSection = () => {
    return (
      <>
        <div className='border-bottom'>
          <div className='row justify-content-center align-items-center'>
            <div className='col-md-3 my-3'>
              <h1 className='display-4'>{top_date(currentEvent.date)}</h1>
            </div>
            <div className='col-md-4 my-3'>
              <h3 className=''>{currentEvent.title}</h3>
              <div className='special-small-title'>
                {currentEvent.start} - {currentEvent.end}
              </div>
            </div>
            <div className='col-md-3 my-3'>
              <h3 className=''>{currentEvent.venue}</h3>
              <div className='special-small-title text-muted'>
                {currentEvent.hosting}
              </div>
            </div>
            <div className='col-md-2 my-3'>
              <span className='badge rounded-pill bg-aurora px-3 py-2 text-white'>
                ${currentEvent.price}
              </span>
            </div>
          </div>
        </div>
        <div className='my-4'>
          <div className='row justify-content-center align-items-center'>
            <div className='col-md-6 my-3 text-center'>
              <img
                src={currentEvent.image}
                alt={currentEvent.title}
                className='img-fluid'
                width={400}
                height={300}
              />
            </div>
            <div className='col-md-6 my-3'>
              <div className='ratio ratio-4x3'>
                <iframe
                  src={currentEvent.map}
                  loading='lazy'
                  title='paperCuts o google map'
                ></iframe>
              </div>
            </div>
          </div>
          <p className='mt-4'>{currentEvent.info}</p>
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
                    {date_details(currentEvent.date)}
                  </span>
                </div>
                <div className='mb-2'>
                  <h5 className='d-inline-block mb-0'> Time: </h5>
                  <span className='mx-3 special-small-title'>
                    {currentEvent.start} - {currentEvent.end}
                  </span>
                </div>
                <div className='mb-2'>
                  <h5 className='d-inline-block mb-0'> Venue: </h5>
                  <span className='mx-3 special-small-title'>
                    {currentEvent.venue}
                  </span>
                </div>
              </div>
            </div>
            <div className='col-md-6 my-3'>
              <div className='mt-3 text-muted'>
                <div className='mb-2'>
                  <h5 className='d-inline-block mb-0'> Address: </h5>
                  <span className='mx-3 special-small-title'>
                    {currentEvent.address}
                  </span>
                </div>
                <div className='mb-2'>
                  <h5 className='d-inline-block mb-0'> Hosting: </h5>
                  <span className='mx-3 special-small-title'>
                    {currentEvent.hosting}
                  </span>
                </div>
                <div className='mb-2'>
                  <h5 className='d-inline-block mb-0'> Mail: </h5>
                  <a
                    className='mx-3 special-small-title'
                    href={`mailto:${currentEvent.email}`}
                  >
                    {currentEvent.email}
                  </a>
                </div>
                <div className='mb-2'>
                  <h5 className='d-inline-block mb-0'> Phone: </h5>
                  <a
                    className='mx-3 special-small-title'
                    href={`tel:${currentEvent.phone}`}
                  >
                    {currentEvent.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className='mt-4'>
            <hr />
            <div className='row justify-content-center align-items-center my-4'>
              <div className='col-md-3 order-3 order-md-2 text-center'>
                <a className='text-dark h5 mx-2' href='#media-link'>
                  <FaFacebookF />
                </a>
                <a className='text-dark h5 mx-2' href='#media-link'>
                  <FaInstagram />
                </a>
                <a className='text-dark h5 mx-2' href='#media-link'>
                  <FaTelegram />
                </a>
                <a className='text-dark h5 mx-2' href='#media-link'>
                  <FaTwitter />
                </a>
              </div>
            </div>
            <hr />
          </div>
        </div>
      </>
    );
  };

  const RenderEvent = () => {
    if (loading) {
      return <Spinner />;
    } else if (loadingError) {
      return <Alert> {loadingError} </Alert>;
    } else if (currentEvent) {
      return <EventDetailsSection />;
    } else {
      return <Alert> no event found </Alert>;
    }
  };

  return (
    <WithBanner
      title={currentEvent ? currentEvent.title : 'our Events'}
      subtitle='info'
      img={SecondaryBannerImage}
    >
      <section className='py-5 events-details-page text-dark'>
        <div className='container my-5 py-5'>
          <RenderEvent />
        </div>
      </section>
    </WithBanner>
  );
}

export default EventsDetails;
