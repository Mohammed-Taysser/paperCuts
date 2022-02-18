import React from 'react';
import Services from '../components/Services';
import Header from '../components/layout/Header';
import LatestBooks from '../components/LatestBooks';
import Testimonials from '../components/Testimonials';
import Awards from '../components/Awards';
import Location from '../components/Location';
import NewsLetter from '../components/NewsLetter';

function homepage() {
  return (
    <>
      <Header />
      <Services />
      <LatestBooks />
      <Testimonials />
      <Awards />
      <Location />
      <NewsLetter />
    </>
  );
}

export default homepage;
