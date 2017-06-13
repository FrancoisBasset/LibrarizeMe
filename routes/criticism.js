"use strict";

const express = require("express");
const router = express.Router();
const models = require("../models");
const request = require("request");
let session = require('express-session');
const Criticism = models.Criticism;
const Products = models.Products;
let sess;

router.post("/criticism_product", function(req, res, next) {
	res.type("json");
	sess = req.session;
	const newCriticism = req.body.criticism1;
	console.log(sess.id);
	if(!sess.emailAddress){
		res.json({ msg: 'you are not connected so you can\'t criticism product'});
	} else {
		Products.find({
		"where": {
				productId: req.body.productId1
			}
		}).then(product => {
			if (product){
				Criticism.find({
				"where": {
						productId: req.body.productId1,
						criticasterId: sess.userid
					}
				}).then(criticismProduct => {
				if (criticismProduct){
					criticismProduct.updateAttributes({criticismDetails: newCriticism})
					res.json({ msg: 'update criticism'});	
				} else {
					console.log("hello");
					 return Criticism.create({
						productId: req.body.productId1,
						criticasterId: sess.userid,
						criticismDetails: newCriticism
						}).then(criti => {
							res.send(criti);
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