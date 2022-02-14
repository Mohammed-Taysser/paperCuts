import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

function StarRating() {
  const [rating, setRating] = useState(1);
  const [hover, setHover] = useState(1);
  return (
    <div className='star-rating'>
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type='button'
            key={index}
            className={`btn btn-sm ${index <= (hover || rating) ? 'text-warning' : 'text-muted'}`}
            onClick={() => setRating(index)}
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

export default StarRating;
