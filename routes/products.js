"use strict";

const express = require("express");
const router = express.Router();
const models = require("../models");
const request = require("request");
let session = require('express-session');
const Products = models.Products;
let sess;

router.post("/search_by_title", function(req, res, next) {
	res.type("json");
	Products.find({
		"where": {
			Title: req.body.title1
		}
	}).then(products => {
		if (products)
			res.send({msg: 'We find !'});
		else {
			res.send({msg: 'We don\'t find !'});
		}
	}).catch(err => { throw err; });

})