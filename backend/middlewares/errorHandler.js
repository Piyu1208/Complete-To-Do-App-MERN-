const errorHandler = async (err, req, res, next) => {

  if (err.code === 11000) {
    err.statusCode = 400;
    err.message = "User already exists or email already in use";
  }

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
};


module.exports = errorHandler;