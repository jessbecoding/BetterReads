const express = require("express");
const app = express();
const PORT = 3027;

app.use(express.json());

app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

app.listen(PORT, console.log(`Listening on port ${PORT}`));
