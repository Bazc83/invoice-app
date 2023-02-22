const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');



const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },

});

// Static signup method
// can't be an arrow function as using "this"
userSchema.statics.signup = async function (email, password) {
  // Validate email and password values

  if (!email || !password) {
    throw Error('All fields must be completed');
  }

  if (!validator.isEmail(email)) {
    throw Error('Please enter a valid email address');
  }

  if (!validator.isStrongPassword(password)) {
    throw Error('Please enter a stronger password');
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error('Email already in use');
  }

  const salt = await bcrypt.genSalt(10);

  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });

  
  return user;
};

// Static login method
// can't be an arrow function as using "this"
userSchema.statics.login = async function (email, password) {
  // Check user entered both email and password
  if (!email || !password) {
    throw Error('All fields must be completed');
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error('Invalid credentials');
  }

  // Match plaintext password to the hash returned from user
  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error('Invalid credentials');
  }

  return user;
};

module.exports = mongoose.model('User', userSchema);
