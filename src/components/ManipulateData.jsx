import { FaStar } from 'react-icons/fa';

const Stars = ({ stars_length }) => {
  let temp = [];
  for (let index = 0; index < stars_length; index++) {
    temp.push(<FaStar key={index} />);
  }
  return <span className='text-warning'>{temp}</span>;
};

Stars.defaultProps = {
  stars_length: 1,
};

function capitalize(str) {
  return str.trim().replace(/^\w/, (char) => char.toUpperCase());
}

export { Stars, capitalize };
