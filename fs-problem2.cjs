const fs = require("fs");

let myFunc = () => {
  let appendMyFile = (filePath, nameOfFile) => {
    fs.appendFile(filePath, nameOfFile, (err) => {
      if (err) {
        console.log("Could not add new file..");
        return;
      }

      fs.readFile(nameOfFile, "utf-8", (err, data) => {
        if (err) {
          console.log("there is an error in reading new file");
          return;
        }
        data = data.toLowerCase();
        let arr = data.split(".");
        arr = arr.join("\n");
        console.log(typeof arr);
        fs.writeFile("./newLipsum2.txt", arr, (err) => {
          if (err) {
            console.log("fai");
            return;
          }
          fs.appendFile("./fileName.txt", "./newLipsum2.txt", (err) => {
            if (err) {
              confirm.log("Error:", err);
              return;
            }
            fs.readFile("./newLipsum2.txt", "utf-8", (err, data) => {
              if (err) {
                console.log(err);
                return;
              }
              let dataArray = data.split("\n");
              dataArray.sort();
              let myData = dataArray.join("\n").trim();
              fs.writeFile("./newLipsum3.txt", myData, (err) => {
                if (err) {
                  console.log(err);
                  return;
                }
                fs.appendFile("./fileName.txt", "./newLipsum3.txt", (err) => {
                  if (err) {
                    console.log(err);
                    return;
                  }
                  fs.readFile("./fileName.txt", "utf-8", (err, data) => {
                    if (err) {
                      console.log(err);
                      return;
                    }
                    data = data.split("./");
                    console.log(data);
                    for (let myData of data) {
                      if (myData != "newLipsum.txt") {
                        fs.unlink(myData, (err) => {
                          if (err) console.log(err);
                          return;
                        });
                      }
                    }
                  });
                });
              });
            });
          });
        });
      });
    });
  };

  let writeMyFile = (name, data, callback) => {
    fs.writeFile(name, data, (err) => {
      if (err) {
        console.log(
          "Error occured while writing the generated data in new file!"
        );
      }
      callback("fileName.txt", name);
    });
  };
  let readMyFile = (fileNamePath, callback) => {
    fs.readFile(fileNamePath, "utf-8", (err, data) => {
      if (err) {
        console.log("There is an error while reading your file!");
      }
      data = data.toUpperCase();

      callback("./newLipsum.txt", data, appendMyFile);
    });
  };
  readMyFile("./givenContent/lipsum.txt", writeMyFile);
};
myFunc();
