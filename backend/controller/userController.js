
const User = require("../model/userModel");
const sendToken = require("../utils/sendToken");
const ErrorHander = require('../utils/errorHandler')
// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = new User({
      name,
      email,
      password
    });

     // Check if user with the same email already exists
     const existingUser = await User.findOne({ email });
     if (existingUser) {
       return res.status(400).json({
         success: false,
         message: "Email already exists",
       });
     }

    const savedUser = await user.save();

    res.status(201).json({
      success: true,
      message: "User Successfully Created",
      savedUser,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


// Login User
exports.loginUser = (async (req, res, next) => {
    const { email, password } = req.body;
  
    // checking if user has given password and email both
  
    if (!email || !password) {
      return next(new ErrorHander("Please Enter Email & Password", 400));
    }
  
    const user = await User.findOne({ email }).select("+password");
  
    if (!user) {
      return next(new ErrorHander("Invalid email or password", 401));
    }
  
    const isPasswordMatched = await user.comparePassword(password);
  
    if (!isPasswordMatched) {
      return next(new ErrorHander("Invalid email or password", 401));
    }
  
    sendToken(user, 200, res);
  });


// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    
    res.json(users);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.json(user);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Update user by ID
exports.updateUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, email,password } = req.body;

//update user
  const updateUser = {
    name,
    email,
    password
  };

    const user = await User.findByIdAndUpdate(userId,updateUser, {
      new: true,
      runValidators: true,
      
    });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.json({
      success: true,
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Delete user by ID
exports.deleteUserById = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
