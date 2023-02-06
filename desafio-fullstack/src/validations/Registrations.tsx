import * as yup from 'yup';

export const formSchemaRegistration = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup
    .string()
    .required()
    .matches(
      /(^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*_-])).{8,}$/,
      'Password must have a: a minimum of 1 lower case letter [a-z] and a minimum of 1 upper case letter [A-Z] and a minimum of 1 numeric character [0-9] and a special character.'
    ),
  phone_number: yup
    .string()
    .required()
    .matches(
      /(\(?\d{2}\)?\s)?(\d{4,5}-\d{4})/g,
      'Phone number must be like: (61) 98293-9382'
    )
});

export const formSchemaLogin = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required()
});
