import React, { useEffect, useState } from 'react';
import { SERVICES, ServicesAPI } from '../api/Localhost';
import SectionTitle from './SectionTitle';
import Alert from './bootstrap/Alert';
import Spinner from './bootstrap/Spinner';
import SingleService from './single/SingleService';

function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    get_services_api();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const get_services_api = () => {
    ServicesAPI.get('/')
      .then((response) => {
        setServices(response.data);
      })
      .catch((err) => {
        setServices(SERVICES);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const ServiceItems = () => {
    if (services.length > 0) {
      let services_items = services.map((service) => (
        <SingleService service={service} key={service.id} />
      ));
      return <> {services_items} </>;
    }
    return <Alert> no services available </Alert>;
  };

  const Render = () => {
    if (loading) {
      return <Spinner />;
    }
    if (services) {
      return (
        <div className='mt-4 row justify-content-center align-items-center align-items-stretch'>
          <ServiceItems />
        </div>
      );
    } else {
      return <Alert> no services available </Alert>;
    }
  };

  return (
    <>
      <section className='services-section my-5 py-5'>
        <SectionTitle title='our services' subtitle='what we introduce' />
        <div className='container'>
          <Render />
        </div>
      </section>
    </>
  );
}

export default Services;
