import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MdAlternateEmail } from 'react-icons/md';
import IsJsonServerDown from '../context/IsJsonServerDown';
import SingleBook from '../components/SingleBook';
import Banner from '../components/Banner';
import SectionTitle from '../components/SectionTitle';
import { AuthorsAPI, get_author_by_id } from '../api/Localhost';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaTelegram,
} from 'react-icons/fa';

function AuthorDetails() {
  const { id } = useParams();
  const is_jsonServer_down = useContext(IsJsonServerDown);
  const [currentAuthor, setCurrentAuthor] = useState(get_author_by_id(id));

  useEffect(() => {
    if (is_jsonServer_down) {
      setCurrentAuthor(get_author_by_id(id));
    } else {
      get_author_api();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [is_jsonServer_down]);

  const get_author_api = () => {
    AuthorsAPI.get(`/${id}`)
      .then((response) => {
        setCurrentAuthor(response.data);
      })
      .catch((err) => {
        setCurrentAuthor(get_author_by_id(id));
      });
  };

  const book_list = () => {
    if (currentAuthor.books.length > 0) {
      return currentAuthor.books.map((book) => {
        return <SingleBook book={book} key={book.id} />;
      });
    }
    return <> no books available </>;
  };

  const full_name = () => {
    return `${currentAuthor.first_name} ${currentAuthor.last_name}`;
  };

  const social_media = () => {
    return (
      <>
        <a
          className='text-dark h5 me-2'
          href={currentAuthor.socialMedia.facebook}
        >
          <FaFacebookF />
        </a>
        <a
          className='text-dark h5 mx-2'
          href={currentAuthor.socialMedia.instagram}
        >
          <FaInstagram />
        </a>
        <a
          className='text-dark h5 mx-2'
          href={currentAuthor.socialMedia.telegram}
        >
          <FaTelegram />
        </a>
        <a
          className='text-dark h5 mx-2'
          href={currentAuthor.socialMedia.twitter}
        >
          <FaTwitter />
        </a>
        <a className='text-dark h5 ms-2' href={`mailto:${currentAuthor.email}`}>
          <MdAlternateEmail />
        </a>
      </>
    );
  };

  return (
    <>
      <Banner title={full_name()} subtitle='author' />

      <section className='my-5'>
        <div className='container'>
          <div className='row justify-content-center align-items-center'>
            <div className='col-md-5 my-3 text-center'>
              <img
                src={currentAuthor.img}
                alt={full_name()}
                width={250}
                height={250}
                className='img-fluid rounded-circle'
              />
            </div>
            <div className='col-md-7 my-3'>
              <div className='author-details-section'>
                <small className='special-small-title'>
                  {currentAuthor.gender}
                </small>
                <h1 className='h2 mb-3'> {full_name()} </h1>
                <p className='small-info'>{currentAuthor.short_info}</p>
                <p className='text-muted'>{currentAuthor.info}</p>
                <p className='mb-1'>age: {currentAuthor.age}</p>
                <p className='mb-1'>
                  Category: {currentAuthor.category.join(', ')}
                </p>
                <p className='mb-1'>
                  Languages: {currentAuthor.language.join(', ')}
                </p>
                <div className='mt-4'>{social_media()}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='author-books my-5 py-5'>
        <SectionTitle subtitle='shop online' title='author books' />
        <div className='container p-xs-0 px-5 px-md-0'>
          <div className='row mt-4 justify-content-center align-items-center align-items-stretch'>
            {book_list()}
          </div>
        </div>
      </section>
    </>
  );
}

export default AuthorDetails;
