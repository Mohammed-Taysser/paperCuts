import React from 'react';
import { onImageNotLoad } from '../ManipulateData';
import {
	FaFacebookF,
	FaInstagram,
	FaTelegram,
	FaTwitter,
} from 'react-icons/fa';
import { MdAlternateEmail } from 'react-icons/md';
import SectionTitle from './SectionTitle';
import TEAM_MEMBER from '../../constants/team';

const SocialMediaIcons = ({ socialMedia, email }) => {
	let author_social_media = [];
	for (const key in socialMedia) {
		if (Object.hasOwnProperty.call(socialMedia, key)) {
			let icon = null;
			if (socialMedia[key]) {
				switch (key) {
					case 'instagram':
						icon = <FaInstagram />;
						break;
					case 'facebook':
						icon = <FaFacebookF />;
						break;
					case 'twitter':
						icon = <FaTwitter />;
						break;
					case 'telegram':
						icon = <FaTelegram />;
						break;
					default:
						icon = <MdAlternateEmail />;
						break;
				}
				author_social_media.push(
					<a
						className='text-dark h5 mx-2'
						href={socialMedia[key]}
						key={key}
						target='_blank'
						rel='noreferrer'
					>
						{icon}
					</a>
				);
			}
		}
	}
	return (
		<div className='mt-1 text-center'>
			{author_social_media}
			<a className='text-dark h5 ms-2' href={`mailto:${email}`}>
				<MdAlternateEmail />
			</a>
		</div>
	);
};

function SingleMember(props) {
	const { member } = props;

	return (
		<div className='col-md-6 col-lg-3 my-4'>
			<div className='single-member-wrapper'>
				<div className='member-image-container'>
					<img
						src={member.avatar}
						className='member-image'
						alt={member.name}
						onError={onImageNotLoad}
						width='200'
						height='200'
					/>
					<div className='rounded-shape'>
						<svg>
							<path d='M221.5,57.7c-9.5-11.2-21.5-20-33.7-28.2C172.3,19,156.1,9,138.1,3.8C101-6.8,58.8,5.4,32,33.1 C5.2,60.8-5.6,102.5,2.8,140.1c8.5,37.6,35.5,70.2,70.2,87c10,4.8,20.8,8.5,31.9,9.2c20.4,1.3,40.2-7.4,57.2-18.7 C212.8,184.1,269.8,114.7,221.5,57.7z'></path>
						</svg>
					</div>
					<div className='line-shape'>
						<svg>
							<path d='M0.2,14.6C13.5,9.4,27,4.4,41.2,2s29-2.2,42.4,2.9c10.2,3.8,19.2,10.2,28.7,15.4s20.2,9.4,31,8.3 c8.7-0.9,16.7-5.2,25.2-7.2c8.7-2,17.8-1.6,26.4-3.7c4.5-1.1,8.8-2.8,13.1-4.5c6.8-2.7,13.6-5.4,20.4-8.1c5.3-2.1,11.3-4.2,16.6-2'></path>
						</svg>
					</div>
					<div className='plus-shape'>
						<span className='animate-plus'>+</span>
						<span className='animate-plus'>+</span>
						<span className='animate-plus'>+</span>
						<span className='animate-plus'>+</span>
						<span className='animate-plus'>+</span>
					</div>
				</div>
				<div className='member-info'>
					<h6 className='member-position my-2'>{member.position}</h6>
					<h4 className='member-name text-aurora'>{member.name}</h4>
					<SocialMediaIcons
						socialMedia={member.socialMedia}
						email={member.email}
					/>
				</div>
			</div>
		</div>
	);
}

function TeamMembers() {
	return (
		<>
			<section className='my-5'>
				<SectionTitle title='our amazing team' subtitle="what's up" />
				<div className='container my-5'>
					<div className='row justify-content-center align-items-center'>
						{TEAM_MEMBER.map((member) => (
							<SingleMember key={member._id} member={member} />
						))}
					</div>
				</div>
			</section>
		</>
	);
}

export default TeamMembers;
