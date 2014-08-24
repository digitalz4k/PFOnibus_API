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
        .populate('lines', 'lineNome lineNumber')
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

//GET - Return all stations from the line ID
  exports.findAllStationsById = function(req, res) {
    console.log("Find all stations from lineID: " + req.params.linhaID);
    Line
        .findById(req.params.linhaID)
        .populate('paradas', 'paradaNome paradaLongitude paradaLatitude isShow')
        .exec(
            function(err, station){
                if(err){
                        console.log('ERROR: ' + err);
                } else {
                Station
                .find()
                .populate('horarios.week horarios.saturday horarios.def', 'sentido startTime')
                .exec(
                    function(err, station) {
                        if(!err) {
                            console.log('GET ' + url + '/linhas' + req.params.linhaID + '/paradas/');
                            res.send(station);
                        } else {
                            console.log('ERROR: ' + err);
                        }
                    });
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
        line: req.params.linhaID,
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

    Line.findById(req.params.linhaID, function(err, linha){
        var paradaId = station._id;
        linha.paradas.push(paradaId);
        linha.modifiedOn = Date.now();

        linha.save(function(err){
            if(!err){
                console.log("Parada: " + req.body.paradaNome + ' added to line: ' + linha.lineName);
                console.log(linha);
            } else {
                console.log('ERROR: ' + err);
            }
        });
    });

    res.send(station);

};

// GET - Find a Bus Station by ID
exports.findById = function(req, res){
    console.log("GET");
    console.log("Pesquisando a linha " + req.params.paradaID);

   Station
    .findById(req.params.paradaID)
    .populate('horarios.week horarios.saturday horarios.def', 'sentido startTime')
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