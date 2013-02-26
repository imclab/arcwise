
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , config = require('./config')
  , User = require('./models/user')
  , mongoose = require('mongoose')
  , passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('something simple this way walks'));
  app.use(express.session());
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

// Create a default mongoose connection
mongoose.connect(config.mongo_uri);
mongoose.connection.on('error', function(evt) {
    console.log('app.js', 'DB Connection error', evt);
});

// Configure passport to manage user account actions
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Define routes
app.get('/', routes.index);
app.get(/^\/page\/([0-9]*)/, routes.index);
// app.get('/:username', routes.index);
app.post('/signup', routes.signup);
app.post('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/' }));
app.get('/logout', routes.logout);

// Start the app
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
