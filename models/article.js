var mongoose = require('mongoose')
  , moment = require('moment')
  , ObjectId = mongoose.Schema.Types.ObjectId
  , User = require('../models/user');

var Article = new mongoose.Schema({
    user:       { type: ObjectId,   required: true, ref: 'User' },
    title:      { type: String,     required: true              },
    body:       { type: String,     required: true              },
    prettyname: { type: String,     required: true              },
    published:  { type: Boolean,    default:  true              },
    createdOn:  { type: Date,       default:  Date.now          },
    modifiedOn: { type: Date,       default:  Date.now          }
});

// Generate a prettyname for the required field based on the
// article's title and the date on which it was created
Article.methods.generatePrettyname = function(){

    var base = this.title + ' ' + this.createdOn.getTime()
      , pattern = /[^a-z0-9]+/ig
      , repl = '-';

    return base.replace(pattern, repl).toLowerCase();
};

Article.methods.getFormattedDate = function(fieldname, fmt) {

    var fieldname = fieldname || 'createdOn'
      , fmt = fmt || 'MMMM DD, YYYY';

    return moment(this[fieldname]).format(fmt);
};

Article.methods.getContributorLink = function() {
    return '<a href="/' + this.user.username + '">' + this.user.username + '</a>';
};

Article.pre('validate', function(next) {

    // Create a prettyname if there isn't one already
    if (!this.prettyname) this.prettyname = this.generatePrettyname();

    // Update the modifiedOn date
    this.modifiedOn = Date.now();

    next();
});

module.exports = exports = mongoose.model('Article', Article);