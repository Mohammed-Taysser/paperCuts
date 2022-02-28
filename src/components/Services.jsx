import React, { useContext, useEffect, useState } from 'react';
import { FcRadarPlot } from 'react-icons/fc';
import { SERVICES, ServicesAPI } from '../api/Localhost';
import SectionTitle from './SectionTitle';
import IsJsonServerDown from '../context/IsJsonServerDown';

function Services() {
  const is_jsonServer_down = useContext(IsJsonServerDown);
  const [services, setServices] = useState(SERVICES);

  useEffect(() => {
    if (is_jsonServer_down) {
      setServices(SERVICES);
    } else {
      get_services_api();
    }
  }, []);

  const get_services_api = () => {
    ServicesAPI.get('/')
      .then((response) => {
        setServices(response.data);
      })
      .catch((err) => {
        setServices(SERVICES);
      });
  };

  const service_items = () => {
    if (services.length > 0) {
      return services.map((service) => {
        return (
          <div className='col-md-6 col-lg-3 my-3' key={service.id}>
            <div className='single-service'>
              <div className='card border-0 h-100 text-center'>
                <img
                  src={service.img}
                  className='card-img-top img-fluid d-inline-block mx-auto'
                  alt={service.title}
                />
                <div className='card-body'>
                  <div className='my-2'>
                    <FcRadarPlot className='h2' />
                  </div>
                  <h4 className='card-title text-aurora'>{service.title}</h4>
                  <p className='card-text text-muted'>{service.info}</p>
                </div>
              </div>
            </div>
          </div>
        );
      });
    }
    return <> no services available </>;
  };

  return (
    <>
      <section className='services-section my-5 py-5'>
        <SectionTitle title='our services' subtitle='what we introduce' />
        <div className='container'>
          <div className='mt-4 row justify-content-center align-items-center align-items-stretch'>
            {service_items()}
          </div>
        </div>
      </section>
    </>
  );
}

export default Services;
