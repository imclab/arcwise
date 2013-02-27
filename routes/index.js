var configs = require('../config')
  , dimsum = require('dimsum')
  , marked = require('marked')
  , Article = require('../models/article')
  , User = require('../models/user');

marked.setOptions({
    sanitize: false
});

exports.index = function(req, res){

    var limit = 5
      , skip = (req.params[0] && req.params[0] - 1 > 0) ? (req.params[0] - 1) * limit : 0;

    Article.find({}, null, { limit: limit, skip: skip })
        .populate('user')
        .exec(function(err, articles) {

            articles.every(function(val, i) {
                val.body = marked(val.body);
                return true;
            });

            res.render('index', {
                'err': err,
                'articles': articles
            });

        });
};

exports.signup = function(req, res){

    var newuser = new User({
        username: req.body.username,
        email: req.body.email
    });

    User.register(newuser, req.body.password, function(err, result) {
        res.redirect('/');
    });
};

exports.logout = function(req, res){
    req.logout();
    res.redirect('/');
};