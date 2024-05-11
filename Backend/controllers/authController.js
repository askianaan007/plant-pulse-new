const catchAsyncError = require("../middlewares/catchAssyncError");
const User = require("../models/userModel");
const sendToken = require("../utils/jwt");
const sendEmail = require("../utils/email");
const ErrorHandler = require("../utils/errorHandler");
const crypto = require("crypto");



//register user - http://localhost:3000/api/v1/register
exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password, avatar } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar,
  });
  sendToken(user, 201, res);
});


//login user - http://localhost:3000/api/v1/login
exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Please enter email or password", 400));
  }

  //finding the user database
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 400));
  }

  if (!(await user.isValidPassword(password))) {
    return next(new ErrorHandler("Invalid email or password", 400));
  }

  sendToken(user, 201, res);
});


//logout user - http://localhost:3000/api/v1/logout
exports.logoutUser = (req, res, next) => {
  res
    .cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .status(200)
    .json({
      success: true,
      message: "Logout successfully",
    });
};



//password forgot - http://localhost:3000/api/v1/password/forgot
exports.forgotPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User not found with this email address"));
  }

  const resetToken = user.getResetToken();
  await user.save({ validateBeforeSave: false });

  // create reset url
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetToken}`;

  const message = `Your password reset url is as follows \n\n
  ${resetUrl}\n\n if you have not requested this email, then ignore it.`;

  try {
    sendEmail({
      email: user.email,
      subject: "plant pulse password recovery",
      message: message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email}`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message), 500);
  }
});


//reset password - http://localhost:3000/api/v1/password/reset/:token
exports.resetPassword = catchAsyncError(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordTokenExpire: {
      $gt: Date.now(),
    },
  });

  if (!user) {
    return next(new ErrorHandler("Password reset token is invalid or expired"));
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not matched"));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordTokenExpire = undefined;
  await user.save({ validateBeforeSave: false });

  sendToken(user, 201, res);
});


//get user profile - http://localhost:3000/api/v1/myprofile
exports.getUserProfile = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
});

//change password -
exports.changePassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  //check old password
  if (!(await user.isValidPassword(req.body.oldPassword))) {
    return next(new ErrorHandler("Old password is incorrect"), 404);
  }

  //assigning new password
  user.password = req.body.password;
  await user.save();
  res.status(200).json({
    success: true,
  });
});


//update profile
exports.updateProfile = catchAsyncError(async (req, res, next) => {
  const newUserDate = {
    name: req.body.name,
    email: req.body.email,
  };

  const user = await User.findByIdAndUpdate(req.user.id, newUserDate, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    user
  });
});

