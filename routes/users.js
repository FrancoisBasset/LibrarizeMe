"use strict";

const express = require("express");
const router = express.Router();
const models = require("../models");
const User = models.User;
const bcrypt = require("bcrypt");
const validator = require("validator");

router.post("/create", function(req, res, next) {
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

	console.log(hasSameEmailAddress(req.body.emailAddress));

	var hashedPassword = bcrypt.hashSync(req.body.password, 5);
	console.log(hashedPassword);

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
});

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

const hasSameEmailAddress = function(address) {
	User.find({
		"where": {
			emailAddress: address
		}
	}).then(function(user) {
		return true;
	}).catch(function(err) {
		return err;
	});

	return "vgujvyh";
};

module.exports = router;
