import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { MdAlternateEmail } from 'react-icons/md';
import SingleBook from '../components/single/SingleBook';
import Banner from '../components/Banner';
import SectionTitle from '../components/SectionTitle';
import {
  AuthorsAPI,
  get_author_by_username,
  BOOKS,
  CATEGORY,
} from '../api/Localhost';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaTelegram,
} from 'react-icons/fa';
import Alert from '../components/bootstrap-component/Alert';
import Spinner from '../components/bootstrap-component/Spinner';

function AuthorDetails() {
  const { username } = useParams();
  const [currentAuthor, setCurrentAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    get_author_api();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const get_author_api = () => {
    AuthorsAPI.get(`?username=${username}`)
      .then((response) => {
        if (response.data.length === 1) {
          setCurrentAuthor(response.data[0]);
          setBooks(
            BOOKS.filter((book) => response.data[0].books.includes(book.id))
          );
          setCategory(
            CATEGORY.filter((cty) => response.data[0].category.includes(cty.id))
          );
        }
      })
      .catch((err) => {
        setCurrentAuthor(get_author_by_username(username));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const AuthorBookList = () => {
    if (books.length > 0) {
      let author_books = books.map((book) => (
        <SingleBook book={book} key={book.id} />
      ));
      return <> {author_books} </>;
    }
    return <> no books available </>;
  };

  const full_name = () => {
    return `${currentAuthor.firstName} ${currentAuthor.lastName}`;
  };

  const SocialMedia = () => {
    let author_social_media = [];
    for (const key in currentAuthor.socialMedia) {
      if (Object.hasOwnProperty.call(currentAuthor.socialMedia, key)) {
        let icon = null;

        switch (key) {
          case 'instagram':
            icon = <FaInstagram />;
            break;
          case 'facebook':
            icon = <FaFacebookF />;
            break;
          case 'twitter':
            icon = <FaTwitter />;
            break;
          case 'telegram':
            icon = <FaTelegram />;
            break;
          default:
            icon = <MdAlternateEmail />;
            break;
        }
        author_social_media.push(
          <a
            className='text-dark h5 mx-2'
            href={currentAuthor.socialMedia[key]}
            key={key}
          >
            {icon}
          </a>
        );
      }
    }
    return (
      <div className='mt-4'>
        {author_social_media}
        <a className='text-dark h5 ms-2' href={`mailto:${currentAuthor.email}`}>
          <MdAlternateEmail />
        </a>
      </div>
    );
  };

  const AuthorCategory = () => {
    if (category.length === 0) {
      return <small> no category</small>;
    }
    let author_category = [];
    category.forEach((cty, index) => {
      author_category.push(
        <Link to={`/category/${cty.slug}`} key={cty.id}>
          {cty.title}
        </Link>
      );
      if (index !== category.length - 1) {
        author_category.push(', ');
      }
    });
    return <>{author_category}</>;
  };

  const AuthorDetailsSection = () => {
    return (
      <>
        <div className='row justify-content-center align-items-center mb-5 pb-5'>
          <div className='col-md-5 my-3 text-center'>
            <img
              src={currentAuthor.image}
              alt={full_name()}
              width={250}
              height={250}
              className='img-fluid rounded-circle'
            />
          </div>
          <div className='col-md-7 my-3'>
            <div className='author-details-section'>
              <small className='special-small-title'>
                {currentAuthor.username}
              </small>
              <h1 className='h2 mb-3'> {full_name()} </h1>
              <p className='small-info'>{currentAuthor.short_info}</p>
              <p className='text-muted'>{currentAuthor.info}</p>
              <p className='mb-1'>age: {currentAuthor.age}</p>
              <p className='mb-1'>
                Category: <AuthorCategory />
              </p>
              <p className='mb-1'>
                Languages:{' '}
                {currentAuthor.language.length > 0 ? (
                  currentAuthor.language.join(', ')
                ) : (
                  <small>no languages</small>
                )}
              </p>
              <SocialMedia />
            </div>
          </div>
        </div>
        <SectionTitle subtitle='shop online' title='author books' />
        <div className='row mt-4 justify-content-center align-items-center align-items-stretch'>
          <AuthorBookList />
        </div>
      </>
    );
  };

  const RenderMessage = () => {
    if (loading) {
      return <Spinner />;
    }
    if (currentAuthor) {
      return <AuthorDetailsSection />;
    } else {
      return <Alert> no author found </Alert>;
    }
  };

  return (
    <>
      <Banner
        title={currentAuthor ? full_name() : 'Author Details'}
        subtitle='author'
      />

      <section className='my-5'>
        <div className='container'>
          <RenderMessage />
        </div>
      </section>
    </>
  );
}

export default AuthorDetails;
