'use strict';

var companhia = require('./lib/companhias'),
    linha = require('./lib/linhas'),
    users = require('./lib/users'),
    index = require('./lib'),
    session = require('./lib/session'),
    middleware = require('./middleware');

module.exports = function(app) {

//////////////////////// API Routing ///////////////////////////////

/*
* COMPANIES ROUTES
*/
  app.route('/api/v1/companhias')
    .get(companhia.findAllCompanies)
    .post(companhia.addCompany)

  app.route('/api/v1/companhias/:companhiaID')
    .get(companhia.findById)
    .put(companhia.updateById)
    .delete(companhia.deleteCompany)

/*
* LINES ROUTES
*/

  app.route('/api/v1/companhias/:companhiaID/linhas')
    .get(linha.findAllLines)
    .post(linha.addLine)

  app.route('/api/v1/companhias/:companhiaID/linhas/:linhaID')
    .get(linha.findById)
    .put(linha.updateLine)
    .delete(linha.deleteLine)

/*
* USERS ROUTES
*/
  app.route('/api/v1/users')
    .get(users.list)
    .post(users.create)
    .put(users.changePassword)
  app.route('/api/v1/users/me')
    .get(users.me)
  app.route('/api/v1/users/:id')
    .get(users.show)
    .delete(users.delete)

/*
* SESSIONS ROUTES
*/

  app.route('/api/v1/session')
    .post(session.login)
    .delete(session.logout);

/*
* ERROR 404 ROUTE
*/
  app.route('/api/v1/*')
    .get(function(req, res) {
      res.send(404);
    });

/*
* CLIENT ROUTES
* All others routes to AngularJS
*/
  app.route('/partials/*')
    .get(index.partials);
  app.route('/*')
    .get( middleware.setUserCookie, index.index);
};