import React from 'react';
import '../../assets/scss/components/placeholder.scss';

function PlaceholderCard(props) {
	return (
		<div className="card" aria-hidden="true">
			{!props.noImg && (
				<svg
					className={`card-img-top placeholder-${props.animation}`}
					width="100%"
					height="180"
					xmlns="http://www.w3.org/2000/svg"
					role="img"
					aria-label="Placeholder"
					preserveAspectRatio="xMidYMid slice"
					focusable="false"
				>
					<title>Placeholder</title>
					<rect width="100%" height="100%" fill="#f2f2f2"></rect>
				</svg>
			)}
			<div className="card-body">
				<h5 className={`card-title placeholder-${props.animation} `}>
					<span className={`placeholder col-6 bg-${props.bg}`}></span>
				</h5>
				<p className={`card-text placeholder-${props.animation} `}>
					<span className={`placeholder bg-${props.bg} col-7`}></span>
					<span className={`placeholder bg-${props.bg} col-4`}></span>
					<span className={`placeholder bg-${props.bg} col-4`}></span>
					<span className={`placeholder bg-${props.bg} col-6`}></span>
					<span className={`placeholder bg-${props.bg} col-8`}></span>
				</p>
				{!props.noBtn && (
					<button
						tabIndex={-1}
						className={`btn btn-${props.btnBg} disabled placeholder col-6`}
					></button>
				)}
			</div>
		</div>
	);
}

PlaceholderCard.defaultProps = {
	animation: 'glow',
	bg: 'secondary',
	btnBg: 'aurora',
};

function RowOfPlaceholderCard(props) {
	let cols = [];
	for (let index = 0; index < props.num; index++) {
		cols.push(
			<div className={`col-6 col-md-${props.col} my-3`} key={index}>
				<PlaceholderCard {...props} />
			</div>
		);
	}
	return <div className="row justify-content-center">{cols}</div>;
}

RowOfPlaceholderCard.defaultProps = {
	col: 3,
	num: 4,
};

export default PlaceholderCard;

export { RowOfPlaceholderCard };
