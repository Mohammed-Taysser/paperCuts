import React, { useEffect, useState } from 'react';
import { RowOfPlaceholderCard } from '../../components/bootstrap/Placeholder';
import { getAllAuthors } from '../../api/authors';
import SingleAuthor from '../../components/single/SingleAuthor';
import usePageTitle from '../../hooks/usePageTitle';
import Alert from '../../components/bootstrap/Alert';
import WithBanner from '../../layout/WithBanner';

function Authors() {
  usePageTitle('Authors');
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(false);

  useEffect(() => {
    get_author_api();
  }, []);

  const get_author_api = async () => {
    await getAllAuthors()
      .then((response) => {
        setAuthors(response.data);
      })
      .catch(() => {
        setLoadingError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const AuthorsList = () => {
    let authors_list = authors.map((author) => (
      <SingleAuthor key={author._id} author={author} />
    ));
    return (
      <div className='row justify-content-center align-items-center'>
        {authors_list}
      </div>
    );
  };

  const RenderAuthors = () => {
    if (loading) {
      return <RowOfPlaceholderCard num={8} />;
    } else if (loadingError) {
      return <Alert> Error While Loading Author </Alert>;
    } else if (authors && authors.length > 0) {
      return <AuthorsList />;
    } else {
      return <Alert> no author found </Alert>;
    }
  };

  return (
    <WithBanner title='authors' subtitle='info'>
      <section className='my-5 py-5'>
        <div className='container'>
          <RenderAuthors />
        </div>
      </section>
    </WithBanner>
  );
}

export default Authors;
