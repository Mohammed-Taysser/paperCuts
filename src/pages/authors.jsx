import React from 'react';
import Banner from '../components/Banner';

function Authors() {
  const authors_list = () => {
    return (
      <div className='col-sm-6 col-md-4 col-lg-3 my-3'>
        <div className='text-center'>
          <img
            src='https://chapterone.qodeinteractive.com/wp-content/uploads/2019/08/author1.png'
            alt='author name'
            className='img-fluid rounded-circle'
            width={200}
            height={200}
          />
          <h4 className='my-2'>author name</h4>
        </div>
      </div>
    );
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
