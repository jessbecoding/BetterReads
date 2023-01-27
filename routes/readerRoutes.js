const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const { Readers } = require("../sequelize/models");

const bodyParser = require("body-parser");

router.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

router.use(bodyParser.json());

router.use(cookieParser());

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

router.post("/login_reader", async (req, res) => {
  const { email, password } = req.body;
  const reader = await Readers.findOne({
    where: {
      email: email,
    },
  });
  const validPassword = await bcrypt.compare(password, reader.password);
  if (validPassword) {
    res.render("pages/readerDash", { reader: reader });
  } else {
    res
      .status(403)
      .send("That is not a valid user. Please check email and password.");
  }
});

module.exports = router;
