'use strict';

var mongoose = require('mongoose'),
    Company = mongoose.model('Companhia'),
    Line = mongoose.model('Linha'),
    Station = mongoose.model('Parada');

var url = "/api/v1";

//GET - Return a Line with specified ID
  exports.findById = function(req, res) {
    Line
    .findById(req.params.linhaID)
    .populate('companhia', 'companyName companyLogo')
    .populate('paradas', 'paradaNome paradaLongitude paradaLatitude isShow horarios', null, { sort: { 'paradaNome': 1 } })
    .exec(
        function(err, line) {
            if(!err) {
                    Station.populate(line, 'horarios', function (err, line) {
                        console.log(line);
                    });
                    console.log('GET ' + url + '/linhas' + req.params.linhaID);
                    res.send(line);
            } else {
                console.log('ERROR: ' + err);
            }
        });
  };

//PUT - Update a Line with specified ID
exports.updateLine = function(req, res) {
    console.log('PUT');
    console.log(req.body);

    Line.findById(req.params.linhaID, function(err, line) {
        line.lineName = req.body.lineName;
        line.lineNumber = req.body.lineNumber;
        line.lineDescription = req.body.lineDescription;
        line.companhia = req.params.companhiaID;
        line.modifiedOn = Date.now();

    line.save(function (err) {
      if (!err) {
        console.log("Updated " + req.body.lineName);
      } else {
        console.log("ERROR :" + err);
      }
      return res.send(line);
    });
  });
};

//DELETE - Delete a Line with specified ID
  exports.deleteLine = function(req, res) {
    Line.findById(req.params.linhaID, function(err, line) {
        if (!err && line){
          line.remove();
          res.json(200, {message: "Line removed."});
        } else {
            res.json(403, {message: "Could not delete line. " + err});
          }
    });
  };