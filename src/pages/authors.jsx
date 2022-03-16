import React, { useEffect, useState } from 'react';
import SingleAuthor from '../components/single/SingleAuthor';
import Banner from '../components/Banner';
import Spinner from '../components/bootstrap/Spinner';
import { AuthorsAPI, AUTHORS } from '../api/Localhost';

function Authors() {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    get_author_api();
  }, []);

  const get_author_api = () => {
    AuthorsAPI.get(`/`)
      .then((response) => {
        setAuthors(response.data);
      })
      .catch((err) => {
        setAuthors(AUTHORS);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const AuthorsList = () => {
    if (authors.length > 0) {
      let authors_list = authors.map((author) => (
        <SingleAuthor key={author.id} author={author} />
      ));
      return (
        <div className='row justify-content-center align-items-center'>
          {authors_list}
        </div>
      );
    }
    return <> no author found </>;
  };

  const RenderMessage = () => {
    if (loading) {
      return <Spinner />;
    } else {
      return <AuthorsList />;
    }
  };

  return (
    <>
      <Banner title='authors' subtitle='info' />
      <section className='my-5 py-5'>
        <div className='container'>
          <RenderMessage />
        </div>
      </section>
    </>
  );
}

export default Authors;
