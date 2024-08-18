const adsController = require("../controllers/adsController");

const express = require("express");
const ad = require("../models/ad");
const { requireLogin,requireapiLogin } = require("../controllers/userController");

const router = express.Router();

router.get("/", adsController.getApprovedAds);
router.get("/new", adsController.newAd);
router.get("/all", requireapiLogin, adsController.getAllAds);
router.get("/admin/", requireLogin, adsController.getAdmin);

router.post("/new", adsController.createAd);

router.get("/:id/approve", requireapiLogin, adsController.approveAd);

router.delete("/:id/delete", requireapiLogin, adsController.deleteAd);

module.exports = router;
