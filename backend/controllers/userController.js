const ErrorHandler = require("../utils/errorHandler.js");
const catchAsyncError = require("../middleware/catchAsyncError.js");
const User = require("../models/userModel.js");
const sendToken = require("../utils/jwtToken.js");
const sendEmail = require("../utils/sendEmail.js");
const { findById } = require("../models/userModel.js");

exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "This is sample avatar",
      url: "imgae url",
    },
  });

  sendToken(user, 201, res);
});

// User log in

exports.userLogin = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  // Check if user has provided email and password or not

  if (!email || !password) {
    return next(new ErrorHandler("Enter email and password", 401));
  }

  // Since we specified select to be false for password in user schema we need to explicitly specify to select password field.
  const user = await User.findOne({ email: email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid email and password", 401));
  }
  const passwordMatched = await user.comparePassword(password);

  if (!passwordMatched) {
    return next(new ErrorHandler("Invalid email and password", 401));
  }

  sendToken(user, 200, res);
});

// Log out user

exports.logOutUser = (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged out",
  });
};

// Forgot password

// exports.forgotPassword = catchAsyncError(async (req, res, next) => {
//   const user = await User.findOne({ email: req.body.email });

//   if (!user) return next(new ErrorHandler("User not found", 404));

//   const resetToken = user.getResetPasswordToken();

//   await user.save({ validateBeforeSave: false });

//   const resetPasswordUrl = `${req.protocol}://${req.get(
//     "host"
//   )}/api/v1/password/reset/${resetToken}`;

//   const message = `Your password reset token is - ${resetToken} \n\n Ignore if this email is not requested`;

//   try {
//     await sendEmail({
//       email: user.email,
//       subject: "SmartZone password recovery",
//       message,
//     });

//     res.status(200).json({
//       success: true,
//       message: `Email sent to ${user.email} successfully`,
//     });
//   } catch (error) {
//     user.resetPasswordToken = undefined;
//     user.resetPasswordExpire = undefined;
//     await user.save({ validateBeforeSave: false });

//     return next(new ErrorHandler(error.message, 500));
//   }
// });

/**
 * @params (req,res,next)
 */

exports.getUserDetails = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
});

// Update user password

exports.updateUserPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const passwordMatched = await user.comparePassword(req.body.oldPassword);

  if (!passwordMatched) {
    return next(new ErrorHandler("Old password is incorrect", 400));
  }

  if (req.body.newPassword != req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not match", 400));
  }

  user.password = req.body.newPassword;
  await user.save();

  sendToken(user, 200, res);
});

exports.updateUserProfile = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    user,
  });
});

// Get all user details -- Admin

exports.getAllUserDetails = catchAsyncError(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    count: users.length,
    users,
  });
});

// Get single user detail -- Admin

exports.getSingleUserDetails = catchAsyncError(async (req, res, next) => {
  if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    const user = await User.findById(req.params.id);

    if (!user) {
      return next(
        new ErrorHandler(
          "user with provided id does not exist. user not found",
          404
        )
      );
    }

    res.status(200).json({
      success: true,
      user,
    });
  } else {
    return next(new ErrorHandler("Invalid id", 500));
  }
});

// Update user role --Admin

exports.updateUserRole = catchAsyncError(async (req, res, next) => {
  if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    const newUserRole = {
      role: req.body.newRole,
    };

    const user = await User.findByIdAndUpdate(req.params.id, newUserRole, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    if (!user) {
      return next(new ErrorHandler("User not found for provided id", 404));
    }

    res.status(200).json({
      success: true,
      user,
    });
  } else {
    return next(new ErrorHandler("Invlid id", 500));
  }
});

// Delete user --Admin

exports.deleteUser = catchAsyncError(async (req, res, next) => {
  if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    let user = await User.findById(req.params.id);

    if (!user) {
      return next(new ErrorHandler("user not found", 404));
    } else {
      user = await User.deleteOne({ _id: req.params.id });

      res.status(500).json({ success: true, user });
    }
  } else {
    return next(new ErrorHandler("Invlid id", 500));
  }
});
