var express      = require('express'),
    bodyParser   = require('body-parser'),
    cookieParser = require('cookie-parser'),
    favicon      = require('serve-favicon'),
    morgan       = require('morgan'),
    path         = require('path'),
    passport     = require('passport'),
    flash        = require('connect-flash'),
    session      = require('express-session'),
    sequelize    = require('sequelize');

var app = express();

require('dotenv').load(); //load environmental variables

require('./config/passport')(passport);
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
		saveUninitialized: true,
		resave: true,
		secret: 'Khaleesi4Lyfe'
	}));//declare session
app.use(flash());//session flash messages
app.use(passport.initialize());
app.use(passport.session());//login sessions

app.use(function(req, res, next) {
    res.locals.isAuthenticated = req.isAuthenticated();
    next();
});

// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');

//require routes
require('./app/routes/index.server.routes.js')(app,passport);
require('./app/routes/api.server.routes.js')(app);
require('./app/routes/users.server.routes.js')(app,passport);

app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
