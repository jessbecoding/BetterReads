const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const { Authors } = require("../sequelize/models");
const { Readers } = require("../sequelize/models");
const { Events } = require("../sequelize/models");

// MIDDLE WARE
router.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
router.use(bodyParser.json());
router.use(cookieParser());
router.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 2592000000,
    },
  })
);
const authenticate = (req, res, next) => {
  if (req.session.user) {
    next();
  } else if (req.path == "/login") {
    next();
  } else {
    res.redirect("/login");
  }
};
// MIDDLEWARE

router.post("/create_reader", (req, res) => {
  const { email, password, firstName, lastName, funFact } = req.body;
  bcrypt.hash(password, 10, async (err, hash) => {
    const reader = await Readers.create({
      email: email,
      password: hash,
      firstName: firstName,
      lastName: lastName,
      funFact: funFact,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    res.render("pages/readerDash", { reader: reader });
  });
});

router.get("/account", (req, res) => {
  res.send(`Successful login, here is your account page, ${reader.firstName}`);
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const reader = await Readers.findOne({
    where: {
      email: email,
    },
  });
  bcrypt.compare(password, reader.password, (err, result) => {
    if (err) {
      res.send(err);
      return;
    }
    if (!result) {
      res.send("Login Credentials are invalid. Please try again.");
    } else {
      req.session.user = reader.dataValues;
      res.redirect("/reader/dash");
    }
  });
});

router.get("/dash", authenticate, (req, res) => {
  res.render("pages/readerDash");
});

module.exports = router;
