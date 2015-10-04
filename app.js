//File Name: ./app.js

//Required NPM Modules
var express      = require('express'),
    app          = express(),
    mongoose     = require('mongoose'),
    passport     = require('passport'),
    flash        = require('connect-flash');

var morgan       = require('morgan'),
    bodyParser   = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session      = require('express-session');

var favicon      = require('serve-favicon'),
    path         = require('path');

//Database Connection
var db           = require('./app/config/db');

//View Engine Setup
app.set('views', path.join(__dirname, 'views')); //views directory
app.set('view engine', 'ejs'); //set up ejs templating

/***** Configuration *****/
//mongoose.connect(db.url); //Connect to DB

require('./app/config/passport')(passport); // pass passport for configuration

app.use(express.static(path.join(__dirname, 'public')));//static file handling


//Set up express application
//Uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(morgan('dev')); //Logs every request to the console
app.use(cookieParser());//read cookies (needed for auth)

app.use(bodyParser.json()); //Get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));

// Disable etag headers on responses
app.disable('etag');

//Passport Setup
app.use(session({
  secret:'Khaleesi4Lyfe',
  resave: true,
  saveUnitialized: 'true'
})); //session secret
app.use(passport.initialize());
app.use(passport.session());//persistent login sessions
app.use(flash());//store flash messags in session

//Routes
var routes = require('./app/routes/routes')(app,passport); //loads routes and passes in the express app with passport
//app.use('/', routes)(app,passport); //routes
require('./app/routes/routes.js')(app,passport);


//Catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//Error Handlers

//Development error handler
//Will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      title: 'Error',
      message: err.message,
      error: err
    });
  });
}

//Production error handler
//No stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    title: 'Error',
    message: err.message,
    error: {}
  });
});

module.exports = app;
