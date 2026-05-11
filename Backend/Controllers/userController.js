const { signupUser, signinUser } = require("../Services/userService");
const {
  validateSignup,
  validateSignin,
} = require("../Validators/userValidation");

const signupController = async (req, res) => {
  try {
    const validationError = validateSignup(req.body);

    if (validationError) {
      return res.status(400).json({
        success: false,
        message: validationError,
      });
    }

    const user = await signupUser(req.body);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        _id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        phonenumber: user.phonenumber,
        country: user.country,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const signinController = async (req, res) => {
  try {
    const validationError = validateSignin(req.body);

    if (validationError) {
      return res.status(400).json({
        success: false,
        message: validationError,
      });
    }

    const response = await signinUser(req.body.email, req.body.password);

    res.status(200).json({
      success: true,
      message: "User signed in successfully",
      ...response,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  signupController,
  signinController,
};