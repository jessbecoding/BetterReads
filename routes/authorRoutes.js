const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const { Authors } = require("../sequelize/models");
const { Events } = require("../sequelize/models");
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
		res.render("pages/authorDash", { author: author });
	});
});

router.post("/login", async (req, res) => {
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
			res.send("Login Credentials are invalid. Please try again.");
		} else {
			req.session.user = author.dataValues;
			res.redirect("/author/dash");
		}
	});
});

router.post("/logout", (req, res) => {
	if (req.session) {
		req.session.destroy((err) => {
			res.redirect("/login");
		});
	}
});

router.get("/dash", authenticate, (req, res) => {
	res.render("pages/authorDash", {
		user: { fistName: req.session.user.firstName },
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
	const newEvent = await Events.create({
		eventTitle: eventTitle,
		date: date,
		location: location,
		time: time,
		isFree: isFree,
		description: description,
		authorId: req.session.user.id,
	});
	res.render("pages/authorEvents");
});

router.get("/account", authenticate, (req, res) => {
	res.render("pages/authorAccount");
});

router.get("/books", authenticate, (req, res) => {
	res.render("pages/authorBooks", {
		user: { fistName: req.session.user.firstName },
	});
});

router.delete("/deleteEvent/:id2", authenticate, async (req, res) => {
	const delEvent = req.params.id2;
	await delEvent.destroy();
	res.render("pages/events");
});

// THIS ROUTE IS DYNAMIC. IT NEEDS TO BE AT THE BOTTOM.
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

module.exports = router;
