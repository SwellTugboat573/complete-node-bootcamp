const mongoose = require('mongoose');
const dotenv = require('dotenv');
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
app.listen(port, () => {
  console.log(`App Running on port ${port}....`);
});
