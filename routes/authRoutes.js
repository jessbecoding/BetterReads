const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const { Authors } = require("../sequelize/models");
const { application } = require("express");

router.use(express.json());

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
  });
  bcrypt.compare(password, author.password, (err, result) => {
    if (err) {
      res.send(err);
      return;
    }
    if (!result) {
      res.status(401).send("Your password does not match.");
      return;
    }
    res.status(200).send("Email and Password Match");
  });
});

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

router.post("/login_reader", async (req, res) => {
  const { email, password } = req.body;
  const author = await Reader.findOne({
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
    res.status(200).send("Email and Password Match");
  });
});

module.exports = router;
