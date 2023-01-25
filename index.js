const express = require("express");
const app = express();
const PORT = 3027;
const authRoutes = require("./routes/authRoutes");
const authorRoutes = require("./routes/authorRoutes");
const readerRoutes = require("./routes/readerRoutes");

// MIDDLEWARE //
app.use(express.json());

app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

app.use("/auth", authRoutes);
app.use("/author", authorRoutes);
app.use("/reader", readerRoutes);
// MIDDLEWARE //

app.get("/", (req, res) => {
  res.send("Landing Page");
});

app.listen(PORT, console.log(`Listening on port ${PORT}`));
