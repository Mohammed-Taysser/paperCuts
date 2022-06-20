import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../api/auth.api';
import { InputField } from '../../components/bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { setToken } from '../../redux/features/auth.slice';
import Alert from '../../components/bootstrap/Alert';
import Spinner from '../../components/bootstrap/Spinner';
import usePageTitle from '../../hooks/usePageTitle';
import loginValidate from '../../validations/login.validate';

function Login() {
	usePageTitle('Login');
	const navigate_to = useNavigate();
	const dispatch = useDispatch();
	const { reduxToken } = useSelector((state) => state['auth']);
	const [errors, setErrors] = useState({});
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const api_login = async () => {
		setLoading(true);
		await login(formData)
			.then((response) => {
				saveAuthor(response.data);
			})
			.catch((error) => {
				handelErrors(error.response.data.error);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const saveAuthor = (responseData) => {
		const { token } = responseData;

		localStorage.setItem('token', JSON.stringify(token));
		dispatch(setToken(token));

		navigate_to('/');
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

	const onFormSubmit = (evt) => {
		evt.preventDefault();
		setErrors({});

		const errorsAsObject = loginValidate(formData);

		if (Object.keys(errorsAsObject).length > 0) {
			handelErrors(errorsAsObject);
		} else {
			api_login();
		}
	};

	const DummyCol = () => {
		return (
			<div className="col-md-6 my-3">
				<div className="bg-gradient p-4 rounded-end h-100 d-flex justify-content-center align-items-center align-content-center bg-login">
					<div className="text-center text-white">
						<h2 className="mb-3">welcome back!</h2>
						<p>Enter your personal details and start journey with us</p>
						<Link
							className="rounded-pill mt-2 px-3 py-2 btn btn-outline-light"
							to="/register"
							title="register"
						>
							sign up
						</Link>
					</div>
				</div>
			</div>
		);
	};

	if (reduxToken) {
		return (
			<section className="login-page my-5 py-5">
				<div className="container">
					<Alert color="success">You already sign in</Alert>
				</div>
			</section>
		);
	} else {
		return (
			<>
				<section className="login-page my-5 py-5">
					<div className="container">
						<div className="row justify-content-center align-items-stretch g-0">
							<div className="col-md-6 my-3">
								<div className="p-4 rounded-start border login-content">
									<h1 className="my-4 text-center">Sign in</h1>
									<form
										className={`mb-3 needs-validation`}
										noValidate
										onSubmit={onFormSubmit}
									>
										<InputField
											outer="my-3"
											type="email"
											id="login-email"
											label="email address"
											className={errors['email'] ? 'is-invalid' : ''}
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
											className={errors['password'] ? 'is-invalid' : ''}
											id="login-password"
											label="password"
											name="password"
											minLength={8}
											value={formData['password']}
											onChange={onInputChange}
											placeholder="eg: ********"
											required
											invalidFeedback={errors['password']}
											validFeedback
										/>
										<p className="text-end">
											<Link className="text-muted" to="/forget-password">
												forget password
											</Link>
										</p>
										<div className="text-center">
											{loading ? (
												<Spinner />
											) : (
												<button className="btn btn-aurora mt-4" type="submit">
													Sign In
												</button>
											)}
										</div>
									</form>
								</div>
							</div>
							<DummyCol />
						</div>
					</div>
				</section>
			</>
		);
	}
}

export default Login;
