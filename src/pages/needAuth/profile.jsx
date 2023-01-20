import React, { useLayoutEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import validator from 'validator/validator';
import {
	changeAuthorPassword,
	deleteAuthor,
	getAuthor,
	updateAuthorAvatar,
	updateAuthorSetting,
} from '../../api/authors.api';
import {
	getTypeOf,
	isEqualArray,
	isEqualObject,
} from '../../components/ManipulateData';
import ProfileCards from '../../components/profile/profileCards';
import usePageTitle from '../../hooks/usePageTitle';
import { logout, refreshUserInfo } from '../../redux/features/auth.slice';

function Profile() {
	usePageTitle('Profile');
	const dispatch = useDispatch();
	const navigate_to = useNavigate();
	const closeDeleteAccountModalBtn = useRef(null);
	const { user } = useSelector((state) => state['auth']);
	const [isSaved, setIsSaved] = useState({});
	const [isLoading, setIsLoading] = useState({ author: true });
	const [currentAuthor, setCurrentAuthor] = useState(null);
	const [formData, setFormData] = useState({});
	const [loadingError, setLoadingError] = useState({});
	const [authorConfirmMessage] = useState(`paperCuts/${user.username}`);

	useLayoutEffect(() => {
		apiGetAuthor();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const apiGetAuthor = async () => {
		await getAuthor('username', user.username)
			.then((response) => {
				setCurrentAuthor(response.data);
				setFormData(response.data);
			})
			.catch((error) => {
				setLoadingError((err) => ({ ...err, username: error }));
			})
			.finally(() => {
				setIsLoading((load) => ({ ...load, author: false }));
			});
	};

	const apiChangeAuthorSetting = (setting, key) => {
		setIsLoading({ ...isLoading, [key]: true });
		setLoadingError((err) => ({ ...err, [key]: null }));

		updateAuthorSetting(setting)
			.then((response) => {
				setIsSaved({ ...isSaved, [key]: true });
				setCurrentAuthor(response.data.author);
				dispatch(refreshUserInfo({ token: response.data.token }));
			})
			.catch((error) => {
				setLoadingError((err) => ({ ...err, [key]: error.message }));
			})
			.finally(() => {
				setIsLoading({ ...isLoading, [key]: false });
			});
	};

	const updateSettingByKey = (key) => {
		if (isSaved[key] === true) {
			setIsSaved({ ...isSaved, [key]: false });
		}
		// array  change check
		if (getTypeOf(formData[key]) === 'Array') {
			if (!isEqualArray(formData[key], currentAuthor[key])) {
				apiChangeAuthorSetting({ [key]: formData[key] }, key);
			} else {
				setLoadingError((error) => ({ ...error, [key]: 'no change' }));
			}
		} else if (getTypeOf(formData[key]) === 'Object') {
			// object  change check
			if (!isEqualObject(formData[key], currentAuthor[key])) {
				apiChangeAuthorSetting({ [key]: formData[key] }, key);
			} else {
				setLoadingError((error) => ({ ...error, [key]: 'no change' }));
			}
		} else if (getTypeOf(formData[key]) === 'String') {
			// string  change check
			if (formData[key] !== currentAuthor[key]) {
				apiChangeAuthorSetting({ [key]: formData[key] }, key);
			} else {
				setLoadingError((error) => ({ ...error, [key]: 'no change' }));
			}
		}
	};

	const onDoubleInputSaveBtnClick = (field1, field2, key) => {
		if (
			formData[field1] !== currentAuthor[field1] &&
			formData[field2] !== currentAuthor[field2]
		) {
			apiChangeAuthorSetting(
				{ [field1]: formData[field1], [field2]: formData[field2] },
				key
			);
		} else if (formData[field1] !== currentAuthor[field1]) {
			apiChangeAuthorSetting({ [field1]: formData[field1] }, key);
		} else if (formData[field2] !== currentAuthor[field2]) {
			apiChangeAuthorSetting({ [field2]: formData[field2] }, key);
		} else {
			setLoadingError((error) => ({ ...error, [key]: 'no change' }));
			setIsSaved({ ...isSaved, [key]: false });
		}
	};

	const onSingleInputSave = async (key, condition = true) => {
		if (condition) {
			if (isSaved[key] === true) {
				// to prevent multiple un needed render
				setLoadingError((error) => ({ ...error, [key]: 'no change' }));
				setIsSaved({ ...isSaved, [key]: false });
			}

			if (formData[key] !== currentAuthor[key]) {
				setIsLoading((load) => ({ ...load, [key]: true }));
				await getAuthor(key, formData[key])
					.then((response) => {
						if (response.data) {
							setLoadingError((error) => ({
								...error,
								[key]: `${key} already exist`,
							}));
						} else {
							updateSettingByKey(key);
						}
					})
					.catch((error) => {
						setLoadingError((err) => ({ ...err, [key]: error.message }));
					})
					.finally(() => {
						setIsLoading((load) => ({ ...load, [key]: false }));
					});
			} else {
				setLoadingError((error) => ({ ...error, [key]: 'no change' }));
			}
		} else {
			setLoadingError((error) => ({
				...error,
				[key]: `please provide valid ${key}`,
			}));
		}
	};

	const onSocialMediaInputChange = (evt) => {
		let socialMedia = {
			...formData['socialMedia'],
			[evt.target.name]: evt.target.value,
		};
		setFormData((form_data) => ({
			...form_data,
			socialMedia,
		}));
	};

	const onSocialMediaSave = () => {
		let errorsAsArray = [],
			mediaTitles = ['facebook', 'twitter', 'telegram', 'instagram'];

		mediaTitles.forEach((key) => {
			if (formData['socialMedia'] && formData['socialMedia'][key]) {
				if (!validator.isURL(formData['socialMedia'][key])) {
					errorsAsArray.push(key);
				}
			}
		});

		if (errorsAsArray.length === 0) {
			updateSettingByKey('socialMedia');
		} else {
			setLoadingError((error) => ({
				...error,
				socialMedia: 'please provide valid url',
			}));
		}
	};

	const onDeleteUsernameConfirm = () => {
		if (formData['deleteAccount'] === authorConfirmMessage) {
			setIsLoading((load) => ({ ...load, deleteAccount: true }));

			deleteAuthor(user._id)
				.then(() => {
					closeDeleteAccountModalBtn.current.click();
					dispatch(logout());
					setTimeout(() => {
						navigate_to('/');
					}, 3000);
				})
				.catch((error) => {
					setLoadingError((err) => ({ ...err, deleteAccount: error.message }));
				})
				.finally(() => {
					setIsLoading((load) => ({ ...load, deleteAccount: false }));
				});
		} else {
			setLoadingError((err) => ({
				...err,
				deleteAccount: `Please type ${authorConfirmMessage} to confirm.`,
			}));
		}
	};

	const onAvatarSave = async () => {
		setIsSaved({ ...isSaved, avatar: false });

		if (typeof formData['avatar'] !== 'string') {
			setLoadingError((error) => ({ ...error, avatar: null }));
			setIsLoading((load) => ({ ...load, avatar: true }));

			const avatarFormData = new FormData();
			avatarFormData.append('avatar', formData['avatar']);
			// get the old avatar id to remove it from cloudinary
			// example: https://res.cloudinary.com/mohammed-taysser/image/upload/h_500,w_500/v1654621341/paperCuts/authors/avatar/vp2qhbrlozfdampgobvt.jpg
			// will be `vp2qhbrlozfdampgobvt`
			let user_avatar = user.avatar.split('/');
			if (user_avatar.length > 10) {
				avatarFormData.append('oldAvatarId', user_avatar[11].split('.')[0]);
			}

			await updateAuthorAvatar(avatarFormData)
				.then((response) => {
					setIsSaved({ ...isSaved, avatar: true });
					setCurrentAuthor(response.data.author);
					setFormData(response.data.author);
					dispatch(refreshUserInfo({ token: response.data.token }));
				})
				.catch((error) => {
					setLoadingError((err) => ({ ...err, avatar: error.message }));
				})
				.finally(() => {
					setIsLoading((load) => ({ ...load, avatar: false }));
				});
		} else {
			setLoadingError((err) => ({ ...err, avatar: 'no avatar chosen' }));
		}
	};

	const onPasswordSave = () => {
		setIsSaved({ ...isSaved, password: false });
		if (formData['currentPassword'] && formData['newPassword']) {
			if (
				validator.isStrongPassword(formData['currentPassword']) &&
				validator.isStrongPassword(formData['newPassword'])
			) {
				if (formData['currentPassword'] !== formData['newPassword']) {
					setLoadingError((err) => ({
						...err,
						password: null,
					}));
					changeAuthorPassword(
						formData['currentPassword'],
						formData['newPassword']
					)
						.then((response) => {
							setIsSaved({ ...isSaved, password: true });
							setCurrentAuthor(response.data.author);
							dispatch(refreshUserInfo({ token: response.data.token }));
						})
						.catch((error) => {
							setLoadingError((err) => ({ ...err, password: error.message }));
						})
						.finally(() => {
							setIsLoading((load) => ({ ...load, password: false }));
						});
				} else {
					setLoadingError((err) => ({
						...err,
						password: "password shouldn't match",
					}));
				}
			} else {
				setLoadingError((err) => ({ ...err, password: 'week password' }));
			}
		} else {
			setLoadingError((err) => ({ ...err, password: 'no password entered' }));
		}
	};

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
								loadingError={loadingError}
								isLoading={isLoading}
								isSaved={isSaved}
								formData={formData}
								setFormData={setFormData}
								currentAuthor={currentAuthor}
								onDoubleInputSaveBtnClick={onDoubleInputSaveBtnClick}
								onSocialMediaSave={onSocialMediaSave}
								onSingleInputSave={onSingleInputSave}
								authorConfirmMessage={authorConfirmMessage}
								updateSettingByKey={updateSettingByKey}
								onSocialMediaInputChange={onSocialMediaInputChange}
								closeDeleteAccountModalBtn={closeDeleteAccountModalBtn}
								onDeleteUsernameConfirm={onDeleteUsernameConfirm}
								onAvatarSave={onAvatarSave}
								onPasswordSave={onPasswordSave}
							/>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}

export default Profile;
