const express = require("express");
const bcrypt = require("bcrypt");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const router = express.Router();
const { Authors } = require("../sequelize/models");

// MIDDLEWARE //
router.use(express.json());
const bodyParser = require("body-parser");

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
// MIDDLEWARE //

module.exports = router;
