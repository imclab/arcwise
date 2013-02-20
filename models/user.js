var mongoose = require('mongoose')
  , config = require('../config')
  , passportLocalMongoose = require('passport-local-mongoose')
  , levels = ['admin', 'editor', 'contributor'];

var User = new mongoose.Schema({
    email:  { type: String, required:  true                      },
    level:  { type: String, default: 'contributor', enum: levels },
    avatar: { type: String                                       }
});

// Add 'username', 'hash' and 'salt' fields to the user schema
User.plugin(passportLocalMongoose, {
    iterations: config.pwd_iterations,
    saltlen:    config.pwd_saltlen,
    keylen:     config.pwd_keylen
});

// Static accessor for the user levels enum
User.statics.__defineGetter__('levels', function() {
    return levels;
});

module.exports = exports = mongoose.model('User', User);