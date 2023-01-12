import React from 'react';

class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { error: null, errorInfo: null };
	}

	componentDidCatch(error, errorInfo) {
		// Catch errors in any components below and re-render with error message
		this.setState({
			error: error,
			errorInfo: errorInfo,
		});
	}

	render() {
		if (this.state.errorInfo) {
			return (
				<div className='container my-5'>
					<h2>Something went wrong 🙂.</h2>

					<button
						className='my-3 btn btn-aurora'
						onClick={() => window.location.reload()}
					>
						Reload
					</button>

					<details style={{ whiteSpace: 'pre-wrap' }}>
						{this.state.error && this.state.error.toString()}
						<br />
						{this.state.errorInfo?.componentStack}
					</details>
				</div>
			);
		}
		return this.props.children;
	}
}

export default ErrorBoundary;
