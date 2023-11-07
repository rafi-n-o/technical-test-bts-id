var express = require("express");
var router = express.Router();

const verifyToken = require("../middlewares/verifyToken");
const itemController = require("../controllers/item");

router.post("/checklists/:id/items", verifyToken, itemController.create);

module.exports = router;
