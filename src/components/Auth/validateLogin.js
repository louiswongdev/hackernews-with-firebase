export default function validateLogin(values, loggedIn) {
  let errors = {};

  console.log(errors);
  // Name Errors
  // only set error on name field if user creating an account
  if (!loggedIn) {
    if (!values.name) {
      errors.name = 'Name required';
    }
  }

  // Email Errors
  if (!values.email) {
    errors.email = 'Email required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  // Password Errors
  if (!values.password) {
    errors.password = 'Password required';
  } else if (values.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }

  return errors;
}
