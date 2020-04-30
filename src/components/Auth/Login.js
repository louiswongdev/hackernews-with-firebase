import React, { useState } from 'react';
import useFormValidation from './useFormValidation';
import validateLogin from './validateLogin';

const INITIAL_STATE = {
  name: '',
  email: '',
  password: '',
};

function Login(props) {
  const {
    handleSubmit,
    handleBlur,
    errors,
    isSubmitting,
    handleChange,
    values,
  } = useFormValidation(INITIAL_STATE, validateLogin);
  const [login, setLogin] = useState(true);

  return (
    <div>
      <h2 className="mv3">{login ? 'Login' : 'Create Account'}</h2>
      <form onSubmit={handleSubmit} className="flex flex-column">
        {!login && (
          <input
            onChange={handleChange}
            name="name"
            value={values.name}
            type="text"
            placeholder="Your Name"
            autoComplete="off"
          />
        )}
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
            onClick={() => setLogin(prevLogin => !prevLogin)}
          >
            {login ? 'need to create an account?' : 'already have an account?'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
