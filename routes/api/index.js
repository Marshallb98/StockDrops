const router = require("express").Router();
const itemRoutes = require("./items");
const usersRoutes = require("./users");
router.use("/users", usersRoutes);
router.use("/items", itemRoutes);

module.exports = router;
