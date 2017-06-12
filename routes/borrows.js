"use strict";

const session = require("express-session");
const express = require("express");
const router = express.Router();
const models = require("../models");
const User = models.User;
const Borrow = models.Borrow;
const FriendRelation = models.FriendRelation;
const Product = models.Product;
const Sequelize = require("sequelize");

let sess;

router.post("/borrowProduct", (req, res, next) => {
	res.type("json");
	sess = req.session;

	if (!sess.emailAddress) {
		res.json({
			message: "You are not connected"
		});
	}

	if (sess.userId === req.body.friendId) {
		res.json({
			message: "User and friend cannot be the same"
		});
	}

	User.findOne({
		where: {
			id: req.body.friendId
		}
	}).then (friend => {
		if (friend) {
			Borrow.findOne({
				where: {
					userId: sess.userId,
					friendId: req.body.friendId,
					productId: req.body.productId
				}
			}).then(borrow => {
				if (borrow) {
					res.json({
						message: "You have already borrowed this product to your friend"
					});
				} else {
					Borrow.create({
						userId: sess.userId,
						friendId: req.body.friendId,
						productId: req.body.productId
					}).then(b => {
						if (b) {
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
				err: err
			});
		} else {
			res.json({
				message: "Friend doesn't exist"
			});
		}
	}).catch(err => {
		res.json({
			err: err
		});
	});
});

router.post("/giveBack", (req, res, next) => {
	res.type("json");
	sess = req.session;

	if (!sess.emailAddress) {
		res.json({
			message: "You are not connected"
		});
	}

	Borrow.findOne({
		where: {
			userId: sess.userId,
			friendId: req.body.friendId,
			productId: req.body.productId
		}
	}).then(borrow => {
		if (borrow) {
			borrow.destroy().then(borrow => {
				res.json({
					message: "You gave back the product"
				});
			}).catch(err => {
				res.json({
					err: err
				});
			});
		} else {
			res.json({
				message: "You don't borrowed this product to your friend"
			});
		}
	}).catch(err => {
		res.json({
			err: err
		});
	});
});

router.post("/showBorrows", (req, res, next) => {
	res.type("json");
	sess = req.session;

	if (!sess.emailAddress) {
		res.json({
			message: "You are not connected"
		});
	}


});

module.exports = router;
