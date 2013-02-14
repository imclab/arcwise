var configs = require('../config')
  , user = require('../models/user');

exports.index = function(req, res){
  res.render('index', { title: configs.title, subt: 'This is the index page', user: req.user });
};

exports.signup = function(req, res){
  user.register(new user({ username: req.body.username }), req.body.password, function(err, user) {
    res.render('index', { title: configs.title, subt: 'Created user', user: user });
  });
};

exports.logout = function(req, res){
  req.logout();
  res.redirect('/');
};

exports.loginSuccess = function(req, res){
  res.render('index', { title: configs.title, subt: 'Login success!', user: req.user });
};

exports.loginFail = function(req, res){
  res.render('index', { title: configs.title, subt: 'Login failed...', user: req.user });
};