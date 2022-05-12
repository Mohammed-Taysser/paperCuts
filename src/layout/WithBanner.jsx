import React from 'react';
import Banner from '../components/standalone/Banner';

function WithBanner(props) {
  const { title, subtitle, img } = props;
  return (
    <>
      <Banner title={title} subtitle={subtitle} img={img} />
      {props.children}
    </>
  );
}

export default WithBanner;
