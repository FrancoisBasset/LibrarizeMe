"use strict";

const session = require("express-session");
const express = require("express");
const router = express.Router();
const models = require("../models");
const User = models.User;
const FriendRelation = models.FriendRelation;
const Sequelize = require("sequelize");

let sess;

router.post("/searchFriends", (req, res, next) => {
	res.type("json");

	sess = req.session;

	if (!sess.emailAddress) {
		res.json({
			message: "You are not connected"
		});
	}

	User.findAll({
		where: {
			$or: [
				{
					handle: {
				        	$like: '%'+req.body.keyword+'%'
				      	}
				},
				{
					firstName: {
				        	$like: '%'+req.body.keyword+'%'
				      	}
				},
				{
					lastName: {
				        	$like: '%'+req.body.keyword+'%'
				      	}
				}
			]
		}
	}).then(friends => {
		if (friends) {
			res.json({
				friends: friends
			});
		} else {
			res.json({
				message: "not ok"
			});
		}
	}).catch(err => {
		res.json({
			err: err
		});
	});
});

router.post("/addFriend", (req, res, next) => {
	res.type("json");

	sess = req.session;

	if (!sess.emailAddress) {
		res.json({
			message: "You are not connected"
		});
	}

	if (sess.userId === req.body.friendId) {
		res.json({
			message: "You cannot add yourself as friend"
		});
	}

	FriendRelation.findOne({
		where: {
			userId: sess.userId,
			friendId: req.body.friendId
		}
	}).then(user => {
		if (user) {
			res.json({
				message: "This friend was already added"
			});
		} else {
			FriendRelation.create({
				userId: sess.userId,
				friendId: req.body.friendId
			}).then(friend => {
				if (friend) {
					res.json({
						message: "You have a new friend"
					});
				} else {
					res.json({
						message: "There is no friend"
					});
				}
			}).catch(err => {
				res.json({
					err: err,
					message: "Unable to add friend"
				});
			});
		}
	}).catch(err => {
		res.json({
			err: err
		});
	});
});

router.post("/getFriends", (req, res, next) => {
	res.type("json");
	sess = req.session;

	if (!sess.userId) {
		res.json({
			message: "You are not connected"
		});
	}

	FriendRelation.findAll({
		attributes: ["friendId"],
		where: {
			userId: sess.userId
		}
	}).then(friends => {
		var friendsId = [];

		for (var i = 0; i < friends.length; i++) {
			friendsId.push(friends[i].friendId);
		}

		User.findAll({
			where: {
				id: {
					$in: friendsId
				}
			}
		}).then(friendsR => {
			res.json(friendsR);
		}).catch(err => {
			res.json({
				err: err
			});
		});
	}).catch(err => {
		err: err
	});
});

router.post("/removeFriend", (req, res, next) => {
	res.type("json");

	sess = req.session;

	if (!sess.emailAddress) {
		res.json({
			message: "You are not connected"
		});
	}

	FriendRelation.find({
		where: {
			userId: sess.userId,
			friendId: req.body.friendId
		}
	}).then(friend => {
		if (friend) {
			friend.destroy().then(friend => {
				res.json({
					message: "You don't have this friend anymore"
				})
			}).catch(err => {
				res.json({
					err: err
				});
			});
		} else {
			res.json({
				message: "This friend doesn't exists"
			})
		}
	}).catch(err => {
		res.json({
			err: err
		});
	});
});

router.post("/getFriendsProducts", (req, res, next) => {
	res.type("json");
	sess = req.session;

	if (!sess.userId) {
		res.json({
			message: "You are not connected"
		});
	}

	FriendRelation.findAll({
		where: {
			userId: sess.userId
		}
	}).then(friends => {
		if (friends.length > 0) {
			User.findAll({
				id: friends.userId
			}).then(friend => {
				res.json({
					friends: friend
				});
			}).catch(err => {
				res.json({
					err: err
				});
			});
		} else {
			res.json({

			});
		}
	}).catch(err => {
		err: err
	});
});

module.exports = router;
