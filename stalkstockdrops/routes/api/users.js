const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../../models/");
const { authenticateUser } = require("../../middlewares");
// 
router.get("/dashboard", authenticateUser, (req, res) => {
  res.send({ protected: "yoooooo" });
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    //Finds looks to see if there is a user with this email then if true it compares the passwords to see if they match
    const user = await db.User.findOne({ email });
    if (user) {
      const isPassword = await bcrypt.compare(password, user.password);
      if (isPassword) {
        //If user is authenticated then it is signed with a token
        const token = await jwt.sign(
          { email: user.email },
          process.env.JWT_SECRET_KEY
        );
        //Sends token session storage 
        res.send({ token });
      } else {
        res.status(400).send({ error: "Invalid Username/Password" });
      }
    } else {
      res.status(400).send({ error: "Invalid Username/Password" });
    }
  } catch (err) {
    res.status(400).send(err);
  }

});

router.post("/register", async (req, res) => {
  try {
    const saltFactor = 10;
    req.body.password = await bcrypt.hash(req.body.password, saltFactor);
    const user = await db.User.create(req.body);
    if (user) {
      console.log("JWT_SECRET_KEY==>>", process.env.JWT_SECRET_KEY);
      const token = await jwt.sign(
        { email: user.email },
        process.env.JWT_SECRET_KEY
      );
      res.send({ token });
    } else {
      res.status(400).send({ error: "Unable to create user" });
    }
  } catch (err) {
    res.status(400).send(err);
  }
});
module.exports = router;