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
  