var express = require("express");
var router = express.Router();

const verifyToken = require("../middlewares/verifyToken");
const checklistController = require("../controllers/checklist");
const itemController = require("../controllers/item");

router.get("/", verifyToken, checklistController.getAll);
router.post("/", verifyToken, checklistController.create);
router.delete("/:id", verifyToken, checklistController.destroy);

router.post("/:checklistId/items", verifyToken, itemController.create);
router.get("/:checklistId/items", verifyToken, itemController.getAll);
router.get("/:checklistId/items/:id", verifyToken, itemController.get);
router.delete("/:checklistId/items/:id", verifyToken, itemController.destroy);
router.put("/:checklistId/items/:id", verifyToken, itemController.updateStatus);
router.put(
  "/:checklistId/items/rename/:id",
  verifyToken,
  itemController.rename
);

module.exports = router;
