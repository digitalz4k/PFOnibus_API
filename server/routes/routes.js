'use strict';

var companhia = require('./lib/companhias'),
    linha = require('./lib/linhas'),
    parada = require('./lib/paradas'),
    tempo = require('./lib/tempos'),
    horario = require('./lib/horarios'),
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
    .get(companhia.findAllLines)
    .post(companhia.addLine)
    .put(companhia.updateById)
    .delete(companhia.deleteCompany)

/*
* LINES ROUTES
*/
  app.route('/api/v1/companhias/:companhiaID/linhas/:linhaID')
    .get(linha.findById)
    .put(linha.updateLine)
    .delete(linha.deleteLine)

/*
* BUS STATIONS ROUTES
*/
  app.route('/api/v1/paradas')
    .get(parada.findAllStations)
    .post(parada.addStation)

  app.route('/api/v1/paradas/:paradaID')
    .get(parada.findById)
    .put(parada.updateStation)
    .delete(parada.deleteStation)

/*
* TIMES GROUP ROUTES
*/
  app.route('/api/v1/paradas/:paradaID/tempos/')
    .post(tempo.addTime)

  app.route('/api/v1/paradas/:paradaID/tempos/:tempoID')
    .delete(tempo.deleteTime)

/*
* SCHEDULES ROUTES
*/
  app.route('/api/v1/tempos/:tempoID/horarios/:typeID')
    .post(horario.addSchedule)

  app.route('/api/v1/tempos/:tempoID/horarios/:horarioID')
    .delete(horario.deleteSchedule)


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