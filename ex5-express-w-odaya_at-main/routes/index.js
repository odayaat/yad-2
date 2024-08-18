var express = require("express");
var router = express.Router();

const { getApprovedAds } = require("../controllers/adsController");

router.get("/", getApprovedAds);

router.use("/ads", require("./ads"));
router.use("/users", require("./users"));

module.exports = router;
