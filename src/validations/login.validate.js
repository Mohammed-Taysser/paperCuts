import validator from 'validator';

const loginValidate = (formData) => {
  const { email, password } = formData;

  let errorAsObject = {};

  if (email) {
    if (!validator.isEmail(email)) {
      errorAsObject.email = `please provide valid email`;
    }
  } else {
    errorAsObject.email = `email is missing`;
  }

  if (password) {
    if (!validator.isStrongPassword(password)) {
      errorAsObject.password = `please provide strong password`;
    }
  } else {
    errorAsObject.password = `password is missing`;
  }

  return errorAsObject;
};

export default loginValidate;
