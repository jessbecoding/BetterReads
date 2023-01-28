const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const { Authors } = require("../sequelize/models");
const { Events } = require("../sequelize/models");

// MIDDLEWARE
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
// MIDDLEWARE

router.post("/create_author", (req, res) => {
  const { email, password, firstName, lastName, funFact } = req.body;
  bcrypt.hash(password, 10, async (err, hash) => {
    const author = await Authors.create({
      email: email,
      password: hash,
      firstName: firstName,
      lastName: lastName,
      funFact: funFact,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    res.render("pages/authorDash", { author: author });
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const author = await Authors.findOne({
    where: {
      email: email,
    },
  });
  bcrypt.compare(password, author.password, (err, result) => {
    if (err) {
      res.send(err);
      return;
    }
    if (!result) {
      res.send("Login Credentials are invalid. Please try again.");
    } else {
      req.session.user = author.dataValues;
      res.redirect("/dash");
    }
  });
});

router.get("/dash", (req, res) => {
  console.log(req.session.user);
  res.render("pages/authorDash");
});

router.get("/events", async (req, res) => {
  const allEvents = await Events.findAll();
  res.render("pages/authorEvents", {
    allEvents: allEvents,
  });
});

router.post("/createEvent", async (req, res) => {
  const { eventTitle, date, location, time, isFree, description, email } =
    req.body;
  const author = await Authors.findOne({
    where: {
      email: email,
    },
  });
  console.log(author);
  const event = await Events.create({
    eventTitle: eventTitle,
    date: date,
    location: location,
    time: time,
    isFree: isFree,
    description: description,
    authorId: author.id,
  });
  res.render("pages/authorEvents");
});

router.get("/authorAccount", (req, res) => {
  res.render("pages/authorAccount");
});

module.exports = router;
