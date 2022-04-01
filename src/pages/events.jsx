import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FcBrokenLink } from 'react-icons/fc';
import Banner from '../components/Banner';
import { EventAPI, EVENTS } from '../api/Localhost';
import SecondaryBannerImage from '../assets/images/background/secondary-banner.jpg';
import EventsBackgroundImage from '../assets/images/background/events-background.png';
import JoinClubImage from '../assets/images/background/join-club.jpg';
import SectionTitle from '../components/SectionTitle';
import Spinner from '../components/bootstrap/Spinner';
import Alert from '../components/bootstrap/Alert';
import usePageTitle from '../hooks/usePageTitle';

function Events() {
  usePageTitle('Events');
  const [events, setEvents] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    get_events_api();
  }, []);

  const get_events_api = () => {
    EventAPI.get(`/`)
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        setEvents(EVENTS);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const is_expire = (date) => {
    return new Date(date).getTime() <= new Date().getTime();
  };

  const format_to_ymd = (date) => {
    let real_date = typeof date === 'string' ? new Date(date) : date;
    return real_date.toISOString().slice(0, 10).replace(/-/g, '.');
  };

  const TicketButton = ({ event }) => {
    if (is_expire(event.date)) {
      return (
        <Link
          to={`/events/${event.slug}`}
          className='btn btn-dark css-tooltip'
          data-tooltip='expire'
        >
          see tickets
        </Link>
      );
    } else {
      return (
        <Link to={`/events/${event.slug}`} className='btn btn-aurora'>
          see tickets
        </Link>
      );
    }
  };

  const EventsList = () => {
    return (
      <ul className='events-list list-unstyled mt-5 pt-3'>
        {events.map((event) => {
          return (
            <li key={event.id} className='py-3 text-center text-md-start'>
              <div className='row algin-items-center align-items-center justify-content-between'>
                <div className='col-md-4 my-2'>
                  <small className='special-small-title text-muted'>
                    {format_to_ymd(event.date)} / {event.address}
                  </small>
                </div>
                <div className='col-md-6 my-2'>
                  <Link
                    to={`/events/${event.slug}`}
                    className='h4 m-0 text-dark'
                  >
                    {event.title}
                  </Link>
                </div>
                <div className='col-md-2 my-2 text-md-end'>
                  <TicketButton event={event} />
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    );
  };

  const Render = () => {
    if (loading) {
      return <Spinner />;
    }

    if (events && events.length > 0) {
      return <EventsList />;
    } else {
      return <Alert> no events yet </Alert>;
    }
  };

  return (
    <>
      <Banner title='our Events' subtitle='info' img={SecondaryBannerImage} />
      <section className='py-5 events-page text-dark'>
        <div
          className='book-events'
          style={{ backgroundImage: `url(${EventsBackgroundImage})` }}
        >
          <div className='container my-5 py-5'>
            <SectionTitle subtitle='events' title='Book promotions' />
            <Render />
          </div>
        </div>
        <div
          className='join-club'
          style={{ backgroundImage: `url(${JoinClubImage})` }}
        >
          <div className='w-75 d-md-flex justify-content-between align-items-center text-center text-md-start'>
            <h2>Join the Books club here</h2>
            <Link to='' className='btn btn-aurora'>
              read more
            </Link>
          </div>
        </div>
        <div className='timeline-container my-5 pt-4'>
          <SectionTitle subtitle='events' title='Book promotions' />
          <div className='container mt-5'>
            <div className='row justify-content-center align-items-center'>
              <div className='col-md-4 my-3'>
                <div className='card border-0 nice-shadow h-100 py-4 text-center single-timeline'>
                  <div className='card-body'>
                    <small className='special-small-title'>During March</small>
                    <h4 className='card-title'>Book promotion</h4>
                    <div className='single-event my-5'>
                      <h6 className='card-subtitle text-muted mb-3'>
                        12:00 - 14:30
                      </h6>
                      <p className='mb-4 text-muted'>
                        Alienum phaedrum torquatos nec eu, detraxit periculis
                        ex.
                      </p>
                    </div>

                    <div className='special-divider'>
                      <div className='icon-container'>
                        <FcBrokenLink className='icon' />
                      </div>
                    </div>
                    <div className='single-event my-5'>
                      <h6 className='card-subtitle text-muted mb-3'>
                        12:00 - 14:30
                      </h6>
                      <p className='mb-4 text-muted'>
                        Alienum phaedrum torquatos nec eu, detraxit periculis
                        ex.
                      </p>
                    </div>

                    <div className='special-divider'>
                      <div className='icon-container'>
                        <FcBrokenLink className='icon' />
                      </div>
                    </div>
                    <div className='single-event mt-5'>
                      <h6 className='card-subtitle text-muted mb-3'>
                        12:00 - 14:30
                      </h6>
                      <p className='mb-4 text-muted'>
                        Alienum phaedrum torquatos nec eu, detraxit periculis
                        ex.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-md-4 my-3'>
                <div className='card border-0 nice-shadow h-100 py-4 text-center single-timeline special'>
                  <div className='card-body'>
                    <small className='special-small-title'>During March</small>
                    <h4 className='card-title'>Book promotion</h4>
                    <div className='single-event my-5'>
                      <h6 className='card-subtitle text-muted mb-3'>
                        12:00 - 14:30
                      </h6>
                      <p className='mb-4 text-muted'>
                        Alienum phaedrum torquatos nec eu, detraxit periculis
                        ex.
                      </p>
                    </div>

                    <div className='special-divider'>
                      <div className='icon-container'>
                        <FcBrokenLink className='icon' />
                      </div>
                    </div>
                    <div className='single-event my-5'>
                      <h6 className='card-subtitle text-muted mb-3'>
                        12:00 - 14:30
                      </h6>
                      <p className='mb-4 text-muted'>
                        Alienum phaedrum torquatos nec eu, detraxit periculis
                        ex.
                      </p>
                    </div>

                    <div className='special-divider'>
                      <div className='icon-container'>
                        <FcBrokenLink className='icon' />
                      </div>
                    </div>
                    <div className='single-event mt-5'>
                      <h6 className='card-subtitle text-muted mb-3'>
                        12:00 - 14:30
                      </h6>
                      <p className='mb-4 text-muted'>
                        Alienum phaedrum torquatos nec eu, detraxit periculis
                        ex.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-md-4 my-3'>
                <div className='card border-0 nice-shadow h-100 py-4 text-center single-timeline'>
                  <div className='card-body'>
                    <small className='special-small-title'>During March</small>
                    <h4 className='card-title'>Book promotion</h4>
                    <div className='single-event my-5'>
                      <h6 className='card-subtitle text-muted mb-3'>
                        12:00 - 14:30
                      </h6>
                      <p className='mb-4 text-muted'>
                        Alienum phaedrum torquatos nec eu, detraxit periculis
                        ex.
                      </p>
                    </div>

                    <div className='special-divider'>
                      <div className='icon-container'>
                        <FcBrokenLink className='icon' />
                      </div>
                    </div>
                    <div className='single-event my-5'>
                      <h6 className='card-subtitle text-muted mb-3'>
                        12:00 - 14:30
                      </h6>
                      <p className='mb-4 text-muted'>
                        Alienum phaedrum torquatos nec eu, detraxit periculis
                        ex.
                      </p>
                    </div>

                    <div className='special-divider'>
                      <div className='icon-container'>
                        <FcBrokenLink className='icon' />
                      </div>
                    </div>
                    <div className='single-event mt-5'>
                      <h6 className='card-subtitle text-muted mb-3'>
                        12:00 - 14:30
                      </h6>
                      <p className='mb-4 text-muted'>
                        Alienum phaedrum torquatos nec eu, detraxit periculis
                        ex.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Events;
