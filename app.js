const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');

const path = require('path');
const logger = require('morgan');
const helmet = require('helmet');

const { SESSION_CONFIG } = require('./config/env')

const siteRouter = require('./site/router');
const systemRouter = require('./routes/routers');

const permit = require("./auth/permission"); // middleware for checking if user's role is permitted to make request

const { dbTest } = require('./config/db');
dbTest().then(data => console.log(data)).catch(err => console.log(err));


const app = express();

app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.disable('x-powered-by');

app.use(SESSION_CONFIG);
app.use(permit);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// system SITE
systemRouter(app)
// SITE
siteRouter(app)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});


// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
