'use strict';

var mongoose = require('mongoose'),
    Company = mongoose.model('Companhia'),
    Line = mongoose.model('Linha');

var url = "/api/v1";

//GET - Return all lines from the company ID
  exports.findAllLines = function(req, res) {
    console.log("Find all line from companhiaID: " + req.params.companhiaID);
    Company
    .findById(req.params.companhiaID)
    .populate('linhas')
    .exec(
        function(err, line){
            if(err){
                    console.log('ERROR: ' + err);
            } else {
                Line.find(function(err, line) {
                    if(!err) {
                        console.log('GET ' + url + '/companhias' + req.params.companhiaID + '/linhas/');
                        res.send(line);
                    } else {
                        console.log('ERROR: ' + err);
                    }
                });
        }
    });
  };

//POST - Insert a new line in the DB
  exports.addLine = function(req, res) {
    console.log('POST');
    console.log(req.body);

    var line = new Line({
        lineName: req.body.lineName,
        lineNumber: req.body.lineNumber,
        lineDescription: req.body.lineDescription,
        companhia: req.params.companhiaID
    });

    line.save(function(err) {
        if(!err) {
            console.log('Created a new line: ' + req.body.lineName);
        } else {
            console.log('ERROR: ' + err);
        }
    });

    Company.findById(req.params.companhiaID, function(err, companhia){
        var lineId = line._id;
        companhia.linhas.push(lineId);
        companhia.modifiedOn = Date.now();

        companhia.save(function(err){
            if(!err){
                console.log("Linha: " + req.body.lineName + ' added to company: ' + companhia.companyName);
                console.log(companhia);
            } else {
                console.log('ERROR: ' + err);
            }
        });
    });

    res.send(line);
  };

//GET - Return a Line with specified ID
  exports.findById = function(req, res) {
    Line
    .findById(req.params.linhaID)
    .populate('companhia', 'companyName companyLogo')
    .exec(
        function(err, line) {
            if(!err) {
            console.log('GET ' + url + '/companhias/' + req.params.companhiaID + '/linhas/' + req.params.linhaID);
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