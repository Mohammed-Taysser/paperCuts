import react, { useState } from 'react';
import { get_reviews_by_id, ReviewAPI } from '../api/Localhost';
import Alert from './bootstrap/Alert';
import Spinner from './bootstrap/Spinner';
import LeaveReview from './LeaveReview';
import { human_date, Stars } from './ManipulateData';
import { MdDeleteOutline } from 'react-icons/md';

function TabAndNav(props) {
  const { currentBook, reviews_ref, setReviewsLength } = props;
  const [reviews, setReviews] = useState(null);
  const [loading, setLoading] = useState(false);

  const api_get_reviews = async () => {
    if (reviews === null) {
      setLoading(true);
      await ReviewAPI.get(`?bookId=${currentBook.id}`)
        .then((response) => {
          setReviews(response.data);
          setReviewsLength(response.data.length);
        })
        .catch((error) => {
          let temp_reviews = get_reviews_by_id(currentBook.id);
          if (temp_reviews) {
            setReviews(temp_reviews);
            setReviewsLength(temp_reviews.length);
          }
        })
        .finally(() => {
          setLoading(false);
          reviews_ref.current.click();
        });
    }
  };

  const Navs = () => {
    return (
      <ul
        className='nav nav-pills justify-content-center'
        id='additional-details-tabs'
        role='tablist'
      >
        <li className='nav-item' role='presentation'>
          <button
            className='nav-link active'
            id='description-tap'
            data-bs-toggle='pill'
            data-bs-target='#description-container'
            type='button'
            role='tab'
            aria-controls='description-container'
            aria-selected='true'
          >
            Description
          </button>
        </li>

        <li className='nav-item' role='presentation'>
          <button
            className='nav-link'
            id='additional-info-tap'
            data-bs-toggle='pill'
            data-bs-target='#additional-info-container'
            type='button'
            role='tab'
            aria-controls='additional-info-container'
            aria-selected='true'
          >
            Additional Information
          </button>
        </li>
        <li className='nav-item' role='presentation'>
          <button
            className='nav-link'
            id='reviews-tap'
            data-bs-toggle='pill'
            data-bs-target='#reviews-container'
            type='button'
            role='tab'
            aria-controls='reviews-container'
            aria-selected='true'
            ref={reviews_ref}
            onClick={api_get_reviews}
          >
            Reviews
          </button>
        </li>
      </ul>
    );
  };

  const ReviewsTap = () => {
    const RenderReviews = () => {
      if (reviews) {
        if (reviews.length > 0) {
          const reviews_container = reviews.map((review, index) => {
            return (
              <div className='reviews-section mt-5' key={index}>
                <div className='d-md-flex align-items-center'>
                  <img
                    src={review.image}
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
                        <Stars stars_length={review.stars} />
                      </div>
                    </div>
                    <p className='mb-0 mt-2 text-muted'>{review.info}</p>
                  </div>
                </div>
              </div>
            );
          });
          return <> {reviews_container} </>;
        } else {
          return <Alert> be the first to comment</Alert>;
        }
      }
      return <Alert color='warning'> no reviews found </Alert>;
    };

    return (
      <>
        <RenderReviews />
        <LeaveReview currentBook={currentBook} />
      </>
    );
  };

  const TableTap = () => {
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
        info: `${currentBook.pdfSize} MB`,
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

  const NavsContent = () => {
    if (loading) {
      return (
        <div className='mt-3'>
          <Spinner />
        </div>
      );
    }

    return (
      <div className='tab-content' id='additional-details-tabsContent'>
        <div
          className='tab-pane fade active show'
          id='description-container'
          role='tabpanel'
          aria-labelledby='description-tap'
        >
          <div className='row justify-content-center'>
            <div className='col-md-10'>
              <div className='content p-1 mt-3'>
                <p className='text-muted m-0'>{currentBook.extraInfo}</p>
              </div>
            </div>
          </div>
        </div>
        <div
          className='tab-pane fade'
          id='additional-info-container'
          role='tabpanel'
          aria-labelledby='additional-info-tap'
        >
          <div className='row justify-content-center'>
            <div className='col-md-10'>
              <div className='content p-1 mt-3'>
                <TableTap />
              </div>
            </div>
          </div>
        </div>
        <div
          className='tab-pane fade'
          id='reviews-container'
          role='tabpanel'
          aria-labelledby='reviews-tap'
        >
          <div className='row justify-content-center'>
            <div className='col-md-10'>
              <div className='content p-1 mt-3'>
                <ReviewsTap />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className='additional-details my-5'>
      <Navs />
      <NavsContent />
    </div>
  );
}

TabAndNav.defaultProps = {
  reviews_ref: react.createRef(),
};

export default TabAndNav;
