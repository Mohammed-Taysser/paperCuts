import React, { useState, useEffect } from 'react';
import { BiUpArrowCircle } from 'react-icons/bi';
import '../../assets/scss/components/backToTop.scss';

function BackToTop() {
	const [show, setShow] = useState(false);

	useEffect(() => {
		back_to_top();
	}, []);

	const back_to_top = () => {
		document.addEventListener('scroll', () => {
			if (
				document.body.scrollTop > 700 ||
				document.documentElement.scrollTop > 700
			) {
				setShow(true);
			} else {
				setShow(false);
			}
		});
	};

	const onBtnClick = (evt) => {
		evt.preventDefault();
		document.documentElement.scrollTo({
			top: 0,
			left: 0,
			behavior: 'smooth',
		});
	};
	return (
		<a
			href="#bact-to-top"
			className={`back-to-top text-white p-2 bg-aurora ${show ? '' : 'd-none'}`}
			onClick={onBtnClick}
		>
			<BiUpArrowCircle className="h4 m-0" />
		</a>
	);
}

export default BackToTop;
