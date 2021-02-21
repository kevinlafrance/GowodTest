const express = require("express");
const dbConfig = require("./db.config");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const user = require('./routes/userRoutes');
const app = express();

mongoose
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

 //var routes = require('./routes/index');


app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// app.use('/', routes);
app.use('/user', user);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});