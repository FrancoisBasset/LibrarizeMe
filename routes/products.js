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

router.post('/create_product', (req, res) => {
    res.type('json');
    sess = req.session;
    let product_title = req.body.title1;
    let product_type = req.body.type1;
    let product_barecode = req.body.barecode1;
    let product_price = req.body.price1;
    if(!sess.emailAddress) {
		res.json({ msg: 'you are not connected so you can\'t create'});
	} else {
		if(product_type && product_barecode && product_price && product_title)
        Products.find({
            "where": { 
            	barcode: product_barecode 
            }
        }).then(product => {
            if(product)
                res.json({ msg: 'Product already existed', err: {} });
            else
                Products.create({
                    ownerId: sess.userid, 
                    title: product_title, 
                    type: product_type, 
                    price: product_price, 
                    barcode: product_barecode
                }).then(p => {
                    if(p)
                        res.json({
						message: "Success"
					});
                    else
                        res.json({ error: 'Error while creating product' });
                }).catch(err => { throw err; });
        }).catch(err => { res.json({ error: 'Error...', err: err }); });
    else
        res.json({ msg: 'Bad entry !' });
	}
});

router.post('/list', (req, res) => {
    res.type('json');
    sess = req.session;
    if(!sess.emailAddress) {
		res.json({ msg: 'you are not connected so you can\'t list'});
	} else {
	    Products.findAll({
			"where": {
				      ownerId: sess.userid
				  }
		}).then(products => {
			if (products){
				console.log("we find" + products);
				res.send({products});
			}
			else {
				console.log("we don't find");
				res.send({msg: 'We don\'t find !'});
			}
		}).catch(err => { throw err; });
	}
});

module.exports = router;