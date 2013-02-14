var mongoose = require('mongoose')
  , passportLocalMongoose = require('passport-local-mongoose');

var user = new mongoose.Schema({});

user.plugin(passportLocalMongoose);

module.exports = exports = mongoose.model('user', user);