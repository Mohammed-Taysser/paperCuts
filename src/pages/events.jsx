import React from 'react';
import { Link } from 'react-router-dom';
import { FcBrokenLink } from 'react-icons/fc';
import Banner from '../components/Banner';
import SecondaryBannerImage from '../assets/img/background/secondary-banner.jpg';
import EventsBackgroundImage from '../assets/img/background/events-background.png';
import JoinClubImage from '../assets/img/background/join-club.jpg';
import SectionTitle from '../components/SectionTitle';

function Events() {
  const events_list = () => {
    const EVENTS = [
      {
        id: 1,
        title: 'Festival of Books',
        date: '21.07.2019',
        location: 'LA, California',
      },
      {
        id: 2,
        title: 'Book Signing',
        date: '21.07.2019',
        location: 'Paris, France',
      },
      {
        id: 3,
        title: 'Book Fair',
        date: '21.07.2019',
        location: 'Washington, US',
      },
      {
        id: 4,
        title: 'promotion Book ',
        date: '21.07.2019',
        location: 'Madrid, Spain',
      },
    ];
    return (
      <ul className='events-list list-unstyled mt-5 pt-3'>
        {EVENTS.map((event,index) => {
          return (
            <li key={event.id} className='py-3 text-center text-md-start'>
              <div className='row algin-items-center align-items-center justify-content-between'>
                <div className='col-md-4 my-2'>
                  <small className='special-small-title text-muted'>
                    {event.date} / {event.location}
                  </small>
                </div>
                <div className='col-md-6 my-2'>
                  <Link to={`/events/${event.id}`} className='h4 m-0 text-dark'>
                    {event.title}
                  </Link>
                </div>
                <div className='col-md-2 my-2 text-md-end'>
                  <Link to={`/events/${event.id}`} className={`btn btn-${index !== 2 ? 'aurora' : 'dark disabled'}`}>
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
