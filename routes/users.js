"use strict";

const express = require("express");
const router = express.Router();
const models = require("../models");
const User = models.User;
const bcrypt = require("bcrypt");
const validator = require("validator");
const request = require("request");

let session = require('express-session');

router.post("/inscription", function(req, res, next) {
	res.type("html");
	if (!validator.isEmail(req.body.emailAddress1)) {
		res.send("It's not a mail address");
	}
	if (req.body.emailAddress1 != req.body.emailAddress2) {
		res.send("Email addresses are not the same");
	}
	if (req.body.password1.length < 8) {
		res.send("Password must contains at least 8 characters")
	}
	if (req.body.password1 != req.body.password2) {
		res.send("Passwords are not the same");
	}
	User.find({
		"where": {
			emailAddress: req.body.emailAddress1
		}
	}).then(user => {
		if (user)
			res.send("Email address is already used");
		else {

			return User.create({
				emailAddress: req.body.emailAddress1,
				hashedPassword: bcrypt.hashSync(req.body.password1, 5)
			}).then(u => {
				res.send(u);
			}).catch(err => { res.send({msg: 'nok', err: err}); });

			//var hashedPassword = bcrypt.hashSync(req.body.password1, 5);
			// res.send("Email address is not used");
			// console.log("Email address not used");
		}
	}).catch(err => { throw err; });

})
	/*if (addressExists) {
		return;
	}*/

	// console.log("continue");

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


	//if (addressExists == false) {
		/*User.create({
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
		});*/
	/*}
	else{
		console.log("EmailAdress pas bonne");
	}*/
	
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


let sess;

router.post("/login", function(req, res, next) {
	res.type("json");

	let emailSend = req.body.emailAddress1; 	
	let passwordSend = req.body.password1;

	User.find({
		where: {
			emailAddress: emailSend
		}
	}).then(user => {
		if (user){
			console.log(bcrypt.compare(passwordSend, user.hashedPassword));

			if (bcrypt.compare(passwordSend, user.hashedPassword) == true) {
				console.log('BLOUP');
				sess = req.session;
				sess.email = req.body.emailAddress1
				res.send({msg: 'you are connected'});
			} else {
				res.send({msg: 'wrong login infos'});
			}
		} else {
			res.send({msg: 'you are not connected'});
		}
	}).catch(err => { res.send({msg: 'nok', err: err}); });
});

router.post("/changePassword", function(req, res, next) {
	res.type("html");
	User.find({
		where: {
			emailAddress : req.body.emailAddress1,
			password1: req.body.password1
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
