var configs = require('../config/config.js');

/*
 * GET home page.
 */
exports.index = function(req, res){
  res.render('index', { title: configs.title });
};