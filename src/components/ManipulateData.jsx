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
 * @param {Date | String} date date object to formate
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

/**
 * calculate diff between dates in days
 * @param {Date | String} date_1 first date must be bigger than otherDate
 * @param {Date | String} date_2 second date
 * @returns {Number} days number
 */
function diff_in_days(date_1, date_2) {
  const first_date =
      typeof date_1 === 'string'
        ? new Date(date_1).getTime()
        : date_1.getTime(),
    second_date =
      typeof date_2 === 'string'
        ? new Date(date_2).getTime()
        : date_2.getTime();
  return Math.ceil(Math.abs(first_date - second_date) / (1000 * 60 * 60 * 24));
}

export { Stars, capitalize, human_date, slugify, diff_in_days };
