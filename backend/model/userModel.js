const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// models/user.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { 
    type: String,
    required: true },

  email: { 
    type: String, 
    required: true, 
    unique: true },

password: {
     type: String, 
     required: [true, "Please Enter Your Password"],
     minLength: [8, "Password should be greater than 8 characters"],
     select:false }, 
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      next();
    }
  
    this.password = await bcrypt.hash(this.password, 10);
  });

// JWT TOKEN
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
  };



// Compare Password

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };

module.exports = mongoose.model('User', userSchema);


