import React, { useState } from 'react';
import useFormValidation from './useFormValidation';
import validateLogin from './validateLogin';
import { firebase } from '../../firebase';

const INITIAL_STATE = {
  name: '',
  email: '',
  password: '',
};

let reset = true;

function Login(props) {
  const [login, setLogin] = useState(true);
  const [firebaseError, setFirebaseError] = useState(null);
  const {
    handleSubmit,
    handleBlur,
    errors,
    isSubmitting,
    handleChange,
    values,
  } = useFormValidation(INITIAL_STATE, validateLogin, login, authenticateUser);

  const handleLoginOrCreate = () => {
    setLogin(prevLogin => !prevLogin);
    // validateLogin(values, login, reset);
  };

  async function authenticateUser() {
    const { name, email, password } = values;
    try {
      const response = login
        ? await firebase.login(email, password)
        : await firebase.register(name, email, password);

      props.history.push('/');
    } catch (err) {
      console.error('Authentication Error', err);
      setFirebaseError(err.message);
    }
  }

  return (
    <div>
      <h2 className="mv3">{login ? 'Login' : 'Create Account'}</h2>
      <form onSubmit={handleSubmit} className="flex flex-column" noValidate>
        {!login && (
          <input
            onChange={handleChange}
            onBlur={handleBlur}
            name="name"
            value={values.name}
            type="text"
            placeholder="Your Name"
            autoComplete="off"
          />
        )}
        {errors.name && !login && <p className="error-text">{errors.name}</p>}
        <input
          onChange={handleChange}
          onBlur={handleBlur}
          name="email"
          value={values.email}
          type="email"
          className={errors.email && 'error-input'}
          placeholder="Your Email"
          autoComplete="off"
        />
        {errors.email && <p className="error-text">{errors.email}</p>}
        <input
          onChange={handleChange}
          onBlur={handleBlur}
          name="password"
          value={values.password}
          className={errors.password && 'error-input'}
          type="password"
          placeholder="Choose a secure password"
        />
        {errors.password && <p className="error-text">{errors.password}</p>}
        {firebaseError && <p className="error-text">{firebaseError}</p>}
        <div className="flex mt3">
          <button
            type="submit"
            className="button pointer mr2"
            disabled={isSubmitting}
            style={{ background: isSubmitting ? 'grey' : 'orange' }}
          >
            Submit
          </button>
          <button
            type="button"
            className="pointer button"
            onClick={handleLoginOrCreate}
          >
            {login ? 'need to create an account?' : 'already have an account?'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
