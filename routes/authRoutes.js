const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

router.post("/create_author", (req, res) => {
  const password = "password";
  bcrypt.hash(password, 10, (err, hash) => {
    console.log(err);
    console.log(hash);
  });
  res.send("Create User");
});

module.exports = router;
