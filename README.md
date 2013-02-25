Arcwise
=======

Getting Started
---------------

```
$ git clone git@github.com:ninjascribble/arcwise.git
$ npm install forever -g
$ npm install jake -g
$ jake setup:dev
```

The `setup:dev` target does everything! It will pull down all of
the package dependencies, create new directories for your db and
logfiles, and creates some users and articles for you to get started
with. Once you're done, run:

```
$ jake start
```

Jake will start the app and mongo servers. The app runs in the background with
[forever](http://blog.nodejitsu.com/keep-a-nodejs-server-up-with-forever).


To stop everything just run:

```
$ jake stop
```

Dependencies
------------

* __Git__: http://git-scm.com/documentation
* __NodeJS__: http://nodejs.org/api/index.html
* __MongoDB__: http://docs.mongodb.org/manual/
* __Jake__: https://github.com/mde/jake
* __forever__: http://blog.nodejitsu.com/keep-a-nodejs-server-up-with-forever