const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const index = require('./routes/index');
const users = require("./routes/users");
const friends = require("./routes/friends");
const products = require("./routes/products");
const LikeUnlike = require("./routes/likeunlike");
const borrows = require("./routes/borrows");
const criticism = require("./routes/criticism")

const session = require("express-session")

const models = require("./models");
models.sequelize.sync();

const app = express();

app.use(session({
    secret: 'nfgnhfns',
    resave: true,
    saveUninitialized: true
}));

app.listen("3000", function() {
	console.log("Port 3000");
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use("/users", users);
app.use("/friends", friends);
app.use("/products", products);
app.use("/LikeUnlike", LikeUnlike);
app.use("/borrows", borrows);
app.use("/criticism", criticism);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
