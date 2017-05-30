"use strict";

const session = require("express-session");
const express = require("express");
const router = express.Router();
const models = require("../models");
const User = models.User;
const bcrypt = require("bcrypt");
const validator = require("validator");
const randomPassword = require('string_random.js');

let sess;

router.post("/login", function(req, res, next) {
	res.type("json");

	User.findOne({
		where: {
			emailAddress: req.body.emailAddress
		}
	}).then(user => {
		if (user) {
			if (bcrypt.compareSync(req.body.password, user.hashedPassword)) {
				sess = req.session;

				sess.firstName = user.firstName;
				sess.lastName = user.lastName;
				sess.emailAddress = user.emailAddress;

				console.log(sess);

				res.json({
					msg: 'You are connected'
				});
			} else {
				res.json({
					msg: 'Wrong login infos'
				});
			}
		} else {
			res.json({
				msg: 'You are not connected'
			});
		}
	}).catch(err => {
		console.log(err);
		res.json({
			msg: 'not ok',
			err: err
		});
	});
});

router.post("/inscription", (req, res, next) => {
	res.type("json");

	if (!validator.isEmail(req.body.emailAddress1)) {
		res.json({
			message: "It's not a mail address"
		});
	}

	if (req.body.emailAddress1 !== req.body.emailAddress2) {
		res.json({
			message: "Email addresses are not the same"
		});
	}

	if (req.body.password1.length < 8) {
		res.json({
			message: "Password must contains at least 8 characters"
		});
	}

	if (req.body.password1 !== req.body.password2) {
		res.json({
			message: "Passwords are not the same"
		});
	}

	User.find({
		"where": {
			"emailAddress": req.body.emailAddress1
		}
	}).then(user => {
		if (user) {
			res.json({
				message: "Email address is already used"
			});
		} else {
			User.create({
				handle: "",
				emailAddress: req.body.emailAddress1,
				lastName: "",
				firstName: "",
				phoneNumber: "",
				newsletter: false,
				picture: "",
				hashedPassword: bcrypt.hashSync(req.body.password1, 5)
			}).then(user => {
				if (user) {
					res.json({
						message: "Success"
					});
				} else {
					res.json({
						message: "Fail"
					});
				}
			}).catch(err => {
				res.json({
					err: err
				});
			});
		}
	}).catch(err => {
		res.json({
			msg: 'Unable to search user',
			err: err
		});
	});
});

router.post("/editPassword", (req, res, next) => {
	res.type("json");

	if (!sess) {
		res.json({
			message: "You are not connected"
		});
	}

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

	if (!sess) {
		res.json({
			message: "You are not connected"
		});
	}

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
			res.json({
				message: "User has been modified"
			});
		} else {
			res.json({
				message: "User doesn't exists"
			});
		}
	}).catch(err => {
		res.json({
			message: 'Unable to edit user',
			err: err
		});
	});
});

router.post("/resetPassword", (req, res, next) => {
	res.type("json");

	User.findOne({
		where: {
			emailAddress: req.body.emailAddress
		}
	}).then(user => {
		if (user) {
			const newPassword = randomPassword.String_random(/[\w]{10}/);

			user.updateAttributes({
				hashedPassword: bcrypt.hashSync(newPassword, 5)
			});

			res.json({
				message: "Password has changed",
				newPassword: newPassword
			});
		} else {
			res.json({
				message: "User doesn't exists"
			});
		}
	}).catch(err => {
		res.json({
			err: err
		});
	});
});

module.exports = router;
