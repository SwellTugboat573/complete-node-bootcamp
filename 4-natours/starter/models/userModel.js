const crypto = require('crypto');
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
  photo: { type: String, default: 'default.jpg' },
  role: {
    type: String,
    enum: ['user', 'guide', 'lead-guid', 'admin'],
    default: 'user',
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minLength: 8,
    select: false,
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
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpired: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});
// Start of middleware
// before it's saved to the database
userSchema.pre('save', async function (next) {
  // check if the password has been modified
  if (!this.isModified('password')) return next();
  // hash the pass word with cost / salt of 12 - the higher the number the more cpu it uses.
  this.password = await bcrypt.hash(this.password, 12);
  // removed the password confirmed.
  this.passwordConfirm = undefined;
  next();
});

//instance method that's availabe for all docuements on a collections. Means if we are inside the model we have access to this function without needing to import
//
userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000; // puts the time one second in the past as there can be time delays between this and the token creation date to ensure the token has been created after the password has changed.
  next();
});

userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

userSchema.methods.correctPassword = async function (
  candiatePassword,
  userPassword,
) {
  return await bcrypt.compare(candiatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  // the this word becomes the current document / file from database
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10,
    );
    return JWTTimestamp < changedTimestamp; // the time the token was created was before the password was changed which would mean it requires updateing
  }
  // False means not changed
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetExpired = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

const User = mongoose.model('User', userSchema);
module.exports = User;
