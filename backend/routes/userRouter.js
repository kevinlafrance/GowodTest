const { signUp } = require("../middlewares");
const Usercontroller = require("../controllers/userControllers");

module.exports = function(app) {

  app.post(
    "/api/auth/signup",
    Usercontroller.signup
  );

  app.post("/api/auth/signin", Usercontroller.signin);
};