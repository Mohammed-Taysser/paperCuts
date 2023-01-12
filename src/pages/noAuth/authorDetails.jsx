import React, { useEffect } from 'react';
import {
	FaFacebookF,
	FaInstagram,
	FaTelegram,
	FaTwitter,
} from 'react-icons/fa';
import { MdAlternateEmail } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import NoBookFound from '../../assets/images/image-not-found.png';
import Alert from '../../components/bootstrap/Alert';
import { RowOfPlaceholderCard } from '../../components/bootstrap/Placeholder';
import Spinner from '../../components/bootstrap/Spinner';
import BookList from '../../components/standalone/BookList';
import InlineCategoryTags from '../../components/standalone/InlineCategoryTags';
import SectionTitle from '../../components/standalone/SectionTitle';
import usePageTitle from '../../hooks/usePageTitle';
import WithBanner from '../../layout/paperCuts/WithBanner.paperCuts';
import { fetchAuthor } from '../../redux/features/author.slice';
import { fetchAuthorBooks } from '../../redux/features/books.slice';

function AuthorDetails() {
	const dispatch = useDispatch();
	const authorState = useSelector((state) => state['authors']['single']);
	const booksState = useSelector((state) => state['books']['author']);
	const [, setPageTitle] = usePageTitle('Author Details');
	const { username } = useParams();

	useEffect(() => {
		dispatch(fetchAuthor({ key: 'username', value: username }));
		dispatch(fetchAuthorBooks({ username }));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const authorFullName = () => {
		return `${authorState.author.firstName} ${authorState.author.lastName}`;
	};

	const AuthorSocialMediaLinks = () => {
		let author_social_media = [];
		for (const key in authorState.author.socialMedia) {
			if (Object.hasOwnProperty.call(authorState.author.socialMedia, key)) {
				let icon = null;
				if (authorState.author.socialMedia[key]) {
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
							href={authorState.author.socialMedia[key]}
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
			<div className='mt-4'>
				{author_social_media}
				<a
					className='text-dark h5 ms-2'
					href={`mailto:${authorState.author.email}`}
				>
					<MdAlternateEmail />
				</a>
			</div>
		);
	};

	const AuthorDetailsSection = () => {
		return (
			<>
				<div className='row justify-content-center align-items-center mb-5 pb-5'>
					<div className='col-md-5 my-3 text-center'>
						<img
							src={authorState.author.avatar}
							alt={authorFullName()}
							width={250}
							height={250}
							className='img-fluid rounded-circle'
						/>
					</div>
					<div className='col-md-7 my-3'>
						<div className='author-details-section'>
							<small className='special-small-title'>
								{authorState.author.username}
							</small>
							<h1 className='h2 mb-3'> {authorFullName()} </h1>
							{authorState.author.info && (
								<p className='text-muted'>{authorState.author.info}</p>
							)}
							{authorState.author.extraInfo && (
								<p className='small-info'>{authorState.author.extraInfo}</p>
							)}
							<InlineCategoryTags category={authorState.author.category} />
							<AuthorSocialMediaLinks />
						</div>
					</div>
				</div>
				<SectionTitle subtitle='shop online' title='author books' />
				<RenderAuthorBooks />
			</>
		);
	};

	const RenderAuthor = () => {
		if (authorState.loading) {
			return <Spinner />;
		} else if (authorState.error) {
			return <Alert> {JSON.stringify(authorState.error)} </Alert>;
		} else if (authorState.author) {
			setPageTitle(authorFullName());
			return <AuthorDetailsSection />;
		} else {
			return <Alert> no author found </Alert>;
		}
	};

	const RenderAuthorBooks = () => {
		if (booksState.loading) {
			return <RowOfPlaceholderCard />;
		} else if (booksState.error) {
			return <Alert> {JSON.stringify(booksState.error)} </Alert>;
		} else if (booksState.books && booksState.books.length > 0) {
			return <BookList books={booksState.books} outerClass='mt-5' />;
		} else {
			return (
				<div className='text-center mt-5'>
					<img src={NoBookFound} className='img-fluid' alt='no book found' />
					<p className='text-muted'>no book found</p>
				</div>
			);
		}
	};

	return (
		<WithBanner
			title={authorState.author ? authorFullName() : 'Author Details'}
			subtitle='author'
		>
			<section className='my-5'>
				<div className='container'>
					<RenderAuthor />
				</div>
			</section>
		</WithBanner>
	);
}

export default AuthorDetails;
