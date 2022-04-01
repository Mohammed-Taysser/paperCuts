import React, { useEffect, useState } from 'react';
import { BOOKS, BooksAPI } from '../../api/Localhost';
import { RowOfPlaceholderCard } from '../../components/bootstrap/Placeholder';
import { useSearchParams } from 'react-router-dom';
import { SelectField } from '../../components/bootstrap/Form';
import SingleBook from '../../components/single/SingleBook';
import RightSidebar from '../../layout/RightSidebar';
import FilterForm from '../../components/FilterForm';
import Alert from '../../components/bootstrap/Alert';
import usePageTitle from '../../hooks/usePageTitle';

function Books() {
  usePageTitle('Books');
  const [books, setBooks] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [sortType, setSortType] = useState('');

  useEffect(() => {
    api_get_books();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const api_get_books = async () => {
    await BooksAPI.get(`?${modifiedSearchParams()}`)
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        setBooks(BOOKS);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const modifiedSearchParams = () => {
    return searchParams
      .toString()
      .replace('title', 'title_like')
      .replace('author', 'author.name_like')
      .replace('endPrice', 'price_lte')
      .replace('startPrice', 'price_gte');
  };

  const SelectSortType = () => {
    const SELECT_SORT_TYPES = [
      {
        label: 'choose sort type',
        value: '',
      },
      {
        label: 'sort by latest',
        value: 'date',
      },
      {
        label: 'sort by average rating',
        value: 'stars',
      },
      {
        label: 'sort by price low to height',
        value: 'price',
      },
      {
        label: 'sort by price height to low',
        value: 'price-desc',
      },
    ];
    return (
      <div className=''>
        <SelectField
          className='w-auto'
          value={sortType}
          name='sort'
          onChange={onSortSelectChange}
          options={SELECT_SORT_TYPES}
        />
      </div>
    );
  };

  const onSortSelectChange = (evt) => {
    let new_book = [...books],
      sort_value = evt.target.value;

    switch (sort_value) {
      case 'price':
        new_book.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        new_book.sort((a, b) => b.price - a.price);
        break;
      case 'stars':
        new_book.sort((a, b) => b.stars - a.stars);
        break;
      case 'date':
      default:
        new_book.sort((a, b) => {
          let a_date = new Date(a.publishedAt),
            b_date = new Date(b.publishedAt);
          return a_date.getTime() - b_date.getTime();
        });
        break;
    }

    setSortType(sort_value);
    setBooks([...new_book]);
  };

  const BookList = () => {
    if (books.length > 0) {
      let book_list = books.map((book) => {
        return <SingleBook book={book} key={book.id} />;
      });

      return (
        <div className='row justify-content-center align-items-stretch'>
          {book_list}
        </div>
      );
    }
    return <Alert>No Books Found try another search params</Alert>;
  };

  const RenderBooks = () => {
    return loading ? <RowOfPlaceholderCard num={8} /> : <BookList />;
  };

  return (
    <RightSidebar title='shop list' subtitle='products'>
      <FilterForm
        onSearchParamsChange={setSearchParams}
        searchParams={searchParams}
      />
      <div className='filter-results d-md-flex justify-content-between align-items-center mb-4'>
        <span className='text-muted'>
          Showing <span className='text-aurora'> {books.length} </span>
          results
        </span>
        <SelectSortType />
      </div>
      <RenderBooks />
    </RightSidebar>
  );
}

export default Books;
