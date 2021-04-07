const router = require("express").Router();
const passport = require("passport");
const db = require("../../models/");
const bcrypt = require("bcryptjs");
require("../../config/passport")(passport);
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) 
        throw err;
    if (!user)console.log(" error "), res.send("No User Exists");
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send("Successfully Authenticated");
        console.log(req.user);
      });
    }
  })(req, res, next);
});

router.post("/register", (req, res) => {
  db.User.findOne({ email: req.body.email }, async (err, doc) => {
    if (err) throw err;

    if (doc) res.send("User Already Exists");

    if (!doc) {
      console.log("password " + req.body.password);
      const hashedPassword = await bcrypt.hash(req.body.password, 6);

      const newUser = new db.User({
        email: req.body.email,
        password: hashedPassword,
      });
      await newUser.save();
      res.send("User Created");
    }
  });
});
module.exports = router;
