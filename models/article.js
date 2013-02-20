var mongoose = require('mongoose')
  , ObjectId = mongoose.Schema.Types.ObjectId
  , user = require('../models/user');

var article = new mongoose.Schema({
    _contributor:   { type: ObjectId, ref: 'user' },
    prettyname:     String,
    title:          String,
    body:           String,
    published:      Boolean,
    createdOn:      { type: Date, default: Date.now },
    modifiedOn:     { type: Date, default: Date.now }
});

module.exports = exports = mongoose.model('article', article);