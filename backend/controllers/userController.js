const User = require("../models/userModel");
const AppError = require("../utils/AppError");
const asyncHandler = require("../utils/asyncHandler");
const APIFeatures = require("../utils/apiFeatures");

const getUsers = asyncHandler(async (req, res, next) => {

  const features = new APIFeatures(User.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const users = await features.query;
  res.json(users);
});

const createUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);
  res.status(201).json(user);

});

const getUser =  asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if(!user) {
      throw new AppError("User not found", 404);
    }

    res.json(user);
});


const deleteUser = asyncHandler(async (req, res, next) => {
    const user = await User.findByIdAndDelete(req.params.id);

    if(!user) {
      throw new AppError("User not found", 404);
    }
    res.json({
      message: "User deleted"
    });    
});


module.exports = {
  getUsers, createUser, getUser, deleteUser
};