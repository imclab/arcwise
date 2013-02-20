var configs = require('../config')
  , dimsum = require('dimsum')
  , User = require('../models/user');

exports.index = function(req, res){

    User.find({}, function(err, users) {

        res.render('index', {
            title: 'Arcwise',
            user: req.user,
            users: users,
            post: {
                author: Math.random() * users.length << 0,
                title: dimsum.generate(1, { 
                    'words_per_sentence': [2, 5],
                    'commas_per_sentence': [0, 0],
                    'sentences_per_paragraph': [1, 1]
                }).replace('.', ''),
                body: dimsum(5),
                published: (1 == Math.random() * 2 << 0)
            }
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