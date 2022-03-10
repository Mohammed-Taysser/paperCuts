import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const INIT_PAGINATION = {
  first: null,
  prev: null,
  last: null,
  next: null,
};

function Pagination(props) {
  const { headerString } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const [paginationObject, setPaginationObject] = useState(INIT_PAGINATION);
  const [pageNumber, setPageNumber] = useState(searchParams.get('_page') || 1);

  useEffect(() => {
    onPaginationStringChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerString]);

  const onPaginationStringChange = () => {
    if (headerString) {
      let temp = headerString.split(',').map((item) => item.split(';'));
      let factor_data_params = {};
      temp.forEach((item) => {
        if (item.length > 1) {
          let get_page_number = new URLSearchParams(item[0].slice(2, -1));
          factor_data_params[item[1].slice(6, -1)] = parseInt(
            get_page_number.get('_page')
          );
        }
      });
      searchParams.set('_page', pageNumber.toString());
      setSearchParams(searchParams);
      setPaginationObject(factor_data_params);
    } else {
      setPaginationObject(INIT_PAGINATION);
    }
  };

  const onPageNumberChange = (num) => {
    setPageNumber(num);
    props.onPageNumberChange(num);
  };

  if (paginationObject === INIT_PAGINATION) {
    return <></>;
  }

  return (
    <nav className='mt-5' aria-label='Page navigation example'>
      <ul className='pagination justify-content-center'>
        {paginationObject.first !== pageNumber && paginationObject.first && (
          <li className='page-item'>
            <button
              className='page-link css-tooltip'
              data-tooltip='First Page'
              onClick={() => onPageNumberChange(paginationObject.first)}
            >
              &laquo;
            </button>
          </li>
        )}
        {paginationObject.prev && (
          <li className='page-item'>
            <button
              className='page-link'
              onClick={() => onPageNumberChange(paginationObject.prev)}
            >
              Previous
            </button>
          </li>
        )}
        {paginationObject.last && (
          <li className='page-item disabled'>
            <button className='page-link'>
              {pageNumber} of {paginationObject.last}
            </button>
          </li>
        )}
        {paginationObject.next && (
          <li className='page-item'>
            <button
              className='page-link'
              onClick={() => onPageNumberChange(paginationObject.next)}
            >
              Next
            </button>
          </li>
        )}
        {paginationObject.last !== pageNumber && paginationObject.last && (
          <li className='page-item'>
            <button
              className='page-link css-tooltip'
              data-tooltip='Last Page'
              onClick={() => onPageNumberChange(paginationObject.last)}
            >
              &raquo;
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

Pagination.defaultProps = {
  onPageNumberChange: (data) => console.log(data),
};

export default Pagination;
