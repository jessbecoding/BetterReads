const express = require("express");
const router = express.Router();
const { Authors } = require("../sequelize/models/authors");

router.get("/account", (req, res) => {
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
    res.send(author);
  });
});

router.post("/login_author", async (req, res) => {
  const { email, password } = req.body;
  const author = await Authors.findOne({
    where: {
      email: email,
    },
    // if (!author) res.status(400).send("User not found.");
    // return;
  });
  bcrypt.compare(password, author.password, (err, result) => {
    if (err) {
      res.send(err);
      return;
    }
    if (!result) {
      res.status(401).send("Your email or password does not match.");
      return;
    }
    req.session.author = author.dataValues;
    res.status(200);
    res.redirect("pages/authorDash");
    return;
  });
  res.render("pages/login");
});

module.exports = router;
