"use strict";

const session = require("express-session");
const express = require("express");
const router = express.Router();
const models = require("../models");
const User = models.User;
const bcrypt = require("bcrypt");
const validator = require("validator");
const request = require("request");

let sess;

router.post("/inscription", (req, res, next) => {
	res.type("json");

	if (!validator.isEmail(req.body.emailAddress1)) {
		res.send({
			message: "It's not a mail address"
		});
	}

	if (req.body.emailAddress1 !== req.body.emailAddress2) {
		res.send({
			message: "Email addresses are not the same"
		});
	}

	if (req.body.password1.length < 8) {
		res.send({
			message: "Password must contains at least 8 characters"
		});
	}

	if (req.body.password1 !== req.body.password2) {
		res.send({
			message: "Passwords are not the same"
		});
	}

	User.find({
		"where": {
			"emailAddress": req.body.emailAddress1
		}
	}).then(user => {
		if (user) {
			res.send({
				message: "Email address is already used"
			});
		} else {
			User.create({
				emailAddress: req.body.emailAddress1,
				hashedPassword: bcrypt.hashSync(req.body.password1, 5)
			}).then(user => {
				if (user) {
					res.send({
						message: "Success"
					});
				} else {
					res.send({
						message: "Fail"
					});
				}
			}).catch(err => {
				res.send({
					err: err
				});
			});
		}
	}).catch(err => {
		res.send({
			msg: 'Unable to search user',
			err: err
		});
	});
});

router.post("/connect", (req, res, next) => {
	User.find({
		"where": {
			emailAddress: req.body.emailAddress
		}
	}).then(user => {
		if (user) {
			res.json({
				correct: bcrypt.compareSync(req.body.password, user.hashedPassword)
			});
		} else {
			res.json({
				message: "User doesn't exists"
			});
		}
	}).catch(err => {
		res.json(err);
	});
});

router.post("/editPassword", (req, res, next) => {
	res.type("json");

	if (req.body.newpassword1 !== req.body.newpassword2) {
		res.json({
			message: "Passwords are not equals"
		});
	}

	User.find({
		where: {
			emailAddress : req.body.emailAddress
		}
	}).then(user => {
		if (user) {
			if (!bcrypt.compareSync(req.body.actual, user.hashedPassword)) {
				res.json({
					message: "Password is not correct"
				});
			}
			user.updateAttributes({
				hashedPassword: bcrypt.hashSync(req.body.password1)
			});

			res.json({
				message: "Success"
			});
		} else {
			res.json({
				message: "Email address doesn't exists",
			});
		}
	}).catch (err => {
		res.json({
			err: err
		});
	});
});

router.post("/edit", (req, res, next) => {
	res.type("json");

	User.findOne({
		"where": {
			"emailAddress": req.body.existingEmailAddress
		}
	}).then(user => {
		if (user) {
			user.updateAttributes({
				handle: req.body.handle,
				emailAddress: req.body.emailAddress,
				lastName: req.body.lastName,
				firstName: req.body.firstName,
				phoneNumber: req.body.phoneNumber,
				newsletter: req.body.newsletter,
				picture: req.body.picture
			});

		} else {
			res.send({
				message: "User doesn't exists"
			});
		}
	}).catch(err => {
		res.send({ msg: 'Unable to search user', err: err });
	});
});

module.exports = router;
