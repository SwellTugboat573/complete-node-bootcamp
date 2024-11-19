const mongoose = require('mongoose');
const Tour = require('./tourModels');
const User = require('./userModel');
// 1) review, rating, created At / refer to tour / ref to use
const reviewSchema = mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, ' Review cannot be empty'],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: 'Tour',
      required: [true, 'Review must belong to a tour'],
    },

    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to a user'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: {
      virtuals: true,
    },
  },
);

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;

reviewSchema.pre('save', function (next) {
  const guidesPromises = this.user.map(async (id) => {
    await User.findById(id);
  });

  this.guides = Promise.All(guidesPromises);
  next();
});

reviewSchema.pre('save', function (next) {
  const tourPromises = this.tour.map(async (id) => {
    await Tour.findById(id);
  });
  this.tour = Promise.All(tourPromises);
});
