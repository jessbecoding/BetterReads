const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const { Readers } = require("../sequelize/models");
const { Events } = require("../sequelize/models");
const { Books } = require("../sequelize/models");
const models = require("../sequelize/models");
const { runInNewContext } = require("vm");

// MIDDLE WARE
router.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
router.use(bodyParser.json());
router.use(cookieParser());
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const store = new SequelizeStore({ db: models.sequelize });
router.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    store: store,
  })
);
store.sync();
const authenticate = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect("/login");
  }
};
// MIDDLEWARE

// LOGIN LOGOUT
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const reader = await Readers.findOne({
    where: {
      email: email,
    },
  });
  if (!reader) {
    res.status(400).render("pages/loginError");
  } else {
    bcrypt.compare(password, reader.password, (err, result) => {
      if (err) {
        res.send(err);
        return;
      }
      if (!result) {
        res.render("pages/loginError");
      } else {
        req.session.user = reader.dataValues;
        res.redirect("/reader/dash");
      }
    });
  }
});

router.post("/logout", authenticate, (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      res.redirect("/reader/loggedOut");
    });
  }
});

// CREATE
router.post("/create_reader", (req, res) => {
  const { email, password, nickname, funFact } = req.body;
  bcrypt.hash(password, 10, async (err, hash) => {
    const reader = await Readers.create({
      email: email,
      password: hash,
      nickname: nickname,
      funFact: funFact,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    req.session.user = author.dataValues;
    res.render("pages/readerDash", { user: req.session.user });
  });
});

// READ
router.get("/events", authenticate, async (req, res) => {
  const readerEvents = await Events.findAll();
  res.render("pages/readerEvents", {
    reader: { nickname: req.session.user.nickname },
    readerEvents: readerEvents,
  });
});

router.get("/books", authenticate, async (req, res) => {
  const readerBooks = await Books.findAll();
  res.render("pages/readerBooks", {
    reader: { nickname: req.session.user.nickname },
    readerBooks: readerBooks,
  });
});

// UPDATE
router.post("/updateReader", authenticate, async (req, res) => {
  const userId = req.session.user.id;
  const { email, nickname, funFact } = req.body;
  await Readers.update(
    {
      email: email,
      nickname: nickname,
      funFact: funFact,
      updatedAt: new Date(),
    },
    {
      where: {
        id: userId,
      },
    }
  );
  res.redirect("/reader/updateSucess");
});

router.post("/updatePassword", authenticate, async (req, res) => {
  const { password, newPassword } = req.body;
  const reader = await Readers.findOne({
    where: {
      id: req.session.user.id,
    },
  });
  bcrypt.compare(password, reader.password, async (err, result) => {
    if (err) {
      res.send(err);
      return;
    }
    if (!result) {
      res.render("pages/loginError");
    } else {
      bcrypt.hash(newPassword, 10, async (err, hash) => {
        await Readers.update(
          {
            password: hash,
            updatedAt: new Date(),
          },
          {
            where: {
              id: req.session.user.id,
            },
          }
        );
      });
    }
  });
  res.redirect("/reader/updateSucess");
});

// DESTROY
router.post("/deleteReader", authenticate, async (req, res) => {
  const { password } = req.body;
  const reader = await Readers.findOne({
    where: {
      id: req.session.user.id,
    },
  });
  bcrypt.compare(password, reader.password, async (err, result) => {
    if (err) {
      res.send(err);
      return;
    }
    if (!result) {
      res.render("pages/loginError");
    } else {
      const delReader = await Readers.destroy({
        where: {
          id: req.session.user.id,
        },
      });
    }
  });
  res.render("pages/userDeleted");
});

// PAGES
router.get("/account", (req, res) => {
  res.render("pages/readerAccount", {
    reader: {
      email: req.session.user.email,
      nickname: req.session.user.nickname,
      funFact: req.session.user.funFact,
      id: req.session.user.id,
    },
  });
});

router.get("/dash", authenticate, (req, res) => {
  res.render("pages/readerDash", {
    reader: {
      email: req.session.user.email,
      nickname: req.session.user.nickname,
      funFact: req.session.user.funFact,
      id: req.session.user.id,
    },
  });
});

router.get("/search", authenticate, async (req, res) => {
  res.render("pages/readerSearchEvents");
});

router.get("/loggedOut", (req, res) => {
  res.render("pages/loggedOut");
});

router.get("/updateSucess", authenticate, (req, res) => {
  res.render("pages/updateSuccessfulReader", {
    user: {
      email: req.session.user.email,
      nickname: req.session.user.nickname,
      funFact: req.session.user.funFact,
      id: req.session.user.id,
    },
  });
});

module.exports = router;
