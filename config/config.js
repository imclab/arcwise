var _ = require('underscore')
  , mongoose = require('mongoose')
  , configs = require('./default.json')
  , custom_configs = {};

// Attempt to load user configs
try {
    custom_configs = require('./custom.json');
}
catch(err) { /* meh... */ }

// Combine the default and user configs
_.extend(configs, custom_configs);

// Create a default mongoose connection
mongoose.connect(configs.mongo_uri);
mongoose.connection.on('error', function(evt) {
    console.log('config.js', 'DB Connection error', evt);
});

// Export everything!
_.extend(exports, configs, { connection: mongoose.connection });