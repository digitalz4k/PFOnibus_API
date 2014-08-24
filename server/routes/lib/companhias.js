'use strict';

var mongoose = require('mongoose'),
    Line = mongoose.model('Linha'),
    Company = mongoose.model('Companhia');

var url = "/api/v1";

 //GET - Return all companies in the DB
  exports.findAllCompanies = function(req, res) {
    Company
    .find()
    .populate('linhas', 'lineName lineNumber', null, { sort: { 'lineNumber': 1 } })
    .exec(
        function(err, company) {
          if(!err) {
          console.log('GET ' + url + '/companhias')
              res.send(company);
          } else {
              console.log('ERROR: ' + err);
          }
      });
  };

//GET - Return all lines from the company ID
  exports.findAllLines = function(req, res) {
    console.log("Find all line from companhiaID: " + req.params.companhiaID);
    Company
        .findById(req.params.companhiaID)
        .lean()
        .populate('linhas', 'lineName lineNumber', null, { sort: { 'lineNumber': 1 } })
        .exec(
            function(err, line){
                if(err){
                        console.log('ERROR: ' + err);
                } else {
                    res.send(line);
            }
        });
  };

//POST - Insert a new company in the DB
  exports.addCompany = function(req, res) {
    console.log('POST');
    console.log(req.body);

    var company = new Company({
        companyName: req.body.companyName,
        companyLogo: req.body.companyLogo,
        description: req.body.description,
        email: req.body.email,
        phone: req.body.phone,
        website: req.body.website
    });

    company.save(function(err) {
        if(!err) {
            console.log('Created a new company: ' + req.body.companyName);
        } else {
            console.log('ERROR: ' + err);
        }
    });

    res.send(company);
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

//PUT - Update a company with specified ID
exports.updateById = function(req, res) {
    console.log('PUT');
    console.log(req.body);

    Company.findById(req.params.companhiaID, function(err, company) {
        company.companyName = req.body.companyName;
        company.companyLogo = req.body.companyLogo;
        company.description = req.body.description;
        company.email = req.body.email;
        company.phone = req.body.phone;
        company.website = req.body.website;
        company.modifiedOn = Date.now();

    company.save(function (err) {
      if (!err) {
        console.log("Updated " + req.body.companyName);
      } else {
        console.log("ERROR :" + err);
      }
      return res.send(company);
    });
  });
};

//DELETE - Delete a company with specified ID
  exports.deleteCompany = function(req, res) {
    Company.findById(req.params.companhiaID, function(err, company) {
        if (!err && company){
          company.remove();
          res.json(200, {message: "Company and all lines removed."});
        } else {
            res.json(403, {message: "Could not delete company. " + err});
          }
    });
  };