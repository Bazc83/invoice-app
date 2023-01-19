const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
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

module.exports = mongoose.model('User', userSchema);
