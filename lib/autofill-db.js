#!/usr/bin/env node

var mongoose = require('mongoose')
  , config = require('../config')
  , User = require('../models/user')
  , Article = require('../models/article');

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
                console.log(result);
                process.exit(0);
            });
        }
    }
}



