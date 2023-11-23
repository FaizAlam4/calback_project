const fs = require("fs");

fs.readFile("./givenContent/lipsum.txt", "utf-8", (err, data) => {
  if (err) {
    console.log("There is an error while reading your file!");
  }
  data = data.toUpperCase();
  console.log(data);

  fs.writeFile("./newLipsum.txt", data, (err) => {
    if (err) {
      console.log(
        "Error occured while writing the generated data in new file!"
      );
    }
  });
});
