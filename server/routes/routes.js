'use strict';

var api = require('./lib/api'),
    index = require('./lib'),
    users = require('./lib/users'),
    session = require('./lib/session'),
    middleware = require('./middleware');

module.exports = function(app) {

// API Routing
  app.route('/api/v1/todos')
    .get(api.findAllTodos)
    .post(api.addTodo)

  app.route('/api/v1/todos/:id')
    .get(api.findById)
    .delete(api.deleteTodo)

  app.route('/api/v1/users')
    .get(users.list)
    .post(users.create)
    .put(users.changePassword);
  app.route('/api/v1/users/me')
    .get(users.me);
  app.route('/api/v1/users/:id')
    .get(users.show);

  app.route('/api/v1/session')
    .post(session.login)
    .delete(session.logout);

// All undefined api routes should return a 404
  app.route('/api/v1/*')
    .get(function(req, res) {
      res.send(404);
    });

  // All other routes to use Angular routing in app/scripts/app.js
  app.route('/partials/*')
    .get(index.partials);
  app.route('/*')
    .get( middleware.setUserCookie, index.index);
};