var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser');

var session = require('express-session');
var RedisStore = require('connect-redis')(session);

var path = require('path');
var logger = require('morgan');
var helmet = require('helmet');

var { SECRET } = require('./config/env')

var siteRouter = require('./site/router');

var postsRouter = require('./routes/posts');
var imagesRouter = require('./routes/images');
var uploadRouter = require('./routes/upload');
var displayImageRouter = require('./routes/displayImage');

var { sessionChecker } = require("./auth/authentication"); // middleware for doing authentication
var permit = require("./auth/permission"); // middleware for checking if user's role is permitted to make request

var { dbTest } = require('./config/db');


// Test DB
dbTest().then(data => console.log(data)).catch(err => console.log(err));

var app = express();

app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.disable('x-powered-by');

const options = {};
// app.use(session({ secret: SECRET }));
app.use(session({
  key: 'user_sid',
  store: new RedisStore(options),
  secret: SECRET,
  proxy: true,
  resave: true,
  saveUninitialized: true,
  cookie: {
    expires: 600000
  }
}));
app.use(permit);

/*
client An existing client
host Redis server hostname
port Redis server portno
socket Redis server unix_socket
url Redis server url
*/

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/cemese/posts', sessionChecker, postsRouter);
app.use('/cemese/galery', sessionChecker, imagesRouter);
app.use('/cemese/upload', sessionChecker, uploadRouter);
app.use('/cemese/display/image', sessionChecker, displayImageRouter);

// SITE
siteRouter(app)

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
