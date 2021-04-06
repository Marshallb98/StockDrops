const router = require("express").Router();
const itemRoutes = require("./items");
const userRoutes = require("./users");
router.use("/login", userRoutes);
router.use("/signup", userRoutes);
router.use("/items", itemRoutes);

module.exports = router;
