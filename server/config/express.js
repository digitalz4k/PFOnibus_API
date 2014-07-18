'use strict';

var express = require('express'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    path = require('path'),
    http    = require('http'),
    cors = require('cors'),
    config = require('./config'),
    passport = require('passport'),
    flash = require('connect-flash'),
    compress = require('compression'),
    mongoStore = require('connect-mongo')(session);

/**
 * Express configuration
 */
module.exports = function(app) {
    app.use(compress())
    app.use(require('prerender-node'));
    app.use(cors());
    app.use(express.static(path.join(config.root, '.tmp')));
    app.use(express.static(path.join(config.root, 'app')));
    app.set('views', config.root + '/app/views');
    app.set('view engine', 'jade');
    app.use(bodyParser()); // get information from html forms
    app.use(cookieParser()); // read cookies (needed for auth)
    app.use(methodOverride());
    app.use(logger('dev')); // log every request to the console

    // required for passport
    app.use(passport.initialize());
    app.use(passport.session()); // persistent login sessions
    app.use(flash()); // use connect-flash for flash messages stored in session

    // Persist sessions with mongoStore
    app.use(session({
        secret: 'ilovevodkavodkavodkavodkaprasempre',
        store: new mongoStore({
          url: config.mongo.uri,
          collection: 'sessions'
        }, function () {
          console.log('db connection open');
        })
    }));

};