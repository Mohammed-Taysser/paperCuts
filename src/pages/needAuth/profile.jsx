import React, { useContext, useState } from 'react';
import { AuthorsAPI } from '../../api/Localhost';
import { InputField } from '../../components/bootstrap/Form';
import {
  isEqualArray,
  getTypeOf,
  isEqualObject,
} from '../../components/ManipulateData';
import { Context as AuthContext } from '../../context/auth';
import ProfileCards from '../../components/profileCards';
import FullName from '../../components/profileCards/FullNameCard';
import Username from '../../components/profileCards/UsernameCard';
import InfoCard from '../../components/profileCards/InfoCard';
import SocialMedia from '../../components/profileCards/SocialMediaCard';
import IdCard from '../../components/profileCards/IdCard';
import BooksCard from '../../components/profileCards/BooksCard';
import DeleteAccountCard from '../../components/profileCards/DeleteAccountCard';
import AvatarCard from '../../components/profileCards/AvatarCard';
import usePageTitle from '../../hooks/usePageTitle';
import CategoryTags from '../../components/CategoryTags';

function Profile() {
  usePageTitle('Profile');
  const auth_context = useContext(AuthContext);
  const [isSaved, setIsSaved] = useState({});
  const [isLoading, setIsLoading] = useState({});
  const [formData, setFormData] = useState(auth_context.userData);

  const api_change_user_setting = (setting, key) => {
    setIsLoading({ ...isLoading, [key]: true });

    AuthorsAPI.patch(`/${auth_context.userData.id}`, { ...setting })
      .then((response) => {
        setIsSaved({ ...isSaved, [key]: true });
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
        setIsLoading({ ...isLoading, [key]: false });
      });
  };

  const onInputChange = (evt) => {
    setFormData({
      ...formData,
      [evt.target.name]:
        evt.target.type === 'checkbox' ? evt.target.checked : evt.target.value,
    });
  };

  const updateSettingByKey = (key) => {
    // hide saved icon
    if (isSaved[key] === true) {
      setIsSaved({ ...isSaved, [key]: false });
    }
    // array check
    if (getTypeOf(formData[key]) === 'Array') {
      if (!isEqualArray(formData[key], auth_context.userData[key])) {
        api_change_user_setting({ [key]: formData[key] }, key);
      }
    } else if (getTypeOf(formData[key]) === 'Object') {
      // object check
      if (!isEqualObject(formData[key], auth_context.userData[key])) {
        api_change_user_setting({ [key]: formData[key] }, key);
      }
    } else if (getTypeOf(formData[key]) === 'String') {
      // string check
      if (formData[key] !== auth_context.userData[key]) {
        api_change_user_setting({ [key]: formData[key] }, key);
      }
    }
  };

  const onDoubleInputSaveBtnClick = (field1, field2, key) => {
    if (
      formData[field1] !== auth_context.userData[field1] &&
      formData[field2] !== auth_context.userData[field2]
    ) {
      api_change_user_setting(
        { [field1]: formData[field1], [field2]: formData[field2] },
        key
      );
    } else if (formData[field1] !== auth_context.userData[field1]) {
      api_change_user_setting({ [field1]: formData[field1] }, key);
    } else if (formData[field2] !== auth_context.userData[field2]) {
      api_change_user_setting({ [field2]: formData[field2] }, key);
    }
  };

  const onSocialMediaInputChange = (evt) => {
    let socialMedia = {
      ...formData.socialMedia,
      [evt.target.name]: evt.target.value,
    };
    setFormData({
      ...formData,
      socialMedia,
    });
  };

  const onPasswordSave = () => {
    if (formData.password.length > 8) {
      updateSettingByKey('password');
    }
  };

  const onEmailSave = async () => {
    if (isSaved['email'] === true) {
      setIsSaved({ ...isSaved, email: false });
    }
    if (formData.email !== auth_context.userData.email) {
      setIsLoading({ ...isLoading, email: true });
      await AuthorsAPI.get(`?email=${formData.email}`)
        .then((response) => {
          if (response.data.length === 0) {
            updateSettingByKey('email');
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setIsLoading({ ...isLoading, email: false });
        });
    }
  };

  const onUsernameSave = async () => {
    if (isSaved['username'] === true) {
      // to prevent multiple un needed render
      setIsSaved({ ...isSaved, username: false });
    }
    if (formData.username !== auth_context.userData.username) {
      setIsLoading({ ...isLoading, username: true });
      await AuthorsAPI.get(`?username=${formData.username}`)
        .then((response) => {
          if (response.data.length === 0) {
            updateSettingByKey('username');
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setIsLoading({ ...isLoading, username: false });
        });
    }
  };

  const onCategoryChange = (new_category) => {
    setFormData({ ...formData, category: new_category });
  };

  const onBooksChange = (books) => {
    setFormData({ ...formData, books: books });
  };

  const CARDS_DATA = [
    {
      label: 'your name',
      key: 'name',
      cardText: 'This is how readers know you.',
      footerText: 'Please use 48 characters at maximum.',
      onSaveClick: () => {
        onDoubleInputSaveBtnClick('firstName', 'lastName', 'name');
      },
      children: <FullName onInputChange={onInputChange} formData={formData} />,
    },
    {
      label: 'your username',
      key: 'username',
      cardText: 'This is your URL namespace within paperCuts.',
      footerText: 'Tip: use 16 characters at minimum.',
      onSaveClick: onUsernameSave,
      children: <Username onInputChange={onInputChange} formData={formData} />,
    },
    {
      label: 'your email',
      key: 'email',
      cardText:
        'Please enter the email address you want to use to log in with paperCuts',
      footerText: 'We will email you to verify the change.',
      onSaveClick: onEmailSave,
      children: (
        <InputField
          outer='col-4'
          className='form-control-sm'
          maxLength={48}
          placeholder='email address'
          value={formData['email']}
          name='email'
          onChange={onInputChange}
        />
      ),
    },
    {
      label: 'your password',
      key: 'password',
      cardText:
        'Please enter the password you want to use to log in with paperCuts.',
      footerText: 'Please use 8 characters at minimum.',
      onSaveClick: onPasswordSave,
      children: (
        <InputField
          outer='col-4'
          className='form-control-sm'
          minLength={8}
          placeholder='password'
          value={formData['password']}
          name='password'
          type='password'
          onChange={onInputChange}
        />
      ),
    },
    {
      label: 'your info',
      key: 'info',
      cardText: ' Tell us a little bit about yourself',
      footerText: 'say something about yourself',
      onSaveClick: () => {
        onDoubleInputSaveBtnClick('info', 'extraInfo', 'info');
      },
      children: <InfoCard onInputChange={onInputChange} formData={formData} />,
    },
    {
      label: 'your social Media',
      key: 'socialMedia',
      cardText: 'how to get you. write down your social media links',
      footerText: 'keep on touch with other',
      onSaveClick: () => {
        updateSettingByKey('socialMedia');
      },
      children: (
        <SocialMedia
          onSocialMediaInputChange={onSocialMediaInputChange}
          formData={formData}
        />
      ),
    },
    {
      label: 'your avatar',
      key: 'avatar',
      cardText: null,
      footerText: ' An avatar is optional but strongly recommended.',
      children: <AvatarCard auth_context={auth_context} />,
    },
    {
      label: 'your id',
      key: 'id',
      cardText: ' This is your user ID within paperCuts.',
      footerText: 'Used when interacting with the paperCuts API',
      children: <IdCard id={auth_context.userData.id} />,
    },
    {
      label: 'your category',
      key: 'category',
      cardText: 'This is your book specifications',
      footerText: 'differ between books',
      onSaveClick: () => {
        updateSettingByKey('category');
      },
      children: (
        <CategoryTags
          userCategory={auth_context.userData.category}
          onCategoryChange={onCategoryChange}
        />
      ),
    },
    {
      label: 'your books',
      key: 'books',
      cardText: 'This is your published books within paperCuts.',
      footerText: 'your publishing',
      onSaveClick: () => {
        updateSettingByKey('books');
      },
      children: (
        <BooksCard
          userBooks={auth_context.userData.books}
          onBooksChange={onBooksChange}
        />
      ),
    },
    {
      label: 'delete Personal account',
      cardText:
        'Permanently remove your Personal Account and all of its reversible, so please continue with caution.',
      footerText: 'This action cannot be undone.',
      children: <DeleteAccountCard userData={auth_context.userData} />,
      dangerBorder: true,
    },
  ];

  return (
    <>
      <section className='profile-page my-5'>
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-md-10 my-3'>
              <h1 className='h2 mb-5 special-header'>
                Personal Account Settings
              </h1>

              <ProfileCards
                CARDS_DATA={CARDS_DATA}
                isLoading={isLoading}
                isSaved={isSaved}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Profile;
