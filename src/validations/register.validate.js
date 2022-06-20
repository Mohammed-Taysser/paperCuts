const validator = require('validator/validator');

module.exports = (formData) => {
  const { username, email, password, confirmPassword, firstName, lastName } =
    formData;

  let errorAsObject = {};

  const CONFIG = [
    {
      key: 'username',
      condition: !validator.isSlug(username),
      msg: null,
    },
    {
      key: 'email',
      condition: !validator.isEmail(email),
      msg: null,
    },
    {
      key: 'firstName',
      condition: !validator.isAlphanumeric(firstName, 'en-US', {
        ignore: ' -',
      }),
      msg: null,
    },
    {
      key: 'lastName',
      condition: !validator.isAlphanumeric(lastName, 'en-US', { ignore: ' -' }),
      msg: null,
    },
    {
      key: 'password',
      condition: !validator.isStrongPassword(password),
      msg: `please provide strong password`,
    },
    {
      key: 'confirmPassword',
      condition: password !== confirmPassword,
      msg: `password not match`,
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
