const express = require("express");
const router = express.Router();
const { Readers } = require("../sequelize/models/readers");

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
    res.send(reader);
  });
});

router.get("/account", (req, res) => {
  res.send(`Successful login, here is your account page, ${reader.firstName}`);
});

router.post("/login_reader", async (req, res) => {
  const { email, password } = req.body;
  const reader = await Reader.findOne({
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
      res.status(401).send("Your password does not match.");
      return;
    }
    res.status(200);
    res.redirect("/account");
    return;
  });
  res.render("pages/login");
});

module.exports = router;
