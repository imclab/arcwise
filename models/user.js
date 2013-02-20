var mongoose = require('mongoose')
  , passportLocalMongoose = require('passport-local-mongoose')
  , levels = ['admin', 'editor', 'contributor'];

var User = new mongoose.Schema({
    email:  { type: String, required:  true                      },
    level:  { type: String, default: 'contributor', enum: levels },
    avatar: { type: String                                       }
});

// Add 'username', 'hash' and 'salt' fields to the user schema
User.plugin(passportLocalMongoose);

// Static accessor for the user levels enum
User.statics.levels = {
    get: function() {
        return levels;
    }
};

module.exports = exports = mongoose.model('User', User);