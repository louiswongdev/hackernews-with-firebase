import React, { useState } from 'react';
import useFormValidation from './useFormValidation';

const INITIAL_STATE = {
  name: '',
  email: '',
  password: '',
};

function Login(props) {
  const { handleChange, handleSubmit, values } = useFormValidation(
    INITIAL_STATE
  );
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
          name="email"
          value={values.email}
          type="email"
          placeholder="Your Email"
          autoComplete="off"
        />
        <input
          onChange={handleChange}
          name="password"
          value={values.password}
          type="password"
          placeholder="Choose a secure password"
        />
        <div className="flex mt3">
          <button type="submit" className="button pointer mr2">
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
