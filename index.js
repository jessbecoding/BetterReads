const express = require("express");
const app = express();
const PORT = 3027;
const authorRoutes = require("./routes/authorRoutes");
const readerRoutes = require("./routes/readerRoutes");
const guestRoutes = require("./routes/guestRoutes");
const path = require("path");

// MIDDLEWARE //
app.use(express.json());
const bodyParser = require("body-parser");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.set("views", path.join(__dirname, "views"));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

app.use("/author", authorRoutes);
app.use("/reader", readerRoutes);
app.use("/guest", guestRoutes);
// MIDDLEWARE //

app.get("/", (req, res) => {
  res.render("pages/index");
});

app.get("/login", (req, res) => {
  res.render("pages/login");
});

app.get("/signup", (req, res) => {
  res.render("pages/signup");
});

app.get("/about", (req, res) => {
  res.render("pages/about");
});

app.get("/contact", (req, res) => {
  res.render("pages/contact");
});

app.listen(PORT, console.log(`Listening on port ${PORT}`));
