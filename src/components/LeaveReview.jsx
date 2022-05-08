import React, { useState } from 'react';
import StarRating from './StarRate';
import { ReviewAPI } from '../api/Localhost';
import Spinner from './bootstrap/Spinner';
import Alert from './bootstrap/Alert';

function LeaveReview(props) {
  const { userData, currentBook } = props;
  const [loading, setLoading] = useState(false);
  const [emptyComment, setEmptyComment] = useState(false);
  const [message, setMessage] = useState(null);
  const [formData, setFormData] = useState({
    name: `${userData.firstName} ${userData.lastName}`,
    email: userData.email,
    info: '',
    avatar: userData.avatar,
    stars: 1,
  });

  const api_set_review = async () => {
    setLoading(true);

    let review_data = {
      ...formData,
      date: new Date(),
      username: userData.username,
      bookId: currentBook.id,
      userId: userData.id,
    };

    await ReviewAPI.post('/', review_data)
      .then((response) => {
        set_message_by_type('success');
      })
      .catch((error) => {
        console.log(error);
        set_message_by_type('error');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const set_message_by_type = (type, messageStr) => {
    let message_alert = null;
    switch (type) {
      case 'error':
        message_alert = (
          <Alert color='danger'>
            {messageStr ? messageStr : 'error: something goes wrong'}
          </Alert>
        );
        break;
      case 'success':
        message_alert = (
          <Alert color='success'>
            {messageStr ? messageStr : 'success: your comment published'}
          </Alert>
        );
        break;
      default:
        message_alert = (
          <Alert color='warning'>
            {messageStr ? messageStr : 'unknown event'}
          </Alert>
        );
        break;
    }
    setMessage(message_alert);
  };

  const onInputChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const onFormSubmit = (evt) => {
    evt.preventDefault();
    if (formData['info'] === '') {
      setEmptyComment(true);
    } else {
      api_set_review();
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className='row justify-content-center mt-5'>
      <div className='col-md-8'>
        {message ? message : null}
        <div className='let-comments'>
          <div className='d-flex justify-content-between'>
            <h2 className='my-3'>Add a review</h2>
            <div className='text-warning'>
              <StarRating
                onClick={(num) => setFormData({ ...formData, stars: num })}
              />
            </div>
          </div>
          <form
            onSubmit={onFormSubmit}
            noValidate
            className={`${
              emptyComment ? 'was-validated' : ''
            } needs-validation`}
          >
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
                onChange={onInputChange}
                value={formData['info']}
                name='info'
                required
                placeholder='Comment'
              ></textarea>
            </div>
            <button type='submit' className='btn btn-aurora mt-4'>
              Save Review
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LeaveReview;
