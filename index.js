"use strict";

const express = require("express");
const bodyParser = require("body-parser");

let app = express();

require("./routes")(app);

app.use(function(req, res,next) {
    next();
});

app.all("*", function(req, res){
    res.status(404);
    res.type("text");
    res.send("ERREUR 404");
})
app.listen(3630,function(){
    console.log("Server run port 3630");
});