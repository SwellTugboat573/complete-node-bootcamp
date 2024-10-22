const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');

//Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App Running on port ${port}....`);
});

const x = 65;
x = 34;
