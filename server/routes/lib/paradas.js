'use strict';

var mongoose = require('mongoose'),
    Station = mongoose.model('Parada'),
    Schedule = mongoose.model('Horario'),
    Line = mongoose.model('Linha');

var url = "api/v1";

//GET - Return all Bus Stations in the DB
exports.findAllStations = function(req, res){
    console.log("GET");
    console.log("Lista de paradas");
    Station
        .find()
        .populate('horarios', 'line')
        .sort('paradaNome')
        .exec(
            function(err, parada){
                if(!err){
                    console.log('GET ' + url + '/paradas');
                    res.send(parada);
                } else {
                    console.log("ERROR: " + err);
                }
            });
};

//POST - Create a new Bus Stations
exports.addStation = function(req, res){
    console.log("POST");
    console.log(req.body);

    var station = new Station({
        paradaNome: req.body.paradaNome,
        paradaLongitude: req.body.paradaLongitude,
        paradaLatitude: req.body.paradaLatitude,
        isShow: req.body.isShow
    });

    station.save(
        function(err){
            if(err){
                console.log("Cannot create the Bus Station. " + err);
            } else {
                console.log("New Bus Station created.");
            }
        }
    );

    res.send(station);

};

// GET - Find a Bus Station by ID
exports.findById = function(req, res){
    console.log("GET");
    console.log("Pesquisando a linha " + req.params.paradaID);

   Station
    .findById(req.params.paradaID)
    .populate('horarios')
    .exec(
        function(err, parada){
            if(!err){
                console.log('GET ' + url + '/paradas/' + req.params.paradaID);
                res.send(parada);
            } else {
                console.log("ERROR : " + err);
            }
        }
    );


};

//PUT - Update a Bus Station by ID
exports.updateStation = function(req, res){
    console.log("PUT");
    console.log("Atualizando uma parada.");

    Station.findById(req.params.paradaID, function(err, station){
            station.paradaNome = req.body.paradaNome;
            station.paradaLongitude = req.body.paradaLongitude;
            station.paradaLatitude = req.body.paradaLatitude;
            station.isShow = req.body.isShow;
            station.modifiedOn = Date.now();

            station.save(function(err){
                    if(err){
                        console.log("ERROR : " + err);
                    } else {
                        console.log("Parada : " + req.params.paradaID + " updated.");
                    }
            return res.send(station);
            });
    });
};

//DELETE - Delete a Bus Station by ID
exports.deleteStation = function(req, res){
    console.log("DELETE");
    console.log("Removendo uma parada.");

    Station
        .findById(req.params.paradaID)
        .exec(
            function(err, parada){
                if(!err){
                    parada.remove();
                    res.send("Bus station removed.");
                } else {
                    console.log("ERROR: " + err);
                }
            }
        );
};