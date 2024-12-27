const mongoose = require('mongoose');
const slugify = require('slugify');
const User = require('./userModel');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name'], // first attribute meants it is required. second is the err message.
      unique: true,
      trim: true,
      maxlength: [40, 'A tour name must be have =<40 Characters'],
      minlength: [10, 'A tour name must be have >=10 Characters'],
      // validate: [validator.isAlpha, 'Tour name must only contain characters'],
    },
    slug: {
      type: String,
    },
    duration: {
      type: Number,
      required: [true, 'a tour must have a duration'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, ' a tour must havea group size'],
    },
    difficulty: {
      type: String,
      required: [true, 'tour must havea difficulty'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficult is either: easy, medium, difficult',
      },
    },
    ratingsAverage: {
      type: Number,
      default: 0,
      min: [1, 'Rating must be above 1'],
      max: [5, 'Rating must be below 5'],
      set: (val) => Math.round(val * 10) / 10,
    },
    ratingQuantity: {
      type: Number,
      default: 4.5,
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price'],
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          return val < this.price; // this is a custom field . this is the object it's currently. custom validators won't work on updates. this isn't available for update functions.
        },
        message: 'Discount price (${VALUE}) should be below regular price',
      },
    },
    summary: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, 'Tour must have a cover image'],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false,
    },
    startLocation: {
      // GeoJSON
      type: {
        type: String,
        default: 'Point',
        enum: ['Point'],
      },
      coordinates: [Number],
      address: String,
      description: String,
    },
    locations: [
      {
        type: {
          type: String,
          default: 'Point',
          enum: ['Point'],
        },
        coordinates: [Number],
        address: String,
        description: String,
        day: Number,
      },
    ],
    guides: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    ],
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } },
);

// tourSchema.index({ price: 1 });
tourSchema.index({ price: 1, ratingsAverage: -1 });
tourSchema.index({ slug: 1 });
tourSchema.index({ 'startLocation.corrdinates': '2dsphere' });
// regular function was used because of the require,ent of the this key work. arrow functions don't recieve a this keywork. This virtual value will only appear in the system and not to the database.
// done in the model to keep the model thick and the controller thin.
tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});
// Virtual properties.
tourSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'tour', //the key in the other table
  localField: '_id', //where the foriegn key is stored in the query.
});
//.pre = runs before the event middle ware is also a hook.
// DOCUEMTN MIDDLEWARE: runs before .save and .cerat but not if .insertmany.
tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});
// });
// tourSchema.pre('save', function (next) {
//   console.log('will save docuemnt... ');
//   next();
// });
// .POST  will take the
// tourSchema.post('save', function (doc, next) {
//   console.log(doc);
//   next();
// });

//QUERY MIDDLEWARE
// changing the save to find makes it query middleware. Good to use if only for vip clients.
// tourSchema.pre('find', function (next) this only is for the find method . make it a regular expression like above to get all queries that contain/start w/ find.
tourSchema.pre('save', async function (next) {
  const guidesPromises = this.guides.map(async (id) => await User.findById(id));

  this.guides = await Promise.all(guidesPromises);
  next();
});

tourSchema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } });

  this.start = Date.now();
  next();
});

tourSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'guides',
    select: '-__v -passwordChangedAt',
  });
  next();
});

tourSchema.post(/^find/, function (docs, next) {
  // console.log(`query took ${Date.now() - this.start}`);
  //console.log(docs);
  next();
});

//AGGREGATION MIDDLEWARE

// tourSchema.pre('aggregate', function (next) {
//   this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
//   console.log(this.pipeline(), 'pre aggregrrate called');
//   next();
// });

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
