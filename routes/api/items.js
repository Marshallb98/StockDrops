const router = require("express").Router();
const itemsController = require("../../controllers/itemsController");

// Matches with "/api/items"
router.route("/")
  .get(itemsController.findAll)

// Matches with "/api/books/:id"
// router
//   .route("/:id")
//   .get(itemsController.findById)
//   .put(itemsController.update)
//   .delete(itemsController.remove);

module.exports = router;
