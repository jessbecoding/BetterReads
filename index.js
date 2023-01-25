const express = require("express");
const app = express();
const PORT = 3027;
const authRoutes = require("./routes/authRoutes");
const authorRoutes = require("./routes/authorRoutes");
const readerRoutes = require("./routes/readerRoutes");
const session = require("express-session");
const cookieParser = require("cookie-parser");

// MIDDLEWARE //
app.use(express.json());
app.use(cookieParser());
app.use(
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
