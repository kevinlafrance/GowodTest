const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dbConfig = require("./db.config");
const db = require("../backend/models");

const app = express();

var corsOptions = {
  origin: "http://localhost:3000"
};

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Enfin MONGODB.");
  })
  .catch(err => {
    console.error("C'est pas encore bon MongoDB", err);
    process.exit();
  });
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
require('../backend/models/userModel');



// simple route
require('../backend/routes/userRouter')(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});