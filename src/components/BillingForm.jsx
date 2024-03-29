import React, { useState } from 'react';
import { InputField, SelectField, Textarea } from './bootstrap/Form';
import checkoutValidate from '../validations/checkout.validate';
import { LoadingButton } from './bootstrap/Spinner';

function BillingForm(props) {
	const { loading, errors, setErrors } = props;

	const [formData, setFormData] = useState({
		fullName: '',
		country: '',
		address: '',
		phone: '',
		note: '',
	});

	const onInputChange = (evt) => {
		setFormData({ ...formData, [evt.target.name]: evt.target.value });
	};

	const onFormSubmit = (evt) => {
		evt.preventDefault();
		setErrors(null);
		const errorsAsObject = checkoutValidate(formData);

		if (Object.keys(errorsAsObject).length === 0) {
			props.onFormSubmit(formData);
		} else {
			setErrors(errorsAsObject);
		}
	};

	return (
		<form onSubmit={onFormSubmit} noValidate>
			<div className='row justify-content-center'>
				<InputField
					outer='col-lg-6 my-3'
					id='fullName-input-id'
					className={errors['fullName'] ? 'is-invalid' : ''}
					label='full name'
					name='fullName'
					value={formData['fullName']}
					onChange={onInputChange}
					placeholder='full name'
					invalidFeedback={errors['fullName']}
					required
				/>
				<SelectField
					outer='col-lg-6 my-3'
					id='country-input-id'
					label='country'
					className={errors['country'] ? 'is-invalid' : ''}
					name='country'
					value={formData['country']}
					onChange={onInputChange}
					placeholder='country'
					required
					options={[
						{ value: '', label: 'Select Country' },
						{ value: 'egypt', label: 'egypt' },
						{ value: 'india', label: 'India' },
						{ value: 'usa', label: 'USA' },
					]}
					invalidFeedback={errors['country']}
					validFeedback
				/>
				<InputField
					outer='col-lg-6 my-3'
					id='address-input-id'
					label='address'
					name='address'
					value={formData['address']}
					className={errors['address'] ? 'is-invalid' : ''}
					onChange={onInputChange}
					placeholder='address'
					required
					invalidFeedback={errors['address']}
					validFeedback
				/>
				<InputField
					outer='col-lg-6 my-3'
					id='phone-input-id'
					label='phone'
					name='phone'
					value={formData['phone']}
					className={errors['phone'] ? 'is-invalid' : ''}
					onChange={onInputChange}
					placeholder='phone'
					required
					invalidFeedback={errors['phone']}
					validFeedback
				/>
				<Textarea
					outer='col-12 my-3'
					id='register-additional-note'
					label='additional note'
					className={errors['note'] ? 'is-invalid' : ''}
					name='note'
					value={formData['note']}
					onChange={onInputChange}
					placeholder='additional note'
					rows={3}
					invalidFeedback={errors['note']}
					validFeedback={
						formData['note'] ? 'looks good !' : 'empty, no problems !'
					}
				/>
			</div>
			<hr />
			<div className='small text-muted'>
				Your personal data will be used to process your order, support your
				experience throughout this website, and for other purposes described in
				our privacy policy.
			</div>
			{loading.order ? (
				<LoadingButton />
			) : (
				<button className='btn btn-aurora btn-lg mt-3' type='submit'>
					Place Order
				</button>
			)}
		</form>
	);
}

BillingForm.defaultProps = {
	onFormSubmit: (data) => console.log(data),
};

export default BillingForm;
