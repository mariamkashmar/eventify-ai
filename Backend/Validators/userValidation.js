const validateSignup = (data) => {
  const {
    firstname,
    lastname,
    phonenumber,
    country,
    email,
    password,
    confirmPassword,
  } = data;

  if (
    !firstname ||
    !lastname ||
    !phonenumber ||
    !country ||
    !email ||
    !password ||
    !confirmPassword
  ) {
    return "All fields are required";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return "Please enter a valid email address";
  }

  const strongPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#_-])[A-Za-z\d@$!%*?&.#_-]{8,}$/;

  if (!strongPasswordRegex.test(password)) {
    return "Password must be at least 8 characters and include uppercase, lowercase, number, and special character";
  }

  if (password !== confirmPassword) {
    return "Passwords do not match";
  }

  return null;
};

const validateSignin = (data) => {
  const { email, password } = data;

  if (!email || !password) {
    return "Email and password are required";
  }

  return null;
};

module.exports = {
  validateSignup,
  validateSignin,
};