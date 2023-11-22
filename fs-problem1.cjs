const fs = require("fs");
const readlineSync = require("readline-sync");

let data = {
  name: "Faiz",
  age: "18",
};

data = JSON.stringify(data);

let range = Math.random() * 10;
range = Math.floor(range);

let path = "./myFiles";

function fsProblem1(absolutePathOfRandomDirectory, randomNumberOfFiles) {
  for (let i = 0; i <= randomNumberOfFiles; i++) {
    fs.writeFile(
      `${absolutePathOfRandomDirectory}/file${i}.json`,
      data,
      (err) => {
        if (err) {
          console.log("There is an error:", err);
        }
      }
    );
  }
  let answer = readlineSync.question(
    "Do you want to delete them simultaneously (y/n)?"
  );
  if (answer == "y") {
    fs.readdir(`${absolutePathOfRandomDirectory}`, (err, files) => {
      if (err) {
        console.log(err);
      }
      files = files.toString();
      let filesArray = files.split(",");
      console.log(filesArray);

      filesArray.forEach((myFile) => {
        fs.unlink(`${absolutePathOfRandomDirectory}/${myFile}`, (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log("no error, files deleted successfully!");
          }
        });
      });
    });
  }
}

fsProblem1(path, range);
