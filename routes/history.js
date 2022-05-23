const express = require("express");

const router = express.Router();

const {saveHistory, getAllHistories , getSingleHistory} = require("../controllers/history");

router.post("/", saveHistory);
router.get("/", getAllHistories);
router.get("/:id", getSingleHistory);

module.exports = router;