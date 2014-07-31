'use strict';

// Server Setup ====================================================================
var express = require('express'),
            app = express(),
            port    = process.env.PORT || 3000,
            path = require('path'),
            http    = require('http'),
    fs = require('fs'),
    mongoose = require('mongoose');

// Database Configuration =============================================================
var config = require('./server/config/config');
var db = mongoose.connect(config.mongo.uri, config.mongo.options);

var models_path = __dirname + '/server/models'
fs.readdirSync(models_path).forEach(function (file) {
  require(models_path+'/'+file)
});

// Passport Configuration ==============================================================
var passport = require('./server/config/passport');

// Express Configuration ===============================================================
var app = express();
require('./server/config/express')(app);
require('./server/routes/routes')(app);


// Launch server ====================================================================
app.listen(config.port, config.ip, function () {
  console.log('Client and Web API server launched on %s:%d', config.ip, config.port);
});

// Expose ==========================================================================
exports = module.exports = app;