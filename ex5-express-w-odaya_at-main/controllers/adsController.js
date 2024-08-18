// Import necessary modules
const ejs = require("ejs");
const Ad = require("../models/ad");

// Export controller functions
module.exports = {
  // Controller function to render the new ad form
  newAd(req, res) {
    // Render the ads-new template and pass userdata to it
    res.render("ads-new", { userdata: { email: req.cookies.email, date: req.cookies.date } });
  },

  // Controller function to create a new ad
  async createAd(req, res) {
    // Extract ad data from request body
    const adData = req.body;

    // Check if title is provided
    if (!adData.title) {
      return res.status(400).send("Title is required");
    }

    try {
      // Create a new ad using adData
      const newAd = await Ad.create(adData);
      // Set flash message for success
      req.flash("success", "Ad created successfully");
      // Set cookies for email and date
      res.cookie("email", newAd.email);
      res.cookie("date", newAd.createdAt);
      // Redirect to homepage after ad creation
      res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  },

  // Controller function to approve an ad
  async approveAd(req, res) {
    // Extract adId from request parameters
    const adId = req.params.id;
    try {
      // Find ad by primary key
      const ad = await Ad.findByPk(adId);

      // If ad is not found, return 404 error
      if (!ad) {
        return res.status(404).send({ message: "Ad not found" });
      }

      // Update isApproved status to true and save
      ad.isApproved = true;
      await ad.save();
      // Send updated ad data
      return res.status(200).send(ad);
    } catch (error) {
      // Handle unexpected errors
      res.status(500).send("An unexpected error occurred");
      console.log(error);
    }
  },

  // Controller function to get all approved ads
  async getApprovedAds(req, res) {
    try {
      // Find all ads where isApproved is true
      const ads = await Ad.findAll({
        where: {
          isApproved: true,
        },
      });

      // Render the home template with ads data
      res.render("home", { ads });
    } catch (error) {
      console.log(error);
    }
  },

  // Controller function to render the admin page
  getAdmin(req, res) {
    // Render the admin template with admin layout
    res.render("admin", { layout: "layouts/admin" });
  },

  // Controller function to get all ads
  async getAllAds(req, res) {
    try {
      // Find all ads
      const ads = await Ad.findAll();

      // Send all ads data as response
      res.status(200).send(ads);
    } catch (error) {
      // Handle unexpected errors
      console.log(error);
      res.status(500).send("An unexpected error occurred");
    }
  },

  // Controller function to delete an ad
  async deleteAd(req, res) {
    // Extract adId from request parameters
    const adId = req.params.id;

    try {
      // Find ad by primary key
      const ad = await Ad.findByPk(adId);

      // If ad is not found, return 404 error
      if (!ad) {
        res.status(404).send("Ad not found");
      }

      // Delete the ad
      await ad.destroy();
      // Send success message
      res.status(204).send("Ad deleted successfully");
    } catch (error) {
      // Handle unexpected errors
      res.status(500).send("An unexpected error occurred");
    }
  },
};
