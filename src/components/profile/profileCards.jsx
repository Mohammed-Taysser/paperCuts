import React from 'react';
import { BsFacebook, BsInstagram, BsTelegram, BsTwitter } from 'react-icons/bs';
import { MdContentCopy } from 'react-icons/md';
import validator from 'validator/validator';
import { copyToClipboard, onImageNotLoad } from '../ManipulateData';
import Alert from '../bootstrap/Alert';
import { InputField, Textarea } from '../bootstrap/Form';
import Spinner, { LoadingButton } from '../bootstrap/Spinner';
import CategoryTags from './CategoryTags';
import Wrapper from './profileWrapper';

function profileCards(props) {
	const {
		loadingError,
		isLoading,
		isSaved,
		formData,
		setFormData,
		currentAuthor,
		onDoubleInputSaveBtnClick,
		onSocialMediaSave,
		onSingleInputSave,
		authorConfirmMessage,
		updateSettingByKey,
		onSocialMediaInputChange,
		closeDeleteAccountModalBtn,
		onDeleteUsernameConfirm,
		onAvatarSave,
		onPasswordSave,
	} = props;

	const onInputChange = (evt) => {
		setFormData({
			...formData,
			[evt.target.name]:
				evt.target.type === 'checkbox' ? evt.target.checked : evt.target.value,
		});
	};

	const RenderDeleteAccountModalBtn = () => {
		if (isLoading['deleteAccount']) {
			return <LoadingButton sm className="btn-sm" />;
		} else {
			return (
				<button
					type="button"
					className="btn btn-danger btn-sm"
					onClick={onDeleteUsernameConfirm}
				>
					I Understand The Consequences, Delete my account
				</button>
			);
		}
	};

	if (isLoading.author) {
		return <Spinner />;
	} else if (loadingError['author']) {
		return <Alert>{loadingError['author']}</Alert>;
	} else if (currentAuthor) {
		return (
			<>
				<Wrapper
					label="your name"
					cardText="This is how readers know you."
					footerText="Please use 48 characters at maximum."
					isSaved={isSaved['fullName']}
					isLoading={isLoading['fullName']}
					loadingError={loadingError['fullName']}
					onSaveClick={() => {
						onDoubleInputSaveBtnClick('firstName', 'lastName', 'fullName');
					}}
				>
					<InputField
						outer="col-4"
						className="form-control-sm"
						maxLength={48}
						value={formData['firstName']}
						name="firstName"
						placeholder="first name"
						onChange={onInputChange}
					/>
					<InputField
						outer="col-4"
						className="form-control-sm"
						maxLength={48}
						value={formData['lastName']}
						name="lastName"
						placeholder="last name"
						onChange={onInputChange}
					/>
				</Wrapper>
				<Wrapper
					label="your username"
					cardText="This is your URL namespace within paperCuts."
					footerText="Tip: use 16 characters at minimum."
					isSaved={isSaved['username']}
					isLoading={isLoading['username']}
					loadingError={loadingError['username']}
					onSaveClick={() =>
						onSingleInputSave(
							'username',
							validator.isSlug(formData['username'])
						)
					}
				>
					<div className="col-md-5">
						<div className="input-group custom-input-group input-group-sm">
							<span className="input-group-text" id="username-input">
								paperCuts.com/
							</span>
							<input
								className="form-control"
								type="text"
								placeholder="username"
								aria-label="username"
								aria-describedby="username-input"
								name="username"
								minLength={16}
								onChange={onInputChange}
								value={formData['username']}
							/>
						</div>
					</div>
				</Wrapper>
				<Wrapper
					label="your email"
					cardText="Please enter the email address you want to use to log in with paperCuts"
					footerText="We will email you to verify the change."
					isSaved={isSaved['email']}
					isLoading={isLoading['email']}
					loadingError={loadingError['email']}
					onSaveClick={() =>
						onSingleInputSave('email', validator.isEmail(formData['email']))
					}
				>
					<InputField
						outer="col-4"
						className="form-control-sm"
						maxLength={48}
						type='email'
						placeholder="email address"
						value={formData['email']}
						name="email"
						onChange={onInputChange}
					/>
				</Wrapper>
				<Wrapper
					label="your avatar"
					footerText=" An avatar is optional but strongly recommended."
					isSaved={isSaved['avatar']}
					isLoading={isLoading['avatar']}
					loadingError={loadingError['avatar']}
					onSaveClick={onAvatarSave}
				>
					<>
						<div className="d-flex w-100 justify-content-between align-items-center">
							<div className="card-text">
								<p className="mb-1">
									his is your avatar. Click on the avatar to upload a custom one
									from your files.
								</p>
								<p>then hit save to upload it.</p>
							</div>
							<div className="flex-shrink-0">
								<input
									type="file"
									name="avatar"
									id="user-avatar"
									className="d-none"
									onChange={(evt) => {
										setFormData({ ...formData, avatar: evt.target.files[0] });
									}}
									accept="image/*"
								/>
								<label htmlFor="user-avatar">
									<img
										src={currentAuthor.avatar}
										className="img-fluid rounded-circle cursor-pointer"
										width="80px"
										height="80px"
										alt={currentAuthor.firstName}
									/>
								</label>
							</div>
						</div>
						<div
							className="modal fade"
							id="avatar-cropper-modal"
							data-bs-backdrop="static"
							data-bs-keyboard="false"
							tabIndex={-1}
							aria-labelledby="avatar-cropper-modal-label"
							aria-hidden="true"
						>
							<div className="modal-dialog">
								<div className="modal-content">
									<div className="modal-header">
										<h5 className="modal-title" id="avatar-cropper-modal-label">
											change your avatar
										</h5>
										<button
											type="button"
											className="btn-close"
											data-bs-dismiss="modal"
											aria-label="Close"
										></button>
									</div>
									<div className="modal-body">
										<img
											src={currentAuthor.avatar}
											className="img-fluid"
											width="100%"
											height="100%"
											onError={onImageNotLoad}
											alt={currentAuthor.firstName}
										/>
									</div>
									<div className="modal-footer">
										<button
											type="button"
											className="btn btn-outline-danger btn-sm"
											data-bs-dismiss="modal"
										>
											cancel
										</button>
										<button type="button" className="btn btn-aurora btn-sm">
											Save Avatar
										</button>
									</div>
								</div>
							</div>
						</div>
					</>
				</Wrapper>
				<Wrapper
					label="your id"
					cardText=" This is your user ID within paperCuts."
					footerText="Used when interacting with the paperCuts API"
					noSave
				>
					<div className="col-md-5">
						<div className="input-group input-group-sm">
							<input
								className="form-control"
								type="text"
								placeholder="ID"
								aria-label="your id"
								disabled
								value={formData['_id']}
							/>
							<button
								className="btn btn-aurora css-tooltip"
								type="button"
								data-tooltip="Copy To Clipboard"
								onClick={() => {
									copyToClipboard(formData['_id']);
								}}
							>
								<MdContentCopy />
							</button>
						</div>
					</div>
				</Wrapper>
				<Wrapper
					label="your password"
					cardText="Please enter the password you want to use to log in with paperCuts."
					footerText="Please use 8 characters at minimum."
					isSaved={isSaved['password']}
					isLoading={isLoading['password']}
					loadingError={loadingError['password']}
					onSaveClick={onPasswordSave}
				>
					<InputField
						outer="col-4"
						className="form-control-sm"
						minLength={8}
						placeholder="Current Password"
						value={formData['currentPassword'] || ''}
						name="currentPassword"
						type="password"
						onChange={onInputChange}
					/>

					<InputField
						outer="col-4"
						className="form-control-sm"
						minLength={8}
						placeholder="New Password"
						value={formData['newPassword'] || ''}
						name="newPassword"
						type="password"
						onChange={onInputChange}
					/>
				</Wrapper>
				<Wrapper
					label="your info"
					cardText=" Tell us a little bit about yourself"
					footerText="say something about yourself"
					isSaved={isSaved['info']}
					isLoading={isLoading['info']}
					loadingError={loadingError['info']}
					onSaveClick={() => {
						onDoubleInputSaveBtnClick('info', 'extraInfo', 'info');
					}}
				>
					<Textarea
						outer="col-md-6"
						rows={3}
						value={formData['info']}
						name="info"
						placeholder="info"
						onChange={onInputChange}
					/>
					<Textarea
						outer="col-md-6"
						rows={3}
						placeholder="extra info"
						value={formData['extraInfo']}
						name="extraInfo"
						onChange={onInputChange}
					/>
				</Wrapper>
				<Wrapper
					label="your social Media"
					cardText="how to get you. write down your social medial links"
					footerText="keep on touch with other"
					isSaved={isSaved['socialMedia']}
					isLoading={isLoading['socialMedia']}
					loadingError={loadingError['socialMedia']}
					onSaveClick={onSocialMediaSave}
				>
					<div className="row g-2">
						<div className="col-6">
							<div className="input-group custom-input-group input-group-sm">
								<span className="input-group-text" id="facebook-profile">
									<BsFacebook />
									<span className="mx-1">facebook</span>
								</span>
								<input
									className="form-control"
									type="url"
									placeholder="Facebook Profile"
									aria-label="facebook-profile"
									aria-describedby="facebook-profile"
									name="facebook"
									onChange={onSocialMediaInputChange}
									value={formData['socialMedia']?.facebook}
								/>
							</div>
						</div>
						<div className="col-6">
							<div className="input-group custom-input-group input-group-sm">
								<span className="input-group-text" id="twitter-profile">
									<BsTwitter />
									<span className="mx-1">twitter</span>
								</span>
								<input
									className="form-control"
									type="url"
									placeholder="Twitter Profile"
									aria-label="twitter-profile"
									aria-describedby="twitter-profile"
									name="twitter"
									onChange={onSocialMediaInputChange}
									value={formData['socialMedia']?.twitter}
								/>
							</div>
						</div>
						<div className="col-6">
							<div className="input-group custom-input-group input-group-sm">
								<span className="input-group-text" id="telegram-profile">
									<BsTelegram />
									<span className="mx-1">telegram</span>
								</span>
								<input
									className="form-control"
									type="url"
									placeholder="Telegram Profile"
									aria-label="telegram-profile"
									aria-describedby="telegram-profile"
									name="telegram"
									onChange={onSocialMediaInputChange}
									value={formData['socialMedia']?.telegram}
								/>
							</div>
						</div>
						<div className="col-6">
							<div className="input-group custom-input-group input-group-sm">
								<span className="input-group-text" id="instagram-profile">
									<BsInstagram />
									<span className="mx-1">instagram</span>
								</span>
								<input
									className="form-control"
									type="url"
									placeholder="Instagram Profile"
									aria-label="instagram-profile"
									aria-describedby="instagram-profile"
									name="instagram"
									onChange={onSocialMediaInputChange}
									value={formData['socialMedia']?.instagram}
								/>
							</div>
						</div>
					</div>
				</Wrapper>
				<Wrapper
					label="your category"
					key="category"
					cardText="This is your book specifications"
					footerText="differ between books"
					isSaved={isSaved['category']}
					isLoading={isLoading['category']}
					loadingError={loadingError['category']}
					onSaveClick={() => updateSettingByKey('category')}
				>
					<CategoryTags
						userCategory={currentAuthor['category']}
						onCategoryChange={(cty) =>
							setFormData((form_data) => ({
								...form_data,
								category: cty,
							}))
						}
					/>
				</Wrapper>
				<Wrapper
					label="delete Personal account"
					cardText="Permanently remove your Personal Account and all of its reversible, so please continue with caution."
					footerText="This action cannot be undone."
					dangerBorder
					noSave
				>
					<>
						<div className="col-6">
							<button
								className="btn btn-outline-danger btn-sm px-3"
								data-bs-toggle="modal"
								data-bs-target="#confirm-delete-account"
							>
								Delete Personal Account
							</button>
						</div>
						<div
							className="modal fade"
							id="confirm-delete-account"
							data-bs-keyboard="false"
							tabIndex={-1}
							aria-labelledby="confirm-delete-account-label"
							aria-hidden="true"
						>
							<div className="modal-dialog">
								<div className="modal-content">
									<div className="modal-header">
										<h5
											className="modal-title"
											id="confirm-delete-account-label"
										>
											Are you absolutely sure?
										</h5>
										<button
											type="button"
											className="btn-close"
											data-bs-dismiss="modal"
											aria-label="Close"
										></button>
									</div>
									<div className="modal-body">
										<p>
											This action cannot be undone. This will permanently delete
											the
											<code className="mx-1 text-danger fw-bolder">
												{authorConfirmMessage}
											</code>
											author, book, comments, orders, wishlist and remove all
											collaborator associations.
										</p>
										<p className="">
											Please type
											<code className="mx-1 text-danger fw-bolder">
												{authorConfirmMessage}
											</code>
											to confirm.
										</p>
										<InputField
											outer="my-3"
											className="form-control-sm"
											value={formData['deleteAccount']}
											placeholder={authorConfirmMessage}
											name="deleteAccount"
											onChange={onInputChange}
										/>
										{loadingError['deleteAccount'] && (
											<Alert sm>{loadingError['deleteAccount']}</Alert>
										)}
									</div>
									<div className="modal-footer">
										<button
											type="button"
											className="btn btn-aurora btn-sm"
											data-bs-dismiss="modal"
											ref={closeDeleteAccountModalBtn}
										>
											Cancel
										</button>
										<RenderDeleteAccountModalBtn />
									</div>
								</div>
							</div>
						</div>
					</>
				</Wrapper>
			</>
		);
	} else {
		return <Alert>Error occurs please try again</Alert>;
	}
}

export default profileCards;
