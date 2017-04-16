"use strict";

const express = require("express");
const router = express.Router();
const models = require("../models");
const User = models.User;

router.post("/", function(req, res, next) {
	User.create({
		handle: req.body.handle,
		emailAddress: req.body.emailAddress,
		lastName: req.body.lastName,
		firstName: req.body.firstName,
		phoneNumber: req.body.phoneNumber,
		password: req.body.password,
		newsletter: req.body.newsletter,
		picture: req.body.picture
	}).then(function(user) {
		res.type("html");
		if (user) {
			res.send("Reussi");
		} else {
			res.send("Raté");
		}
	}).catch(function(err) {
		console.log(err);
	})
});

router.post("/retrievePassword", function(req, res, next) {
	User.find({
		where: {
			emailAddress : req.body.emailAddress
		}
	}).then(function(user) {
		res.send(user.password);
	}).catch (function(err) {
		res.send("Cette adresse mail n'existe pas");
	});
});

module.exports = router;
