//File Name: ./config/express.js

//Declare Dependencies
var config       = require('./config'),
    express      = require('express'),
    bodyParser   = require('body-parser'),
    cookieParser = require('cookie-parser'),
    morgan       = require('morgan'),
    passport     = require('passport'),
    flash        = require('connect-flash'),
    session      = require('express-session');

module.exports = function(){
  var app = express();//declare express app

  app.use(morgan('dev'));//log all requests to console

  app.use(cookieParser());//read cookies

  app.use(bodyParser.json());//read html forms
  app.use(bodyParser.urlencoded({extended:true}));

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

  app.set('views', './app/views');//location of views
  app.set('view engine', 'ejs');//declare view engine

  //require routes
  require('../app/routes/index.server.routes.js')(app,passport);
  require('../app/routes/weeks.server.routes.js')(app,passport);
  require('../app/routes/standings.server.routes.js')(app,passport);
  require('../app/routes/showdowns.server.routes.js')(app,passport);
  require('../app/routes/users.server.routes.js')(app,passport);

  //use public folder to display static files
  app.use(express.static('./public'));


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

  return app;
};
