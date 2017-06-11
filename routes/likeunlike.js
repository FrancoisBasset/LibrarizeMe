"use strict";

const express = require("express");
const router = express.Router();
const models = require("../models");
const request = require("request");
let session = require('express-session');
const LikeUnlike = models.LikeUnlike;
const Products = models.Products;
let sess;

router.post("/like_product", function(req, res, next) {
	res.type("json");
	sess = req.session;
	console.log(sess.id);
	if(!sess.emailAddress){
		res.json({ msg: 'you are not connected so you can\'t like product'});
	} else {
		Products.find({
		"where": {
				productId: req.body.productId1
			}
		}).then(product => {
			if (product){
				LikeUnlike.find({
				"where": {
						productId: req.body.productId1,
						emailAddress: sess.emailAddress
					}
				}).then(likeUnlike => {
				if (likeUnlike){
					likeUnlike.updateAttributes({like: 1})
					res.json({ msg: 'update like'});	
				} else {
					 return LikeUnlike.create({
						productId: req.body.productId1,
						emailAddress: sess.emailAddress,
						like: 1
						}).then(Like => {
							res.send(Like);
						}).catch(err => { res.send({msg: 'nok', err: err}); });
					}
				}).catch(err => { throw err; });
			} else {
				res.json({ msg: 'the product chosen doesn\'t exist '});	
			}
		}).catch(err => { throw err; });
	}
})

router.post("/unlike_product", function(req, res, next) {
	res.type("json");
	sess = req.session;
	console.log(sess.id);
	if(!sess.emailAddress){
		res.json({ msg: 'you are not connected so you can\'t unlike product'});
	} else {
		Products.find({
		"where": {
				productId: req.body.productId1
			}
		}).then(product => {
			if (product){
				LikeUnlike.find({
				"where": {
						productId: req.body.productId1,
						emailAddress: sess.emailAddress
					}
				}).then(likeUnlike => {
				if (likeUnlike){
					likeUnlike.updateAttributes({like: 0})
					res.json({ msg: 'update like'});	
				} else {
					 return LikeUnlike.create({
						productId: req.body.productId1,
						emailAddress: sess.emailAddress,
						like: 0
						}).then(Like => {
							res.send(Like);
						}).catch(err => { res.send({msg: 'nok', err: err}); });
					}
				}).catch(err => { throw err; });
			} else {
				res.json({ msg: 'the product chosen doesn\'t exist '});	
			}
		}).catch(err => { throw err; });
	}
})

module.exports = router;