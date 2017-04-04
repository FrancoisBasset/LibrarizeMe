"use strict";

const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.get("/", function(req, res, next) {
	User.create({
		handle: "francois",
		emailAddress: "francois@gmail.com",
		lastName: "vbsrbh",
		firstName: "gstybshi",
		phoneNumber: "0101010101",
		password: "vgh",
		newsletter: false,
		picture: "/vbfhf/bsfgbfb.jpg"
	}).then(function(user) {
		if (user) {
			console.log("Reussi");
			User.console();
		}
	}).catch(function(err) {
		console.log(err);
	})
});

module.exports = router;
