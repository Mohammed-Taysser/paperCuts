import React, { useState, useContext, useEffect } from 'react';
import StarRating from './StarRate';
import { Context as AuthContext } from '../context/auth';
import { ReviewAPI } from '../api/Localhost';
import Spinner from './bootstrap/Spinner';

function LeaveReview(props) {
  const auth_context = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [emptyComment, setEmptyComment] = useState(false);
  const [saveData, setSaveData] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    info: '',
    image:
      'https://cdn.jsdelivr.net/gh/Mohammed-Taysser/rakm1@master/paperCuts/authors/img/avatar-2.png',
    stars: 1,
  });

  useEffect(() => {
    init_user_auth();
  }, []);

  const api_set_review = async () => {
    setLoading(true);

    let review_data = {
      ...formData,
      date: new Date(),
      bookId: props.currentBook.id,
    };
    if (saveData) {
      localStorage.setItem(
        'reviewData',
        JSON.stringify({
          name: formData.name,
          email: formData.email,
        })
      );
    }

    await ReviewAPI.post('/', review_data)
      .then((response) => {
        // console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const init_user_auth = () => {
    if (auth_context.isAuth) {
      setFormData({
        ...formData,
        name: `${auth_context.userData.firstName} ${auth_context.userData.lastName}`,
        email: auth_context.userData.email,
        image: auth_context.userData.image,
      });
    }
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
        <div className='let-comments'>
          <div className='d-flex justify-content-between'>
            <h2 className='mb-3'>Add a review</h2>
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
            {!auth_context.isAuth && (
              <>
                <div className='mb-3'>
                  <label
                    htmlFor='comment-name-id'
                    className='form-label d-none'
                  >
                    name
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    id='comment-name-id'
                    placeholder='name'
                    name='name'
                    required
                    onChange={onInputChange}
                    value={formData['name']}
                  />
                </div>
                <div className='mb-3'>
                  <label
                    htmlFor='comment-email-id'
                    className='form-label d-none'
                  >
                    Email address
                  </label>
                  <input
                    type='email'
                    className='form-control'
                    id='comment-email-id'
                    placeholder='Email'
                    required
                    name='email'
                    onChange={onInputChange}
                    value={formData['email']}
                  />
                </div>
              </>
            )}
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
            {!auth_context.isAuth && (
              <div className='form-check form-switch'>
                <input
                  className='form-check-input'
                  type='checkbox'
                  role='switch'
                  id='save-data-id'
                  required
                  name='saveData'
                  onChange={(evt) => setSaveData(evt.target.checked)}
                  checked={saveData}
                />
                <label
                  className='form-check-label text-muted small'
                  htmlFor='save-data-id'
                >
                  Save my name, email for next time I comment.
                </label>
              </div>
            )}
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
