import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Alert from './bootstrap/Alert';
import Spinner from './bootstrap/Spinner';
import { AuthorsAPI, get_author_by_id } from '../api/Localhost';

const AboutAuthor = (props) => {
  const { id: authorId } = props;
  const [currentAuthor, setCurrentAuthor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api_get_author();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const api_get_author = () => {
    AuthorsAPI.get(`/${authorId}`)
      .then((response) => {
        setCurrentAuthor(response.data);
      })
      .catch((error) => {
        let temp_author = get_author_by_id(authorId);
        if (temp_author) {
          setCurrentAuthor(get_author_by_id(authorId));
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const Render = () => {
    if (loading) {
      return <Spinner />;
    }
    if (currentAuthor) {
      return (
        <div className='author-section mt-5'>
          <div className='d-md-flex align-items-center'>
            <img
              src={currentAuthor.image}
              alt={`${currentAuthor.firstName} ${currentAuthor.lastName}`}
              width='100'
              height='100'
              className='img-fluid rounded-circle border-aurora p-1 mb-2 mb-md-0'
            />
            <div className=' mx-3'>
              <h4 className='mb-1'>
                <Link
                  to={`/authors/${currentAuthor.username}`}
                >{`${currentAuthor.firstName} ${currentAuthor.lastName}`}</Link>
              </h4>
              <p className='m-0'>{currentAuthor.info}</p>
            </div>
          </div>
        </div>
      );
    } else {
      return <Alert> error while loading author </Alert>;
    }
  };

  return <Render />;
};

export default AboutAuthor;
