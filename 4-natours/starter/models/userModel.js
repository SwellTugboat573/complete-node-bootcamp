const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
// name, email photo String, password password Confirm

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name!'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  photo: {
    type: String,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minLength: 8,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please provide a password'],
    validate: {
      // This will only work on CREATE and SAVE!! Won't work on find and update.
      validator: function (el) {
        return el === this.password; // if passwordconfirm is password then it's true and goes if not then an error.
      },
      message: 'Passwords are not the same',
    },
  },
});
// before it's savbed to the database
userSchema.pre('save', async function (next) {
  // check if the password has been modified
  if (!this.isModified('password')) return next();
  // hash the pass word with cost / salt of 12 - the higher the number the more cpu it uses.
  this.password = await bcrypt.hash(this.password, 12);
  // removed the password confirmed.
  this.passwordConfirm = undefined;
  next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
