var mongoose = require('mongoose')
  , ObjectId = mongoose.Schema.Types.ObjectId
  , User = require('../models/user');

var Article = new mongoose.Schema({
    userId:     { type: ObjectId,   required: true, ref: 'User' },
    title:      { type: String,     required: true              },
    body:       { type: String,     required: true              },
    prettyname: { type: String,     required: true              },
    published:  { type: Boolean,    default:  true              },
    createdOn:  { type: Date,       default:  Date.now          },
    modifiedOn: { type: Date,       default:  Date.now          }
});

// Generate a prettyname for the required field based on the
// article's title and the date on which it was created
article.methods.generatePrettyname = function(){

    var base = this.title + ' ' + this.createdOn.getTime()
      , pattern = /[^a-z0-9]+/ig
      , repl = '-';

    return base.replace(pattern, repl).toLowerCase();
};

module.exports = exports = mongoose.model('Article', Article);