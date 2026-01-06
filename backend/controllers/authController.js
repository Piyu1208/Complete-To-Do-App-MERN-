const User = require("../models/userModel");
const signToken = require("../utils/jwt");
const AppError = require("../utils/AppError");
const asyncHandler = require("../utils/asyncHandler");

exports.signup = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);

  const token = signToken(user._id);

  res.send({
    status: 'success',
    token,
    data: {
      user
    }
  });
});


exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if(!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if(!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  const token = signToken(user._id);

  res.send({
    status: "success",
    token,
    user: {
      role: user.role
    }
  });
});