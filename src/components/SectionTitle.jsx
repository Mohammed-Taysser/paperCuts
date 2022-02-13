import React from 'react';

function SectionTitle(props) {
  return (
    <>
      <div className='more-details'>
        <small className='small-title'>{props.subtitle}</small>
        <h2 className='h1 big-title'>{props.title}</h2>
      </div>
    </>
  );
}

export default SectionTitle;
