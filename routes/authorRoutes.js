const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const { Authors } = require("../sequelize/models");

router.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

router.use(bodyParser.json());
router.use(cookieParser());

router.get("/authorDash", (req, res) => {
  res.send(`Successful login, here is your account page, ${author.firstName}`);
});

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

router.post("/login_author", async (req, res) => {
  const { email, password } = req.body;
  const author = await Authors.findOne({
    where: {
      email: email,
    },
  });
  const validPassword = await bcrypt.compare(password, author.password);
  if (validPassword) {
    res.render("pages/authorDash", { author: author });
  } else {
    res
      .status(403)
      .send("That is not a valid user. Please check email and password.");
  }
});

module.exports = router;
