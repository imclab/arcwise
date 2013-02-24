#!/usr/bin/env node

var mongoose = require('mongoose')
  , config = require('../config')
  , User = require('../models/user')
  , Article = require('../models/article')
  , Dimsum = require('dimsum')
  , users = []
  , articles = [];

mongoose.connect(config.mongo_uri);

initializeCollections(0);

function initializeCollections() {

    User.collection.remove(function() {

        Article.collection.remove(function() {
            
            // next
            createDefaultAdministrator();
        });    
    });
    
}

function createDefaultAdministrator() {

    var admin = new User({
            username: 'autofilladmin',
            email:    'admin@autofilldb.com',
            level:    'admin'
        });

    User.register(admin, 'ohyeah!', function(err, result) {

        // next
        createSomeUsers();
    });
}

function createSomeUsers() {

    slurp([
        { username: 'mastodon',         email: 'zach@mmpr.com',     level: 'contributor' },
        { username: 'pterodactyl',      email: 'kimberly@mmpr.com', level: 'contributor' },
        { username: 'triceratops',      email: 'billy@mmpr.com',    level: 'contributor' },
        { username: 'sabretoothtiger',  email: 'trini@mmpr.com',    level: 'contributor' },
        { username: 'tyrannosaurus',    email: 'jason@mmpr.com',    level: 'contributor' }
    ]);

    function slurp(arr) {

        var user;

        if (user = arr.shift()) {
            User.register(user, 'morphin!', function(err, result) {
                slurp(arr);
            });
        }
        else {

            // next
            User.find({}, function(err, result) {
                users = result;
                createSomeArticles();
            });
        }
    }
}

function createSomeArticles() {

    step(100);

    function step(i) {
        
        var article = { userId: getRandomUserId(), title: generateTitle(), body: Dimsum(5) };

        new Article(article).save(function(err) {

            if (step > 0) {
                step(i--);
            }
            else {

                // next
                Article.find({}, function(err, result) {
                    console.log(result);
                    process.exit(0);
                });
            }
        });
    }

    function getRandomUserId() {
        return users[ Math.random() * users.length << 0]._id;
    }

    function generateTitle() {
        return Dimsum.generate(1, { 
                'words_per_sentence': [2, 5],
                'commas_per_sentence': [0, 0],
                'sentences_per_paragraph': [1, 1]
            }).replace('.', '');
    }
}



