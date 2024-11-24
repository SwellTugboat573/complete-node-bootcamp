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

reviewSchema.index({ tour: 1, user: 1 }, { unique: true });

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name photo',
  });
  next();
});

reviewSchema.statics.calcAverageRatings = async function (tourId) {
  // aggregate can only be used on the model. hence using a function and not =>.
  const stats = await this.aggregate([
    {
      $match: { tour: tourId },
    },
    {
      $group: {
        _id: '$tour',
        nRating: { $sum: 1 },
        avgRating: { $avg: '$rating' },
      },
    },
  ]);
  if (stats.length > 0) {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsAverage: stats[0].avgRating,
      ratingQuantity: stats[0].nRating,
    });
  } else {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsAverage: 4.5,
      ratingQuantity: 0,
    });
  }
};
// use post not pre save middleware because otherwise the reviews won't be yet saved in the function.
reviewSchema.post('save', function (next) {
  // this points to the current review.
  this.constructor.calcAverageRatings(this.tour);
  next;
});

// CALCUALTE AND UDPATE THE AVERAGE RATINGS WHEN UPDATING AND DELETING
reviewSchema.pre(/^findOneAnd/, async function (next) {
  // We dont access to the documents but only the query so by using the findOneAnd regular expression we can this look up the docuements as the this key word would be the model
  // Clone the query to fetch the document safely without affecting the original query
  this.r = await this.clone().findOne(); //saving the review to the this variable for access in the post
  next();
});

reviewSchema.post(/^findOneAnd/, async function () {
  this.r.constructor.calcAverageRatings(this.r.tour);
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
// Nested Get requests.
// Post/tour/tourid/review/
// Get/tour/tourid/review/
