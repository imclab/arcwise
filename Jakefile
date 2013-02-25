var DB_DIR = 'db'
  , LOG_DIR = 'logs'
  , NPM_DIR  = 'node_modules'
  , MONGO_LOG = LOG_DIR + '/mongo.log'
  , APP_LOG = LOG_DIR + '/arcwise.log'
  , APP_MAIN = 'app.js'
  , APP_PID = '.pid'
  , EXEC_OPTS = { printStdout: true, printStderr: true, breakOnError: true }
  , log = console.log;

desc('Starts the db and application servers');
task('start', ['db:start'], function() {
    jake.exec('forever start ' + APP_MAIN, function() {
        jake.exec('forever list', EXEC_OPTS);
    }, EXEC_OPTS);
});

desc('Stops the db and application servers')
task('stop', function() {
    jake.exec('forever stop ' + APP_MAIN, function() {
        jake.Task['db:stop'].invoke();
    }, EXEC_OPTS);

});

namespace('setup', function() {

    desc('Deletes the /logs and /db directories');
    task('clean', function() {
        jake.rmRf(DB_DIR);
        jake.rmRf(LOG_DIR);
        jake.rmRf(NPM_DIR);
    });

    desc('Creates the /logs and /db directories');
    task('init', function() {
        jake.mkdirP(DB_DIR);
        jake.mkdirP(LOG_DIR);
        jake.exec('touch ' + MONGO_LOG, EXEC_OPTS);
    });

    desc('Sets up the application and pre-populates the db with some excellent data');
    task('dev', ['setup:clean', 'setup:init', 'db:start'], function() {
        jake.exec([
            'npm install',
            'node ./lib/autofill-db.js',
        ],
        function() {
            jake.Task['db:stop'].invoke();
            log('\n\nSetup complete! Start the server with \'jake start\'');
        }, EXEC_OPTS);
    });
});

namespace('db', function() {

    desc('Starts the db');
    task('start', function() {
        jake.exec('mongod --fork --bind_ip 127.0.0.1 --dbpath ' + DB_DIR + ' --logpath ' + MONGO_LOG, function() {
            log('mongo server is running on mongodb://127.0.0.1');
            complete();
        }, EXEC_OPTS);
    }, { async: true });

    desc('Stops the db');
    task('stop', function() {
        log('stopping mongodb://127.0.0.1...');
        jake.exec('mongo 127.0.0.1/admin --eval \'db.shutdownServer()\'', function() {
            complete();
        }, { async: true });
    });
});