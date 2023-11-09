const mongoose = require("mongoose");
const app = require("./app");
const { DB_URI } = process.env;

mongoose.set("strictQuery", true);

mongoose.connect(DB_URI)
.then(() => {
  app.listen(3000, () => {
      console.log("Database connection successful");
    });
  })
    .catch(error => {
      console.log(error.message);
      process.exit(1);
    });

