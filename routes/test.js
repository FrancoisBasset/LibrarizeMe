"use strict";
const models = require("../models");
const Users = models.Users;
module.exports = function(app) {
    
    app.get("/inscription",function(req,res){
        res.type("html");
        res.send('<html><body style="color:'+req.query.macouleur +';">INSCRIT TOI ! </body></html>');
    });
    
    app.get("/connexion",function(req,res){
        res.type("html");
        res.send('<html><body style="color:'+req.query.macouleur +';">CONNECTE TOI ! </body></html>');
    });
    
}