import react from 'react';
import Alert from '../bootstrap-component/Alert';
import { capitalize, human_date, Stars } from '../ManipulateData';
import StarRating from '../StarRate';

function TabAndNav(props) {
  const { currentBook, reviews, reviews_ref } = props;

  const additional_information_table = () => {
    const ROWS = [
      {
        label: 'language',
        info: currentBook.language,
      },
      {
        label: 'pages',
        info: currentBook.pages,
      },
      {
        label: 'pdf Size',
        info: currentBook.pdfSize,
      },
      {
        label: 'published date',
        info: currentBook.publishedAt,
      },
      {
        label: 'types',
        info: currentBook.types.toString(),
      },
    ];
    return (
      <div className='table-responsive'>
        <table className='table table-bordered'>
          <tbody>
            {ROWS.map((row, index) => {
              return (
                <tr key={index}>
                  <th scope='row'>{row.label}</th>
                  <td>{row.info}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  const leave_review_form = () => {
    return (
      <div className='row justify-content-center mt-5'>
        <div className='col-md-8'>
          <div className='let-comments'>
            <div className='d-flex justify-content-between'>
              <h2 className='mb-3'>Add a review</h2>
              <div className='text-warning'>
                <StarRating />
              </div>
            </div>
            <form action=''>
              <div className='mb-3'>
                <label
                  htmlFor='comment-username-id'
                  className='form-label d-none'
                >
                  username
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='comment-username-id'
                  placeholder='Username'
                />
              </div>
              <div className='mb-3'>
                <label htmlFor='comment-email-id' className='form-label d-none'>
                  Email address
                </label>
                <input
                  type='email'
                  className='form-control'
                  id='comment-email-id'
                  placeholder='Email'
                />
              </div>
              <div className='mb-3'>
                <label
                  htmlFor='comment-text-area-id'
                  className='form-label d-none'
                >
                  Comment
                </label>
                <textarea
                  className='form-control'
                  id='comment-text-area-id'
                  rows={3}
                  placeholder='Comment'
                ></textarea>
              </div>
              <div className='form-check form-switch'>
                <input
                  className='form-check-input'
                  type='checkbox'
                  role='switch'
                  id='save-data-id'
                />
                <label
                  className='form-check-label text-muted small'
                  htmlFor='save-data-id'
                >
                  Save my name, email for next time I comment.
                </label>
              </div>
              <button type='submit' className='btn btn-aurora mt-4'>
                Save Review
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  };

  const additional_information_reviews = () => {
    const reviews_container = reviews.map((review, index) => {
      return (
        <div className='reviews-section mt-5' key={index}>
          <div className='d-md-flex align-items-center'>
            <img
              src={review.img}
              alt={review.name}
              width='100'
              height='100'
              className='img-fluid rounded-circle border-aurora p-1'
            />
            <div className='w-100 mx-3'>
              <div className='d-md-flex justify-content-between'>
                <div className=''>
                  <h4 className='mb-1 d-inline-block text-aurora'>
                    {review.name}
                  </h4>
                  <small className='special-small-title text-muted mx-md-3 d-block d-md-inline-block'>
                    {human_date(review.date)}
                  </small>
                </div>
                <div className=''>
                  <Stars />
                </div>
              </div>
              <p className='mb-0 mt-2 text-muted'>{review.info}</p>
            </div>
          </div>
        </div>
      );
    });

    const render_message = () => {
      if (reviews.length > 0) {
        return reviews_container;
      }
      return <Alert color='warning'> no reviews found </Alert>;
    };

    return (
      <>
        {render_message()}
        {leave_review_form()}
      </>
    );
  };

  const book_details_nav = () => {
    return (
      <ul
        className='nav nav-pills justify-content-center'
        id='additional-details-tabs'
        role='tablist'
      >
        {BOOK_DETAILS_TABS.map((tap, index) => {
          return (
            <li className='nav-item' role='presentation' key={index}>
              <button
                className={`nav-link ${index === 0 ? 'active' : ''}`}
                id={`${tap.label.replace(' ', '-')}-tap`}
                data-bs-toggle='pill'
                data-bs-target={`#${tap.label.replace(' ', '-')}-container`}
                type='button'
                role='tab'
                aria-controls={`${tap.label.replace(' ', '-')}-container`}
                aria-selected='true'
                ref={tap.label === 'reviews' ? reviews_ref : null}
              >
                {capitalize(tap.label)}
              </button>
            </li>
          );
        })}
      </ul>
    );
  };

  const book_details_content = () => {
    return (
      <div className='tab-content' id='additional-details-tabsContent'>
        {BOOK_DETAILS_TABS.map((tap, index) => {
          return (
            <div
              className={`tab-pane fade ${index === 0 ? 'active show' : ''}`}
              id={`${tap.label.replace(' ', '-')}-container`}
              role='tabpanel'
              key={index}
              aria-labelledby={`${tap.label.replace(' ', '-')}-tap`}
            >
              <div className='row justify-content-center'>
                <div className='col-md-10'>
                  <div className='content p-1 mt-3'>{tap.children}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const BOOK_DETAILS_TABS = [
    {
      label: 'description',
      children: <p className='text-muted m-0'>{currentBook.info}</p>,
    },
    {
      label: 'additional information',
      children: additional_information_table(),
    },
    { label: 'reviews', children: additional_information_reviews() },
  ];

  return (
    <div className='additional-details my-5'>
      {book_details_nav()}
      {book_details_content()}
    </div>
  );
}

TabAndNav.defaultProps = {
  reviews: [],
  reviews_ref: react.createRef(),
};

export default TabAndNav;
