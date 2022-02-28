import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';

function StarRating(props) {
  const [rating, setRating] = useState(1);
  const [hover, setHover] = useState(1);
  useEffect(() => {
    setRating(props.length);
    setHover(props.length);
  }, [props.length]);
  return (
    <div className='star-rating'>
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type='button'
            key={index}
            className={`btn btn-sm ${
              index <= (hover || rating) ? 'text-warning' : 'text-muted'
            }`}
            onClick={() => {
              setRating(index);
              props.onClick(index);
            }}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
            <span className='star'>
              <FaStar />
            </span>
          </button>
        );
      })}
    </div>
  );
}

StarRating.defaultProps = {
  length: 1,
  onClick: (data) => {
    console.log(data);
  },
};

export default StarRating;
