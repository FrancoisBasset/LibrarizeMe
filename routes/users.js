"use strict";

const express = require("express");
const router = express.Router();
const models = require("../models");
const User = models.User;
const bcrypt = require("bcrypt");
const validator = require("validator");
const request = require("request");

router.post("/inscription", function(req, res, next) {
	if (!validator.isEmail(req.body.emailAddress1)) {
		res.type("html");
		res.send("It's not a mail address");
		return;
	}

	var addressExists = User.find({
		"where": {
			"emailAddress": req.body.emailAddress1
		}
	}).then(function(user) {
		if (user) {
			res.type("html");
			res.send("Email address is already used");
			//addressExists = true;
			console.log(addressExists);
			return true;
		}
	});

	if (addressExists) {
		return;
	}

	console.log(addressExists);
	console.log("continue");

	/*const result = request.post('http://127.0.0.1:3000/users/emailAddressAlreadyExists').form(req);
	res.type("html");
	res.send(result);*/

	//request.post("http://127.0.0.1/users/emailAddressAlreadyExists").form(req);
	/*if (hasSameEmailAddress(req.body.emailAddress1)) {
		res.type("html");
		res.send("Account with same email address already exists");
		console.log(hasSameEmailAddress(req.body.emailAddress1));
		return;
	}*/

	//res.type("html");
	//res.send(result);

	//console.log(hasSameEmailAddress(req.body.emailAddress1));

	if (req.body.emailAddress1 != req.body.emailAddress2) {
		res.type("html");
		res.send("Email addresses are not the same");
		return;
	}

	if (req.body.password1.length < 8) {
		res.type("html");
		res.send("Password must contains at least 8 characters")
		return;
	}

	if (req.body.password1 != req.body.password2) {
		res.type("html");
		res.send("Passwords are not the same");
		return;
	}

	var hashedPassword = bcrypt.hashSync(req.body.password1, 5);
	//if (addressExists == false) {
		User.create({
			emailAddress: req.body.emailAddress1,
			hashedPassword: hashedPassword
		}).then(function(user) {
			res.type("html");
			if (user) {
				res.send("Success");
			} else {
				res.send("Fail");
			}
		}).catch(function(err) {
			console.log(err);
		});
	/*}
	else{
		console.log("EmailAdress pas bonne");
	}*/
})

/*router.post("/create", function(req, res, next) {
	if (!validator.isEmail(req.body.emailAddress)) {
		res.type("html");
		res.send("It's not a mail address");
		return;
	}

	if (validator.isEmpty(req.body.handle) && req.body.handle.length <= 30) {
		res.type("html");
		res.send("It's not a handle");
		return;
	}

	if (req.body.newsletter != "true" && req.body.newsletter != "false") {
		res.type("html");
		res.send("It's not a bool");
		return;
	}

	if (hasSameEmailAddress(req.body.emailAddress)) {
		res.type("html");
		res.send("Account with same email address already exists");
		return;
	}

	console.log(hasSameEmailAddress(req.body.emailAddress));

	var hashedPassword = bcrypt.hashSync(req.body.password, 5);

	User.create({
		handle: req.body.handle,
		emailAddress: req.body.emailAddress,
		lastName: req.body.lastName,
		firstName: req.body.firstName,
		phoneNumber: req.body.phoneNumber,
		hashedPassword: hashedPassword,
		newsletter: req.body.newsletter,
		picture: req.body.picture
	}).then(function(user) {
		res.type("html");
		if (user) {
			res.send("Success");
		} else {
			res.send("Fail");
		}
	}).catch(function(err) {
		console.log(err);
	})
});*/

router.post("/changePassword", function(req, res, next) {
	User.find({
		where: {
			emailAddress : req.body.emailAddress
		}
	}).then(function(user) {
		res.send(user.hashedPassword);
	}).catch (function(err) {
		res.send("Cette adresse mail n'existe pas");
	});
});

router.post("/correctPassword", function(req, res, next) {
	User.find({
		"where": {
			emailAddress: req.body.emailAddress
		}
	}).then(function(user) {
		res.type("html");
		res.send(passwordHash.verify(req.body.password, user.hashedPassword));
	}).catch(function(err) {
		res.type("html");
		res.send(err);
	});
});

/*const emailAddressAlreadyExists = function(emailAddress1) {
	User.findOne({
		"where": {
			emailAddress: emailAddress1
		}
	}).then(function(user) {
		if (user) {
			res.send(true);
		} else {
			res.send(false);
		}
	});
}*/

/*router.post("/emailAddressAlreadyExists", function(req, res, next) {
	res.type("html");

	User.findOne({
		"where": {
			emailAddress: req.body.emailAddress1
		}
	}).then(function(user) {
		if (user) {
			res.send(true);
		} else {
			res.send(false);
		}
	});
});*/

module.exports = router;
