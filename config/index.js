/*
 * You can create a custom.json and specify
 * values for the keys you wish to override.
 */
var _ = require('underscore')
  , mongoose = require('mongoose')
  , configs = require('./default.json')
  , custom_configs = {};

// Attempt to load user configs
try {
    custom_configs = require('./custom.json');
}
catch(err) { /* meh... */ }

// Export everything!
_.extend(exports, configs, custom_configs);