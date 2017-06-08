"use strict";

const express = require("express");
const router = express.Router();
const models = require("../models");
const request = require("request");
let session = require('express-session');
const Products = models.Products;
let sess;

router.post("/search_by_text", function(req, res, next) {
	res.type("json");
	sess = req.session;
	if(!sess.emailAddress){
		res.json({ msg: 'you are not connected so you can\'t find'});
	} else {
		Products.findAll({
			"where": {
				$or: [
				    {
				      title: {
				        $like: '%'+req.body.text1+'%'
				      }
				    },
				    {
				      description: {
				        $like: '%'+req.body.text1+'%'
				      }
				    }
				  ]
			}
		}).then(products => {
			if (products){
				console.log("we find")
				res.send({msg: products});
			}
			else {
				console.log("we don't find")
				res.send({msg: 'We don\'t find !'});
			}
		}).catch(err => { throw err; });
	}
})

router.post("/search_by_type", function(req, res, next) {
	res.type("json");
	sess = req.session;
	if(!sess.emailAddress){
		res.json({ msg: 'you are not connected so you can\'t find'});
	} else {
		Products.findAll({
			"where": {
				      type: req.body.type1
				  }
		}).then(productstype => {
			if (productstype){
				console.log("we find")
				res.send({msg: productstype});
			}
			else {
				console.log("we don't find")
				res.send({msg: 'We don\'t find !'});
			}
		}).catch(err => { throw err; });
	}
})

router.post("/search_by_barre_code", function(req, res, next) {
	res.type("json");
	sess = req.session;
	if (isNaN(req.body.code1)) {
    	res.json({ msg: 'the barcode must contains only numbers'});
	}
	if(!sess.emailAddress){
		res.json({ msg: 'you are not connected so you can\'t find'});
	} else {
		Products.find({
			"where": {
				      barcode: req.body.code1
				  }
		}).then(products => {
			if (products){
				console.log("we find")
				res.send({msg: products.title});
			}
			else {
				console.log("we don't find")
				res.send({msg: 'We don\'t find !'});
			}
		}).catch(err => { throw err; });
	}
})

module.exports = router;
