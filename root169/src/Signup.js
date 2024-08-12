import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
import { Navigate } from 'react-router-dom'; // Import Navigate for redirection

function validation(values) {
  let errors = {};

  // Username validation
  if (!values.username) {
    errors.username = "Username is required.";
  } else if (values.username.length < 3) {
    errors.username = "Username must be at least 3 characters.";
  }

  // Phone number validation
  if (!values.phone) {
    errors.phone = "Phone number is required.";
  } else if (!/^\d{10}$/.test(values.phone)) {
    errors.phone = "Phone number must be 10 digits.";
  }

  // Password validation
  if (!values.password) {
    errors.password = "Password is required.";
  } else if (values.password.length < 6) {
    errors.password = "Password must be at least 6 characters.";
  }

  return errors;
}

function Signup() {
  const [values, setValues] = useState({ username: '', phone: '', password: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false); // State to manage redirection
  const [serverError, setServerError] = useState(''); // State to manage server errors

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validation(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        // Make POST request to the server
        const response = await axios.post("http://localhost:8800/signup", values);
        
        console.log('Form submitted successfully', response.data);
        // Reset form fields
        setValues({ username: '', phone: '', password: '' });
        // Set submitted state to true to trigger redirection
        setIsSubmitted(true);
      } catch (error) {
        if (error.response && error.response.status === 409) { // Assuming 409 is the status for conflict (user exists)
          setServerError('The user already exists. Please choose a different username or phone number.');
        } else {
          setServerError('An error occurred while submitting the form. Please try again later.');
        }
        console.error('Error submitting form', error);
      }
    }
  };

  // Redirect to the main page if the form is submitted successfully
  if (isSubmitted) {
    return <Navigate to="/" />;
  }

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={values.username}
            onChange={handleChange}
          />
          {errors.username && <p className="error">{errors.username}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone Number:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={values.phone}
            onChange={handleChange}
          />
          {errors.phone && <p className="error">{errors.phone}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={values.password}
            onChange={handleChange}
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        <button type="submit">Signup</button>
        {serverError && <p className="error">{serverError}</p>}
      </form>
    </div>
  );
}

export { Signup };
