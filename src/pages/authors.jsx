import React from 'react';
import SingleMember from '../components/SingleMember';
import Banner from '../components/Banner';

function Authors() {
  const authors_list = () => {
    return [1, 2, 3, 4].map((member) => {
      return <SingleMember key={member.id} />;
    });
  };
  return (
    <>
      <Banner title='authors' subtitle='info' />
      <section className='my-5 py-5'>
        <div className='container'>
          <div className='row justify-content-center align-items-center'>
            {authors_list()}
          </div>
        </div>
      </section>
    </>
  );
}

export default Authors;
