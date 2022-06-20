import validator from 'validator';

const checkoutValidation = (formData) => {
	const { fullName, country, address, phone } = formData;

	let errorAsObject = {};

	const CONFIG = [
		{
			key: 'address',
			condition: !validator.isAlphanumeric(address, 'en-US', {
				ignore: ' -,',
			}),
			msg: null,
		},
		{
			key: 'fullName',
			condition: !validator.isAlphanumeric(fullName, 'en-US', {
				ignore: ' -',
			}),
			msg: null,
		},
		{
			key: 'country',
			condition: !validator.isAlphanumeric(country),
			msg: null,
		},
		{
			key: 'phone',
			condition: !validator.isMobilePhone(phone, 'ar-EG'),
			msg: null,
		},
	];

	CONFIG.forEach((element) => {
		if (element.key) {
			if (element.condition) {
				errorAsObject[element.key] =
					element.msg || `please provide valid ${element.key}`;
			}
		} else {
			errorAsObject[element.key] = `${element.key} is missing`;
		}
	});

	return errorAsObject;
};

export default checkoutValidation;
