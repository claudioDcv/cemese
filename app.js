var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser')

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes');
var postsRouter = require('./routes/posts');
var imagesRouter = require('./routes/images');
var uploadRouter = require('./routes/upload');
var displayImageRouter = require('./routes/displayImage');

var { authorize, publicAuthorize } = require("./auth/authentication"); // middleware for doing authentication
var permit = require("./auth/permission"); // middleware for checking if user's role is permitted to make request

var { dbTest } = require('./config/db');


// Test DB
dbTest().then(data => console.log(data)).catch(err => console.log(err));

var app = express();
app.use(cookieParser())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/cemese/', publicAuthorize, indexRouter);
app.use('/cemese/posts', authorize, postsRouter);
app.use('/cemese/galery', authorize, imagesRouter);
app.use('/cemese/upload', authorize, uploadRouter);
app.use('/cemese/display/image', authorize, displayImageRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});


// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
