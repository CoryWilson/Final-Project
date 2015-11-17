var express      = require('express'),
    bodyParser   = require('body-parser'),
    cookieParser = require('cookie-parser'),
    CronJob      = require('cron').CronJob,
    debug        = require('debug')('Final-Project:server'),
    favicon      = require('serve-favicon'),
    FB           = require('fb'),
    http         = require('http'),
    models       = require('./app/models'),
    morgan       = require('morgan'),
    path         = require('path'),
    passport     = require('passport'),
    request      = require('request'),
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
		secret: process.env.EXPRESS_SECRET
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
require('./app/routes/index.server.routes.js')(app);
require('./app/routes/api.server.routes.js')(app);
require('./app/routes/game.server.routes.js')(app);
require('./app/routes/users.server.routes.js')(app,passport);


app.use(express.static(path.join(__dirname, 'public')));

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

var server = http.createServer(app);

models.sequelize.sync().then(function () {
  server.listen(port);
  server.on('error', onError);
  server.on('listening', onListening);
});

//run Cron Job
require('./config/cronjob')(CronJob,request,FB,models);

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

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  debug('Listening on ' + bind);
}


module.exports = app;
