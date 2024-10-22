const fs = require("fs");
const superagent = require("superagent");

// USING the .THEN method by creating promises and

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject(`I could not find that file 🥲`);
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject(`could not avoid data`);
      resolve("success");
    });
  });
};
/*
readFilePro(`${__dirname}/dog.txt`) // this is a promis and thus is controlled by the above.
  .then((data) => {
    // this is then a result based on the first call
    console.log(`BREED: ${data}`);
    // by adding the below return it is being called as soon as it comes back making it chained
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then((res) => {
    return writeFilePro("dog-img.txt", res.body.message);
    // fs.writeFile("dog-img.txt", res.body.message, (err) => {
    //   if (err) return console.log(err.message);
    //   console.log("random dog image saved to file!");
    // });
  })
  .then(() => {
    console.log(` ranndom dog image saved to file!`);
  })
  .catch((err) => {
    console.log(err.message);
  });
const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject(`I could not find that file 🥲`);
      resolve(data);
    });
  });
};
*/

const getDogPic = async () => {
  try {
    // async means to async in the background
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`BREED: ${data}`);
    const res = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    console.log(res.body);
    await writeFilePro("dog-img.txt", res.body.message);
    console.log(`file has been written: ${res.body.message}`);
  } catch (err) {
    console.log(err);
  }
};

getDogPic();
