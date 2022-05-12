import React, { useEffect, useState } from 'react';
import { getAllServices } from '../../api/services';
import { RowOfPlaceholderCard } from '../bootstrap/Placeholder';
import SectionTitle from './SectionTitle';
import Alert from '../bootstrap/Alert';
import SingleService from '../single/SingleService';
import '../../assets/scss/components/services.scss';

function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(false);

  useEffect(() => {
    get_services_api();
  }, []);

  const get_services_api = () => {
    getAllServices()
      .then((response) => {
        setServices(response.data);
      })
      .catch((error) => {
        console.log(error);
        setLoadingError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const ServiceItems = () => {
    let services_items = services.map((service) => (
      <SingleService service={service} key={service._id} />
    ));
    return <> {services_items} </>;
  };

  const Render = () => {
    if (loading && !loadingError) {
      return <RowOfPlaceholderCard />;
    } else if (loadingError) {
      return <Alert> Error While Loading services </Alert>;
    } else if (services && services.length > 0) {
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
