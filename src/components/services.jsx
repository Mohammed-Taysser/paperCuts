import React, { useState, useEffect } from 'react';
import { ServicesAPI } from '../api/Localhost';
import ServicesItem from './servicesItem';
import Alert from './bootstrap-component/Alert';
import Spinner from './bootstrap-component/Spinner';

function Services() {
  const [services, setServices] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('second');

  useEffect(() => {
    get_api_services();
  }, []);

  const get_api_services = async () => {
    await ServicesAPI.get(`/`, {
      params: {},
    })
      .then((response) => {
        setHasError(false);
        setServices(response.data);
        if (response.data.length === 0) {
          setHasError(true);
          setErrorMessage(`No Post Contain`);
        }
      })
      .catch((error) => {
        console.log(error);
        // handle error
        if (error.toString() === 'Error: Network Error') {
          setHasError(true);
          setErrorMessage('Server Is Down, Please Try On Another Time');
        }
      })
      .then(() => {
        // always executed
      });
  };

  const render_message = () => {
    if (services.length > 0) {
      return <ServicesItem services={services} />;
    } else if (hasError) {
      return <Alert color='warning'>{errorMessage}</Alert>;
    } else {
      return <Spinner />;
    }
  };

  return (
    <>
      <section className='services-section my-5 py-5'>
        <div className='more-details'>
          <small className='small-title'>what we introduce</small>
          <h2 className='h1 big-title'>our services</h2>
        </div>
        <div className='container'>
          <div className='mt-4 row justify-content-center align-items-center align-items-stretch'>
            {render_message()}
          </div>
        </div>
      </section>
    </>
  );
}

export default Services;
