var _ = require('underscore')
  , mongoose = require('mongoose')
  , configs = require('./default.json')
  , custom_configs = {};

// Attempt to load user configs
try {
    custom_configs = require('./custom.json');
}
catch(err) { /* meh... */ }

// Export the default and user configs
_.extend(exports, configs, custom_configs);

// Create a default mongoose connection
mongoose.connect(exports.mongo_uri);

// Export the default mongoose connection
exports.connection = mongoose.connection;

// Notify when a connection error ocurrs
exports.connection.on('error', function(evt) {
    console.log('config.js', evt);
});