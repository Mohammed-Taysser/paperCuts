import { FaStar } from 'react-icons/fa';

// --------------
// - components |
// --------------

/**
 * react component use to generate stars depend on `props.star_length`
 * @param {Object} props number of stars
 * @returns {import('react').ReactElement} span of generated stars
 */
const Stars = (props) => {
  const { stars_length } = props;
  let temp = [];
  for (let index = 0; index < stars_length; index++) {
    temp.push(<FaStar key={index} />);
  }
  return <span className='text-warning'>{temp}</span>;
};

Stars.defaultProps = {
  stars_length: 1,
};

// -------------
// - functions |
// -------------

function capitalize(str = '') {
  return str.trim().replace(/^\w/, (char) => char.toUpperCase());
}

/**
 * add zero to make two pair of number
 * @param {Number} num number to be formate
 * @returns {String}
 */
const add_zero = (num = 0) => {
  return num.toString().length > 1 ? num.toString() : `0${num}`;
};

/**
 * turn date to human readable date
 * @param {Date} date date object to formate
 * @returns {String}
 */
const human_date = (date) => {
  const temp = typeof date === 'string' ? new Date(date) : date;
  let year = temp.getFullYear(),
    month = add_zero(temp.getMonth() + 1),
    day = add_zero(temp.getDay() + 1);

  return `${year}-${month}-${day}`;
};

/**
 * create slug from strings like titles
 * @param {String} str the string to be slugify
 * @returns {String}
 */
function slugify(str) {
  return str.trim().replace(/\W+/g, '-').toLowerCase();
}

export { Stars, capitalize, human_date, slugify };
