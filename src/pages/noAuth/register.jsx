import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authFeature } from '../../redux/features/auth.slice';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '../../components/bootstrap/Alert';
import RegisterForm from '../../components/RegisterForm';
import usePageTitle from '../../hooks/usePageTitle';

function Register() {
	usePageTitle('Register');
	const navigate_to = useNavigate();
	const dispatch = useDispatch();
	const authState = useSelector((state) => state['auth']);
	const [errors, setErrors] = useState({});

	useEffect(() => {
		if (!authState.loading && authState.user && authState.token) {
			navigate_to('/');
		}

		if (authState.error) {
			setErrors(authState.error);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [authState]);

	const onFormSubmit = (data) => {
		setErrors({});
		dispatch(authFeature({ type: 'register', data }));
	};

	if (authState.isLoggedIn) {
		return (
			<section className='register-page my-5 py-5'>
				<div className='container'>
					<Alert color='success'>You already sign in</Alert>
				</div>
			</section>
		);
	} else {
		return (
			<section className='register-page my-5 py-5'>
				<div className='container'>
					<div className='row justify-content-center align-items-stretch g-0'>
						<div className='col-lg-6 my-3'>
							<div className='p-4 rounded-start border register-content'>
								<h1 className='my-4 text-center'>Sign up</h1>
								<p className='small text-muted mt-4 text-center'>
									or use your account
								</p>
								<RegisterForm
									onFormSubmit={onFormSubmit}
									errors={errors}
									setErrors={setErrors}
									loading={authState.loading}
								/>
							</div>
						</div>
						<div className='col-lg-6 my-3'>
							<div className='bg-gradient p-4 rounded-end h-100 d-flex justify-content-center align-items-center align-content-center bg-login'>
								<div className='text-center text-white'>
									<h2 className='mb-3'>Hello, Friend!</h2>
									<p>Enter your personal details and start journey with us</p>
									<Link
										className='rounded-pill mt-2 px-3 py-2 btn btn-outline-light'
										to='/login'
										title='login'
									>
										sign in
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		);
	}
}

export default Register;
