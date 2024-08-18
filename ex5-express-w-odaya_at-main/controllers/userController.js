const User = require("../models/user");
const bcrypt = require("bcrypt");

module.exports = {
  async getLogin(req, res, next) {
    if (req.session.user) {
      return res.redirect("/ads/admin");
    }

    User.findOrCreate({
      where: { username: "admin" },
      defaults: { username: "admin", password: "admin" },
    }).then((user) => {
      User.findOrCreate({
        where: { username: "admin2" },
        defaults: { username: "admin2", password: "admin2" },
      });
    });

    res.render("login", { error: req.flash("error") });
  },

  async login(req, res, next) {
    if (!req.body.username || !req.body.password) {
      req.flash("error", "Username and password are required");
      return res.render("login", { error: req.flash("error") });
    }

    const user = await User.findOne({ where: { username: req.body.username } });

    if (!user) {
      return res.status(400).send("Invalid credentials");
    }

    const validPassword = user.password == req.body.password;

    if (!validPassword) {
      req.flash("error", "Invalid credentials");
      return res.render("login", { error: req.flash("error") });
    }

    req.session.user = user;

    return res.redirect("/ads/admin");
  },

  async logout(req, res, next) {
    req.session.destroy();
    res.redirect("/");
  },

  async performRegister(req, res, next) {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).send("Username and password are required");
    }

    const user = await User.findOne({ where: { username } });

    console.log("user: ", user);

    if (user) {
      return res.status(400).send("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ username, password: hashedPassword });
    res.redirect("/login");
  },

  requireLogin(req, res, next) {
    if (!req.session.user) {
      return res.redirect("/users/login");
    }
    next();
  },

  requireapiLogin(req, res, next) {
    if (!req.session.user) {
      return res.status(401).send("invalid you are not autorise ");
    }
    next();
  },
};
