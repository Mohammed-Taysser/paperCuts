import React, { useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthorsAPI } from '../../api/Localhost';
import { InputField } from '../bootstrap/Form';
import { Context as AuthContext } from '../../context/auth';
import Spinner from '../bootstrap/Spinner';
import 'bootstrap/js/src/modal';

function DeleteAccountCard(props) {
  const navigate_to = useNavigate();
  const auth_context = useContext(AuthContext);
  const close_modal_btn = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteUsernameConfirm, setDeleteUsernameConfirm] = useState('');

  const onDeleteUsernameConfirm = () => {
    if (
      deleteUsernameConfirm ===
      `paperCuts/${
        auth_context.userData.username
          ? auth_context.userData.username
          : auth_context.userData.id
      }`
    ) {
      setIsLoading(true);

      AuthorsAPI.delete(`/${auth_context.userData.id}`)
        .then((response) => {
          setIsLoading(false);
          close_modal_btn.current.click();
          auth_context.setIsAuth(false);
          auth_context.setUserData(null);
          localStorage.removeItem('auth');
          navigate_to('/');
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      <div className='col-6'>
        <button
          className='btn btn-outline-danger btn-sm px-3'
          data-bs-toggle='modal'
          data-bs-target='#confirm-delete-account'
        >
          Delete Personal Account
        </button>
      </div>
      <div
        className='modal fade'
        id='confirm-delete-account'
        data-bs-keyboard='false'
        tabIndex={-1}
        aria-labelledby='confirm-delete-account-label'
        aria-hidden='true'
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='confirm-delete-account-label'>
                Are you absolutely sure?
              </h5>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div className='modal-body'>
              <p>
                This action cannot be undone. This will permanently delete the
                <code className='mx-1 text-danger fw-bolder'>
                  paperCuts/
                  {auth_context.userData.username
                    ? auth_context.userData.username
                    : auth_context.userData.id}
                </code>
                author, book, comments, orders, wishlist and remove all
                collaborator associations. Please type
                <code className='mx-1 text-danger fw-bolder'>
                  paperCuts/
                  {auth_context.userData.username
                    ? auth_context.userData.username
                    : auth_context.userData.id}
                </code>
                to confirm.
              </p>
              <InputField
                outer='mt-3'
                className='form-control-sm'
                value={deleteUsernameConfirm}
                onChange={(evt) => {
                  setDeleteUsernameConfirm(evt.target.value);
                }}
              />
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-aurora btn-sm'
                data-bs-dismiss='modal'
                ref={close_modal_btn}
              >
                back
              </button>
              {isLoading ? (
                <Spinner />
              ) : (
                <button
                  type='button'
                  className='btn btn-danger btn-sm'
                  onClick={onDeleteUsernameConfirm}
                >
                  I Understand The Consequences, Delete my account
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DeleteAccountCard;
