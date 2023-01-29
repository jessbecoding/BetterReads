const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const { Authors } = require("../sequelize/models");
const { Events } = require("../sequelize/models");
const { Books } = require("../sequelize/models");
const models = require("../sequelize/models");

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
    req.session.user = author.dataValues;
    res.render("pages/authorDash", { user: req.session.user });
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const guest = await Authors.findOne({
    where: {
      id: 12,
    },
  });
  if (!guest) {
    res.status(400).render("pages/loginError");
  } else {
    req.session.user = guest.dataValues;
    res.redirect("/author/dash");
  }
});

router.get("/loggedOut", authenticate, (req, res) => {
  res.render("pages/loggedOut");
});

router.post("/logout", authenticate, (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      res.redirect("/author/loggedOut");
    });
  }
});

router.get("/dash", authenticate, (req, res) => {
  res.render("pages/authorDash", {
    user: { firstName: req.session.user.firstName },
  });
});

router.get("/events", authenticate, async (req, res) => {
  const authorEvents = await Events.findAll({
    where: {
      authorId: req.session.user.id,
    },
  });
  res.render("pages/authorEvents", {
    user: { firstName: req.session.user.firstName },
    authorEvents: authorEvents,
  });
});

router.post("/createEvent", authenticate, async (req, res) => {
  const { eventTitle, date, location, time, isFree, description } = req.body;
  await Events.create({
    eventTitle: eventTitle,
    date: date,
    location: location,
    time: time,
    isFree: isFree,
    description: description,
    authorId: req.session.user.id,
  });
  const authorEvents = await Events.findAll({
    where: {
      authorId: req.session.user.id,
    },
  });
  res.render("pages/authorEvents", {
    user: { firstName: req.session.user.firstName, id: req.session.user },
    authorEvents: authorEvents,
  });
});

router.get("/account", authenticate, (req, res) => {
  res.render("pages/authorAccount", {
    user: {
      email: req.session.user.email,
      firstName: req.session.user.firstName,
      lastName: req.session.user.lastName,
      funFact: req.session.user.funFact,
      id: req.session.user.id,
    },
  });
});

router.post("/updateAuthor", authenticate, async (req, res) => {
  const userId = req.session.user.id;
  const { firstName, lastName, email, funFact } = req.body;
  await Authors.update(
    {
      email: email,
      firstName: firstName,
      lastName: lastName,
      funFact: funFact,
      updatedAt: new Date(),
    },
    {
      where: {
        id: userId,
      },
    }
  );
  res.render("pages/updateSuccessful", {
    user: {
      email: req.session.user.email,
      firstName: req.session.user.firstName,
      lastName: req.session.user.lastName,
      funFact: req.session.user.funFact,
      id: req.session.user.id,
    },
  });
});

router.post("/updatePassword", authenticate, async (req, res) => {
  const { password, newPassword } = req.body;

  const author = await Authors.findOne({
    where: {
      id: req.session.user.id,
    },
  });

  bcrypt.compare(password, author.password, async (err, result) => {
    if (err) {
      res.send(err);
      return;
    }
    if (!result) {
      res.render("pages/loginError");
    } else {
      bcrypt.hash(newPassword, 10, async (err, hash) => {
        await Authors.update(
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

      req.session.user = author.dataValues;
      res.render("pages/updateSuccessful");
    }
  });
});

router.post("/deleteAccount", authenticate, async (req, res) => {
  await Authors.destroy({
    where: {
      id: req.session.user.id,
    },
  });
  if (req.session) {
    req.session.destroy((err) => {
      res.render("pages/userDeleted");
    });
  }
  res.render("pages/userDeleted");
});

router.get("/books", authenticate, async (req, res) => {
  const authorBooks = await Books.findAll({
    where: {
      authorId: req.session.user.id,
    },
  });
  res.render("pages/authorBooks", {
    user: { fistName: req.session.user.firstName },
    authorBooks: authorBooks,
  });
});

router.post("/addBook", authenticate, async (req, res) => {
  const { title, datePublished, description } = req.body;
  const authorId = req.session.user.id;
  await Books.create({
    title: title,
    datePublished: datePublished,
    description: description,
    authorId: authorId,
  });
  const authorBooks = await Books.findAll({
    where: {
      authorId: req.session.user.id,
    },
  });
  res.render("pages/authorBooks", {
    user: { firstName: req.session.user.firstName },
    authorBooks: authorBooks,
  });
});

// THESE ROUTES ARE DYNAMIC. THEY SHOULD BE AT THE BOTTOM.

router.get("/updateEvent/:id", authenticate, async (req, res) => {
  const eventToUpdate = await Events.findOne({
    where: {
      id: req.params.id,
    },
  });
  res.render("pages/authorUpdateEvent", {
    user: { firstName: req.session.user.firstName },
    eventToUpdate: eventToUpdate,
  });
});

router.post("/updateEvent/:id", authenticate, async (req, res) => {
  const { eventTitle, location, description } = req.body;
  await Events.update(
    {
      eventTitle: eventTitle,
      location: location,
      description: description,
      updatedAt: new Date(),
    },
    {
      where: {
        id: req.params.id,
      },
    }
  );
  const authorEvents = await Events.findAll({
    where: {
      authorId: req.session.user.id,
    },
  });
  res.render("pages/authorEvents", {
    user: { firstName: req.session.user.firstName },
    authorEvents: authorEvents,
  });
});

router.post("/deleteEvent/:id2", authenticate, async (req, res) => {
  const delEvent = req.params.id2;
  await Events.destroy({
    where: {
      id: delEvent,
    },
  });
  const authorEvents = await Events.findAll({
    where: {
      authorId: req.session.user.id,
    },
  });
  res.render("pages/authorEvents", {
    user: { firstName: req.session.user.firstName },
    authorEvents: authorEvents,
  });
});

router.get("/updateBook/:id", authenticate, async (req, res) => {
  const bookToUpdate = await Books.findOne({
    where: {
      id: req.params.id,
    },
  });
  res.render("pages/authorUpdateBook", {
    user: { firstName: req.session.user.firstName },
    bookToUpdate: bookToUpdate,
  });
});

router.post("/updateBook/:id", authenticate, async (req, res) => {
  const { title, datePublished, description } = req.body;
  await Books.update(
    {
      title: title,
      datePublished: datePublished,
      description: description,
      updatedAt: new Date(),
    },
    {
      where: {
        id: req.params.id,
      },
    }
  );
  const authorBooks = await Books.findAll({
    where: {
      authorId: req.session.user.id,
    },
  });
  res.render("pages/authorBooks", {
    user: { firstName: req.session.user.firstName },
    authorBooks: authorBooks,
  });
});

router.post("/deleteBook/:id2", authenticate, async (req, res) => {
  const delBook = req.params.id2;
  await Books.destroy({
    where: {
      id: delBook,
    },
  });
  const authorBooks = await Books.findAll({
    where: {
      authorId: req.session.user.id,
    },
  });
  res.render("pages/authorBooks", {
    user: { fistName: req.session.user.firstName },
    authorBooks: authorBooks,
  });
});

module.exports = router;
