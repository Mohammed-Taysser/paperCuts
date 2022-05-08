import React, { useState, useRef } from 'react';
import ReactCrop, { centerCrop, makeAspectCrop } from 'react-image-crop';
import { AuthorsAPI } from '../../api/Localhost';
import Spinner from '../bootstrap/Spinner';
import 'react-image-crop/src/ReactCrop.scss';

function AvatarCropper(props) {
  const { auth_context } = props;
  const modalBtn = useRef(null);
  const [imgSrc, setImgSrc] = useState('');
  const [crop, setCrop] = useState(null);
  const [loading, setLoading] = useState(false);

  const api_set_user_avatar = async () => {
    setLoading(true);

    await AuthorsAPI.patch(`/${auth_context.userData.id}`, { avatar: imgSrc })
      .then((response) => {
        localStorage.setItem(
          'auth',
          JSON.stringify({ isAuth: true, userData: response.data })
        );
        auth_context.setUserData(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
        modalBtn.current.click();
      });
  };

  const onSelectFile = (evt) => {
    if (evt.target.files && evt.target.files.length > 0) {
      setCrop(null);
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setImgSrc(reader.result.toString() || '');
        modalBtn.current.click();
      });
      reader.readAsDataURL(evt.target.files[0]);
    }
  };

  const onImageLoad = (evt) => {
    const { width, height } = evt.currentTarget;
    setCrop(
      centerCrop(
        makeAspectCrop(
          {
            unit: '%',
            width: 50,
          },
          1,
          width,
          height
        ),
        width,
        height
      )
    );
  };

  const onSaveAvatarClick = () => {
    api_set_user_avatar();
  };

  const RenderModalButton = () => {
    if (loading) {
      return <Spinner />;
    } else {
      return (
        <>
          <button
            type='button'
            className='btn btn-outline-danger btn-sm'
            data-bs-dismiss='modal'
          >
            cancel
          </button>
          <button
            type='button'
            className='btn btn-aurora btn-sm'
            onClick={onSaveAvatarClick}
          >
            Save Avatar
          </button>
        </>
      );
    }
  };

  return (
    <>
      <div className='d-flex w-100 justify-content-between align-items-center'>
        <div className='card-text'>
          his is your avatar.Click on the avatar to upload a custom one from
          your files.
        </div>
        <div className='flex-shrink-0'>
          <input
            type='file'
            name='avatar'
            id='user-avatar'
            className='d-none'
            accept='image/*'
            onChange={onSelectFile}
          />
          <button
            className='d-none'
            data-bs-toggle='modal'
            data-bs-target='#avatar-cropper-modal'
            ref={modalBtn}
          >
            open avatar modal
          </button>
          <label htmlFor='user-avatar'>
            <img
              src={auth_context.userData.avatar}
              className='img-fluid rounded-circle cursor-pointer'
              width='80px'
              height='80px'
              alt={auth_context.userData.firstName}
            />
          </label>
        </div>
      </div>
      <div
        className='modal fade'
        id='avatar-cropper-modal'
        data-bs-backdrop='static'
        data-bs-keyboard='false'
        tabIndex={-1}
        aria-labelledby='avatar-cropper-modal-label'
        aria-hidden='true'
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='avatar-cropper-modal-label'>
                change your avatar
              </h5>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div className='modal-body'>
              <ReactCrop
                crop={crop}
                aspect={1}
                keepSelection={true}
                onChange={(_, percentCrop) => setCrop(percentCrop)}
              >
                <img
                  src={imgSrc}
                  className='img-fluid'
                  width='100%'
                  height='100%'
                  onLoad={onImageLoad}
                  alt={auth_context.userData.firstName}
                />
              </ReactCrop>
            </div>
            <div className='modal-footer'>
              <RenderModalButton />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default AvatarCropper;
