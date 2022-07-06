import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { adminLogin } from '../../api/auth.api';
import { InputField } from '../../components/bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { saveUserFeature } from '../../redux/features/auth.slice';
import Alert from '../../components/bootstrap/Alert';
import { LoadingButton } from '../../components/bootstrap/Spinner';
import usePageTitle from '../../hooks/usePageTitle';
import loginValidate from '../../validations/login.validate';

import LoginImage from '../../assets/images/background/dashboard-login.png';
import Favicon from '../../assets/images/icons/favicon.png';
import '../../assets/scss/dashboard.scss';

function Login() {
	usePageTitle('Admin Login');
	const navigate_to = useNavigate();
	const dispatch = useDispatch();
	const { isLoggedIn, user } = useSelector((state) => state['auth']);
	const [errors, setErrors] = useState({});
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const saveAdmin = (responseData) => {
		dispatch(saveUserFeature({ token: responseData.token }));
		navigate_to('/dashboard');
	};

	const onInputChange = (evt) => {
		setFormData({
			...formData,
			[evt.target.name]: evt.target.value,
		});
	};

	const handelErrors = (errorsAsObject) => {
		if (errorsAsObject.notExist) {
			setErrors({
				email: errorsAsObject.notExist,
				password: errorsAsObject.notExist,
			});
		} else {
			setErrors(errorsAsObject);
		}
	};

	const onFormSubmit = async (evt) => {
		evt.preventDefault();
		setErrors({});

		const errorsAsObject = loginValidate(formData);

		if (Object.keys(errorsAsObject).length > 0) {
			handelErrors(errorsAsObject);
		} else {
			setLoading(true);
			await adminLogin(formData)
				.then((response) => {
					saveAdmin(response.data);
				})
				.catch((error) => {
					handelErrors(error.response.data.error);
				})
				.finally(() => {
					setLoading(false);
				});
		}
	};

	if (isLoggedIn && user.role === 'admin') {
		return (
			<section className="dashboard-login-page">
				<div className="container">
					<Alert color="success">
						You already sign in, got to
						<Link to="/dashboard" className="alert-link mx-1">
							Dashboard
						</Link>
					</Alert>
				</div>
			</section>
		);
	} else {
		return (
			<>
				<section className="dashboard-login-page">
					<div className="container">
						<div className="row justify-content-center align-items-stretch g-0">
							<div className="col-md-6 my-3">
								<div className="rounded nice-shadow login-content">
									<div className="row g-0 rounded-top justify-content-between bg-aurora-soft align-items-center">
										<div className="col-7">
											<div className="text-aurora p-4 ">
												<p className="mb-1">Welcome Back !</p>
												<p className="small">
													Sign in to continue to paperCuts.
												</p>
											</div>
										</div>
										<div className="col-5">
											<div className="img">
												<img
													src={LoginImage}
													alt="login"
													className="img-fluid"
												/>
											</div>
										</div>
									</div>
									<div className="login-logo position-relative">
										<span className="rounded-circle bg-light position-absolute login-logo-container">
											<img
												src={Favicon}
												alt="favicon"
												className="img-fluid p-2"
												width={70}
												height={70}
											/>
										</span>
									</div>
									<form
										className={`mt-4 needs-validation p-4`}
										noValidate
										onSubmit={onFormSubmit}
									>
										<InputField
											outer="my-3"
											type="email"
											id="login-email"
											label="email address"
											className={`${errors['email'] ? 'is-invalid' : ''}`}
											name="email"
											value={formData['email']}
											onChange={onInputChange}
											placeholder="eg: mo@mo.mo"
											required
											invalidFeedback={errors['email']}
											validFeedback
										/>
										<InputField
											outer="my-3"
											type="password"
											className={`${errors['password'] ? 'is-invalid' : ''}`}
											id="login-password"
											label="password"
											name="password"
											minLength={8}
											value={formData['password']}
											onChange={onInputChange}
											placeholder="eg: ********"
											required
											withEye
											invalidFeedback={errors['password']}
											validFeedback
										/>
										<div className="">
											{loading ? (
												<LoadingButton sm />
											) : (
												<button className="btn btn-aurora" type="submit">
													Sign In
												</button>
											)}
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</section>
			</>
		);
	}
}

export default Login;
