import React, { useState, useEffect } from 'react';
import { getCategoryBySlug } from '../../api/category';
import { getBookByCategory } from '../../api/books';
import { useParams } from 'react-router-dom';
import { RowOfPlaceholderCard } from '../../components/bootstrap/Placeholder';
import Alert from '../../components/bootstrap/Alert';
import usePageTitle from '../../hooks/usePageTitle';
import WithBanner from '../../layout/WithBanner';
import BookList from '../../components/standalone/BookList';

function CategoryDetails() {
  const [, setPageTitle] = usePageTitle('Category Details');
  const { slug } = useParams();
  const [currentCategory, setCurrentCategory] = useState(null);
  const [categoryBooks, setCategoryBooks] = useState([]);
  const [loading, setLoading] = useState({
    category: true,
    books: true,
  });
  const [loadingError, setLoadingError] = useState({
    category: null,
    books: null,
  });

  useEffect(() => {
    api_get_category();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const api_get_category = async () => {
    await getCategoryBySlug(slug)
      .then((response) => {
        onCategoryLoad(response.data);
      })
      .catch((error) => {
        setLoadingError((loadError) => ({
          ...loadError,
          category: error.message,
        }));
      })
      .finally(() => {
        setLoading((load) => ({ ...load, category: false }));
      });
  };

  const api_get_category_book = async () => {
    await getBookByCategory(slug)
      .then((response) => {
        setCategoryBooks(response.data);
      })
      .catch((error) => {
        setLoadingError((loadError) => ({
          ...loadError,
          books: error.message,
        }));
      })
      .finally(() => {
        setLoading((load) => ({ ...load, books: false }));
      });
  };

  const onCategoryLoad = (responseData) => {
    setCurrentCategory(responseData);
    setPageTitle(responseData.title);
    api_get_category_book();
  };

  const RenderCategoryBooks = () => {
    if (loading.books) {
      return <RowOfPlaceholderCard num={6} />;
    } else if (loadingError.books) {
      return <Alert>{loadingError.books}</Alert>;
    } else if (categoryBooks && categoryBooks.length > 0) {
      return <BookList books={categoryBooks} />;
    } else {
      return <Alert> no books found </Alert>;
    }
  };

  return (
    <WithBanner
      title={currentCategory ? currentCategory.title : 'category'}
      subtitle='shop list'
    >
      <section className='my-5 py-5'>
        <div className='container '>
          <RenderCategoryBooks />
        </div>
      </section>
    </WithBanner>
  );
}

export default CategoryDetails;
