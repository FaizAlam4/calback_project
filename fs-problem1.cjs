const fs = require("fs");
const readlineSync = require("readline-sync");

let range = Math.random() * 10;
range = Math.ceil(range);

let path = "./myFiles";

function fsProblem1(absolutePathOfRandomDirectory, randomNumberOfFiles) {
  let data = {
    name: "Faiz",
    age: "18",
  };

  data = JSON.stringify(data);

  function randomFileGenerator(
    absolutePathOfRandomDirectory,
    randomNumberOfFiles
  ) {
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

  fs.access(absolutePathOfRandomDirectory, (err) => {
    if (err) {
      console.log("No such directory, So I created it now..");
      fs.mkdir(absolutePathOfRandomDirectory, (err) => {
        if (err) {
          console.log("No permission for making the directory");
        } else {
          randomFileGenerator(
            absolutePathOfRandomDirectory,
            randomNumberOfFiles
          );
        }
      });
    } else {
      randomFileGenerator(absolutePathOfRandomDirectory, randomNumberOfFiles);
    }
  });
}

fsProblem1(path, range);
