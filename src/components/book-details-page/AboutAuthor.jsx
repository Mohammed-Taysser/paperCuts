import React from 'react';
import { Link } from 'react-router-dom';

const AboutAuthor = (props) => {
  const { author } = props;
  return (
    <div className='author-section mt-5'>
      <div className='d-md-flex align-items-center'>
        <img
          src={author.img}
          alt={author.name}
          width='100'
          height='100'
          className='img-fluid rounded-circle border-aurora p-1 mb-2 mb-md-0'
        />
        <div className=' mx-3'>
          <h4 className='mb-1'>
            <Link to=''>{author.name}</Link>
          </h4>
          <p className='m-0'>{author.info}</p>
        </div>
      </div>
    </div>
  );
};

AboutAuthor.defaultProps = {
  author: {
    img: 'https://cdn.jsdelivr.net/gh/Mohammed-Taysser/rakm1@master/paperCuts/authors/img/avatar-2.png',
    info: 'about author',
    name: 'author name',
  },
};

export default AboutAuthor;
