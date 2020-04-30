import React, { useState, useEffect } from 'react';

function useFormValidation(initialState, validate, authenticate, login) {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isSubmitting) {
      const noErrors = Object.keys(errors).length === 0;
      if (noErrors) {
        authenticate();
        setIsSubmitting(false);
      } else {
        setIsSubmitting(false);
      }
    }
  }, [errors]);

  function handleChange(e) {
    e.persist();
    setValues(previousValues => ({
      ...previousValues,
      [e.target.name]: e.target.value,
    }));
  }

  function handleBlur() {
    const validationErrors = validate(values, login);
    setErrors(validationErrors);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate(values, login);
    console.log(errors);
    setIsSubmitting(true);
    setErrors(validationErrors);
  }

  return {
    handleSubmit,
    handleBlur,
    errors,
    isSubmitting,
    handleChange,
    values,
  };
}

export default useFormValidation;
