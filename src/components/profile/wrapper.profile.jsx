import React from 'react';
import { BsCheck2Circle } from 'react-icons/bs';
import { RiHashtag } from 'react-icons/ri';
import { slugify } from '../ManipulateData';
import { LoadingButton } from '../bootstrap/Spinner';
import { IoMdWarning } from 'react-icons/io';

const ProfileCardWrapper = (props) => {
	const {
		onSaveClick,
		isLoading,
		isSaved,
		dangerBorder,
		label,
		cardText,
		loadingError,
		footerText,
		noSave,
	} = props;

	const RenderSaveButton = () => {
		if (onSaveClick) {
			if (isLoading) {
				return <LoadingButton sm className="px-3 btn-sm" />;
			} else {
				return (
					<button
						className="btn btn-aurora btn-sm px-3"
						aria-label="save changes"
						onClick={onSaveClick}
					>
						Save
					</button>
				);
			}
		}
		return <></>;
	};

	return (
		<div className={`card my-4 ${dangerBorder ? 'border-danger' : ''}`}>
			<div className="card-body">
				<div className="d-flex justify-content-between">
					<h3 className="h4 card-title" id={slugify(label)}>
						<a href={`#${slugify(label)}`}>
							<RiHashtag />
						</a>
						{label}
					</h3>
					<div className="">
						{loadingError ? (
							<small className="text-muted">
								<IoMdWarning className="h6 mb-1" /> {loadingError}
							</small>
						) : null}
						{isSaved === true ? (
							<small className="text-muted">
								<BsCheck2Circle className="h6 mb-1" /> <span>saved</span>
							</small>
						) : null}
					</div>
				</div>
				{cardText && <p className="card-text">{cardText}</p>}
				<div className="row">{props.children}</div>
			</div>
			<div className="card-footer bg-light">
				<div className="d-flex justify-content-between align-items-center">
					<p className="m-0 small text-dark">{footerText}</p>
					{!noSave && <RenderSaveButton />}
				</div>
			</div>
		</div>
	);
};

ProfileCardWrapper.defaultProps = {
	isSaved: {},
	loading: {},
	onSaveClick: () => console.log('no callback function'),
};

export default ProfileCardWrapper;
