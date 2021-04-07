const router = require("express").Router();
const itemsController = require("../../controllers/itemsController");

router.route("/")
  .get(itemsController.findAll)


module.exports = router;
