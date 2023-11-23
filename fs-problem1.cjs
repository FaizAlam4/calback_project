const fs = require("fs");
const readlineSync = require("readline-sync");

let range = Math.random() * 10 + 1;
range = Math.floor(range);

let path = "./myFiles";

function fsProblem1(absolutePathOfRandomDirectory, randomNumberOfFiles) {
  fs.access(absolutePathOfRandomDirectory, (err) => {
    if (err) {
      console.log("no such directory exists, I'll make it..");
      fs.mkdir(absolutePathOfRandomDirectory, (err) => {
        if (err) {
          console.log("There is an error in making directory");
        } else {
          randomFileGenerator(
            absolutePathOfRandomDirectory,
            randomNumberOfFiles,
            deleteFile
          );
        }
      });
    } else {
      randomFileGenerator(
        absolutePathOfRandomDirectory,
        randomNumberOfFiles,
        deleteFile
      );
    }
  });

  let randomFileGenerator = (
    absolutePathOfRandomDirectory,
    randomNumberOfFiles,
    callback
  ) => {
    for (let index = 1; index <= randomNumberOfFiles; index++) {
      fs.writeFile(
        `${absolutePathOfRandomDirectory}/generatedFile${index}.json`,
        '{"message":"welcome"}',
        (err) => {
          if (err) {
            console.log("Couldn't write or create files..");
          }
        }
      );
    }
    let answer = readlineSync.question("Do you want to delete files(y/n)");
    if (answer == "y") {
      callback(absolutePathOfRandomDirectory);
    }
  };

  let deleteFile = (absolutePathOfRandomDirectory) => {
    fs.readdir(absolutePathOfRandomDirectory, "utf-8", (err, data) => {
      if (err) {
        console.log(err);
      } else {
        data = data.toString();

        let fileNames = data.split(",");
        fileNames.forEach((ele) => {
          fs.unlink(absolutePathOfRandomDirectory + "/" + ele, (err) => {
            if (err) {
              console.log("Can't delete");
            } else {
              console.log("Files deleted successfully!");
            }
          });
        });
      }
    });
  };
}

fsProblem1(path, range);
