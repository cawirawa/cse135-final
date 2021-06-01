const express = require("express");
const path = require("path");

var router = express.Router();

const HTML_PATH = path.join(__dirname + "/../html/");

// Dashboard
router.get("/", (req, res) => {
  if (!req.session.loggedIn) {
    return res.redirect("/login");
  }
  res.sendFile(path.join(HTML_PATH + "dashboard.html"));
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) return res.redirect("/");
  res.sendFile(path.join(HTML_PATH + "login.html"));
});

router.get("/logout", (req, res) => {
  req.session.loggedIn = false;
  req.session.isAdmin = false;
  req.session.destroy();
  res.cookie("isAdmin", "false").sendFile(path.join(HTML_PATH + "logout.html"));
});

router.get("/users", (req, res) => {
  if (!req.session.isAdmin) return res.redirect("/");
  res.sendFile(path.join(HTML_PATH + "users.html"));
});

module.exports = router;
