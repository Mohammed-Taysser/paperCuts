import React, { useEffect, useState } from 'react';
import {
	FaFacebookF,
	FaInstagram,
	FaTelegram,
	FaTwitter,
} from 'react-icons/fa';
import { MdAlternateEmail } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import { getAuthor } from '../../api/authors.api';
import { getAuthorBooks } from '../../api/books.api';
import BookList from '../../components/standalone/BookList';
import Alert from '../../components/bootstrap/Alert';
import Spinner from '../../components/bootstrap/Spinner';
import SectionTitle from '../../components/standalone/SectionTitle';
import usePageTitle from '../../hooks/usePageTitle';
import InlineCategoryTags from '../../components/standalone/InlineCategoryTags';
import WithBanner from '../../layout/paperCuts/WithBanner.paperCuts';
import NoBookFound from '../../assets/images/image-not-found.png';

function AuthorDetails() {
	const [, setPageTitle] = usePageTitle('Author Details');
	const { username } = useParams();
	const [currentAuthor, setCurrentAuthor] = useState(null);
	const [authorBooks, setAuthorBooks] = useState([]);
	const [loading, setLoading] = useState({
		author: true,
		books: true,
	});
	const [loadingError, setLoadingError] = useState({
		author: null,
		books: null,
	});

	useEffect(() => {
		get_author_api();
		get_author_books_api();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const get_author_api = async () => {
		await getAuthor('username', username)
			.then((response) => {
				setCurrentAuthor(response.data);
				setPageTitle(response.data.firstName + ' ' + response.data.lastName);
			})
			.catch((error) => {
				setLoadingError((load) => ({ ...load, author: error }));
			})
			.finally(() => {
				setLoading((load) => ({ ...load, author: false }));
			});
	};

	const get_author_books_api = async () => {
		await getAuthorBooks(username)
			.then((response) => {
				setAuthorBooks(response.data);
			})
			.catch((error) => {
				setLoadingError((load) => ({ ...load, books: error }));
			})
			.finally(() => {
				setLoading((load) => ({ ...load, books: false }));
			});
	};

	const authorFullName = () => {
		return `${currentAuthor.firstName} ${currentAuthor.lastName}`;
	};

	const AuthorSocialMediaLinks = () => {
		let author_social_media = [];
		for (const key in currentAuthor.socialMedia) {
			if (Object.hasOwnProperty.call(currentAuthor.socialMedia, key)) {
				let icon = null;
				if (currentAuthor.socialMedia[key]) {
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
							className="text-dark h5 mx-2"
							href={currentAuthor.socialMedia[key]}
							key={key}
							target="_blank"
							rel="noreferrer"
						>
							{icon}
						</a>
					);
				}
			}
		}
		return (
			<div className="mt-4">
				{author_social_media}
				<a className="text-dark h5 ms-2" href={`mailto:${currentAuthor.email}`}>
					<MdAlternateEmail />
				</a>
			</div>
		);
	};

	const AuthorDetailsSection = () => {
		return (
			<>
				<div className="row justify-content-center align-items-center mb-5 pb-5">
					<div className="col-md-5 my-3 text-center">
						<img
							src={currentAuthor.avatar}
							alt={authorFullName()}
							width={250}
							height={250}
							className="img-fluid rounded-circle"
						/>
					</div>
					<div className="col-md-7 my-3">
						<div className="author-details-section">
							<small className="special-small-title">
								{currentAuthor.username}
							</small>
							<h1 className="h2 mb-3"> {authorFullName()} </h1>
							{currentAuthor.info && (
								<p className="text-muted">{currentAuthor.info}</p>
							)}
							{currentAuthor.extraInfo && (
								<p className="small-info">{currentAuthor.extraInfo}</p>
							)}
							<InlineCategoryTags category={currentAuthor.category} />
							<AuthorSocialMediaLinks />
						</div>
					</div>
				</div>
				<SectionTitle subtitle="shop online" title="author books" />
				<RenderAuthorBooks />
			</>
		);
	};

	const RenderAuthor = () => {
		if (loading.author) {
			return <Spinner />;
		} else if (loadingError.author) {
			return <Alert> Error While Loading Author </Alert>;
		} else if (currentAuthor) {
			return <AuthorDetailsSection />;
		} else {
			return <Alert> no author found </Alert>;
		}
	};

	const RenderAuthorBooks = () => {
		if (loading.books) {
			return <Spinner />;
		} else if (loadingError.books) {
			return <Alert> Error While Loading Author books </Alert>;
		} else if (authorBooks && authorBooks.length > 0) {
			return <BookList books={authorBooks} outerClass="mt-5" />;
		} else {
			return (
				<div className="text-center mt-4">
					<img src={NoBookFound} className="img-fluid" alt="no book found" />
					<p className="text-muted">no book found</p>
				</div>
			);
		}
	};

	return (
		<WithBanner
			title={currentAuthor ? authorFullName() : 'Author Details'}
			subtitle="author"
		>
			<section className="my-5">
				<div className="container">
					<RenderAuthor />
				</div>
			</section>
		</WithBanner>
	);
}

export default AuthorDetails;
