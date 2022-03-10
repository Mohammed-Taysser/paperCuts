import React from 'react';
import SingleBook from '../SingleBook';
import Alert from '../bootstrap-component/Alert';
import SectionTitle from '../SectionTitle';

function RelatedBooks(props) {
  const { books } = props;
  const books_list = () => {
    if (books.length > 0) {
      return books.map((book, index) => {
        return <SingleBook book={book} key={index} />;
      });
    }
    return <Alert>no available books found</Alert>;
  };
  return (
    <section className='related-books my-5 pt-4'>
      <div className='container'>
        <SectionTitle title='related products' subtitle='you may like' />
        <div className='row justify-content-center'>{books_list()}</div>
      </div>
    </section>
  );
}

export default RelatedBooks;
