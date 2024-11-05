const mongoose = require('mongoose');
const dotenv = require('dotenv');

// uncaught excpetions must close the server
process.on('uncaughtException', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting Dow...');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);
// connects to the remote data.
mongoose.connect(DB).then(() => console.log('db connected'));

//Start server
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App Running on port ${port}....`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting Dow...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
