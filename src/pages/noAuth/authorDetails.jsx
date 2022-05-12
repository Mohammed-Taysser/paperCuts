import React, { useEffect, useState } from 'react';
import {
  FaFacebookF, FaInstagram,
  FaTelegram, FaTwitter
} from 'react-icons/fa';
import { MdAlternateEmail } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import { AuthorsAPI, get_author_by_username } from '../../api/Localhost';
import Alert from '../../components/bootstrap/Alert';
import Spinner from '../../components/bootstrap/Spinner';
import GetBookByCategory from '../../components/GetBookByCategory';
import InlineCategoryTags from '../../components/InlineCategoryTags';
import Banner from '../../components/standalone/Banner';
import SectionTitle from '../../components/standalone/SectionTitle';
import usePageTitle from '../../hooks/usePageTitle';

function AuthorDetails() {
  const [, setPageTitle] = usePageTitle('Author Details');
  const { username } = useParams();
  const [currentAuthor, setCurrentAuthor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    get_author_api();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const get_author_api = () => {
    AuthorsAPI.get(`?username=${username}`)
      .then((response) => {
        if (response.data.length === 1) {
          setCurrentAuthor(response.data[0]);
          setPageTitle(
            response.data[0].firstName + ' ' + response.data[0].lastName
          );
        }
      })
      .catch((err) => {
        let temp_author = get_author_by_username(username);
        if (temp_author) {
          setCurrentAuthor(temp_author);
          setPageTitle(temp_author.firstName + ' ' + temp_author.lastName);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const full_name = () => {
    return `${currentAuthor.firstName} ${currentAuthor.lastName}`;
  };

  const SocialMedia = () => {
    let author_social_media = [];
    for (const key in currentAuthor.socialMedia) {
      if (Object.hasOwnProperty.call(currentAuthor.socialMedia, key)) {
        let icon = null;
        if (currentAuthor.socialMedia[key]) {
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
              target='_blank'
              rel='noreferrer'
            >
              {icon}
            </a>
          );
        }
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

  const AuthorDetailsSection = () => {
    return (
      <>
        <div className='row justify-content-center align-items-center mb-5 pb-5'>
          <div className='col-md-5 my-3 text-center'>
            <img
              src={currentAuthor.avatar}
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
              {currentAuthor.info && (
                <p className='text-muted'>{currentAuthor.info}</p>
              )}
              {currentAuthor.extraInfo && (
                <p className='small-info'>{currentAuthor.extraInfo}</p>
              )}
              <InlineCategoryTags category={currentAuthor.category} />
              <SocialMedia />
            </div>
          </div>
        </div>
        <SectionTitle subtitle='shop online' title='author books' />
        <div className='row mt-4 justify-content-center align-items-center align-items-stretch'>
          <GetBookByCategory getBy={currentAuthor.books} />
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