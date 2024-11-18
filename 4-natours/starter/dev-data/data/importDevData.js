const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('./../../models/tourModels');
dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);
// connects to the remote data.
mongoose.connect(DB).then(() => console.log('db connected'));

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));

// import data into database

const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('data successfully loaded!');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};
// delete existing
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('data successfully deleted!');
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

console.log(process.argv);
