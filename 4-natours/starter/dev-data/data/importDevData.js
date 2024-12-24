const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('./../../models/tourModels');
const Review = require('./../../models/reviewModels');
const User = require('./../../models/userModel');
dotenv.config({ path: './config.env' });

// console.log('Database URL:', process.env.DATABASE);
// console.log(__dirname);

const dataBase =
  'mongodb+srv://zacs:<PASSWORD>@cluster0.xhh1e.mongodb.net/natours?retryWrites=true&w=majority&appName=Cluster0';
const pw = 'WuRtbUfOfQUcCjAS';

const DB = dataBase.replace('<PASSWORD>', pw);

// connects to the remote data.
mongoose.connect(DB).then(() => console.log('db connected'));

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
const reviews = JSON.parse(
  fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8'),
);

// import data into database

const importData = async () => {
  try {
    await Tour.create(tours);
    await User.create(users, { validateBeforeSave: false });
    await Review.create(reviews);
    // console.log('data successfully loaded!');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};
// delete existing
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();
    // console.log('data successfully deleted!');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}

// console.log(process.argv);
