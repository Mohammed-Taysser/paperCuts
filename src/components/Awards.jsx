import React from 'react';
import Client1 from '../assets/img/client-1.png';
import Client2 from '../assets/img/client-2.png';
import Client3 from '../assets/img/client-3.png';
import Writer from '../assets/img/writer.png';
import SkewedShape from '../assets/img/skewed-shape.png';
import InterviewWord from '../assets/img/interview-word.png';
import ManShape from '../assets/img/man-shape.png';
import TopRoundedShape from '../assets/img/top-rounded-shape.png';
import PopShape from '../assets/img/pop-shape.png';
import BookShelf from '../assets/img/book-shelf.jpg';

function Awards() {
  return (
    <section className='awards-section my-5 py-5'>
      <div className='container'>
        <div className='row justify-content-between'>
          <div className='col-md-6 my-3'>
            <div className='writer-container'>
              <div className='writer-img'>
                <img
                  src={TopRoundedShape}
                  alt='top-rounded-shape'
                  width={'270'}
                  height={'280'}
                  className='top-rounded-shape'
                />
                <img
                  src={PopShape}
                  alt='pop-shape'
                  width={'240'}
                  height={'250'}
                  className='pop-shape'
                />
                <img
                  src={ManShape}
                  alt='man-shape'
                  width={'110'}
                  height={'185'}
                  className='man-shape'
                />
                <img
                  src={BookShelf}
                  alt='book-shelf'
                  width={'180'}
                  height={'180'}
                  className='book-shelf'
                />
                <img
                  src={Writer}
                  alt='writer'
                  width={'300'}
                  height={'300'}
                  className='img-fluid'
                />
              </div>
              <img
                src={InterviewWord}
                alt='interview-word'
                className='img-fluid d-block ms-auto'
                width={'180'}
                height={'90'}
              />
            </div>
          </div>
          <div className='col-md-6 my-3'>
            <img
              src={SkewedShape}
              alt='skewed-shape'
              className='img-fluid d-block ms-auto mb-4'
              width={'220'}
              height={'55'}
            />
            <small className='special-small-title'>writhers</small>
            <h3 className='mb-3'>Awards & nominations</h3>
            <p className='text-muted'>
              This open access wide-ranging collation of papers examines a host
              of issues in studying immigrant.{' '}
            </p>
            <div className='clients mt-4'>
              <img
                src={Client1}
                alt='client-1'
                width={'75'}
                height={'75'}
                className='img-fluid me-3'
              />
              <img
                src={Client2}
                alt='client-2'
                width={'75'}
                height={'75'}
                className='img-fluid mx-3'
              />
              <img
                src={Client3}
                alt='client-3'
                width={'75'}
                height={'75'}
                className='img-fluid ms-3'
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Awards;
