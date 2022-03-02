import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FcBrokenLink } from 'react-icons/fc';
import Banner from '../components/Banner';
import { EventAPI, EVENTS } from '../api/Localhost';
import IsJsonServerDown from '../context/IsJsonServerDown';
import SecondaryBannerImage from '../assets/img/background/secondary-banner.jpg';
import EventsBackgroundImage from '../assets/img/background/events-background.png';
import JoinClubImage from '../assets/img/background/join-club.jpg';
import SectionTitle from '../components/SectionTitle';

function Events() {
  const is_jsonServer_down = useContext(IsJsonServerDown);
  const [events, setEvents] = useState(EVENTS);

  useEffect(() => {
    if (is_jsonServer_down) {
      setEvents(EVENTS);
    } else {
      get_events_api();
    }
  }, [is_jsonServer_down]);

  const get_events_api = () => {
    EventAPI.get(`/`)
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const is_expire = (date) => {
    let date_time = null;
    if (typeof date === 'string') {
      date_time = new Date(date).getTime();
    }
    return date_time <= new Date().getTime();
  };
  const format_to_ymd = (date) => {
    let real_date = typeof date === 'string' ? new Date(date) : date;
    return real_date.toISOString().slice(0, 10).replace(/-/g, '.');
  };

  const events_list = () => {

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
                  <Link to={`/events/${event.id}`} className='h4 m-0 text-dark'>
                    {event.title}
                  </Link>
                </div>
                <div className='col-md-2 my-2 text-md-end'>
                  <Link
                    to={`/events/${event.id}`}
                    className={`btn btn-${
                      is_expire(event.date) ? 'aurora' : 'dark'
                    }`}
                  >
                    see tickets
                  </Link>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    );
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
            {events_list()}
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
