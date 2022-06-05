import React from 'react';
import '../../assets/scss/components/spinner.scss';

const Spinner = (props) => {
	const spinnerClassName = `spinner-border text-${props.color} ${
		props.sm ? 'spinner-border-sm' : ''
	}`;
	return (
		<div className={`text-center ${props.className}`}>
			<div className={spinnerClassName} role="status">
				<span className="visually-hidden">{props.text}</span>
			</div>
			{props.text && <p className="">{props.text}</p>}
		</div>
	);
};

Spinner.defaultProps = {
	color: 'aurora',
};

function LoadingButton(props) {
	const { sm, color, className } = props;

	return (
		<button className={`btn btn-${color} ${className}`} type="button" disabled>
			<span
				className={`spinner-border ${sm ? 'spinner-border-sm' : ''}`}
				role="status"
				aria-hidden="true"
			></span>
			<span className="visually-hidden">Loading...</span>
		</button>
	);
}

LoadingButton.defaultProps = {
	color: 'aurora',
};

export default Spinner;
export { LoadingButton };
