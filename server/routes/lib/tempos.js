'use strict';

var mongoose = require('mongoose'),
    Tempo = mongoose.model('Tempo'),
    Line = mongoose.model('Linha'),
    Station = mongoose.model('Parada');

var url = "api/v1";

//POST - Create a new Time
exports.addTime = function(req, res){
    console.log("POST");
    console.log(req.body);

    var linhaID = req.body.line;

     var tempo = new Tempo({
        line: linhaID,
        parada: req.params.paradaID
    });

    tempo.save(
        function(err){
            if(err){
                console.log("Cannot add the Time. " + err);
            } else {
                console.log("New Time added.");
            }
        }
    );

    Station.findById(req.params.paradaID, function(err, station){
        var tempoID = tempo._id;
        if(!err){
            station.horarios.push(tempoID);
            station.modifiedOn = Date.now();
        } else {
            console.log(err);
        };

        station.save(function(err){
            if(err){
                console.log('ERROR: ' + err);
            } else {
                console.log("Tempo added to the station: " + req.params.paradaID);
                console.log(tempo);
            }
        });
    });

    Line.findById(linhaID, function(err, line){
        if(!err){
            line.paradas.push(req.params.paradaID);
            line.modifiedOn = Date.now();
        }else{
            console.log(err);
        };

        line.save(function(err){
            if(err){
                console.log('ERROR: ' + err);
            }else{
                console.log("Station added to the line: " + linhaID);
                console.log(line);
            }
        });
    });

    res.send(tempo);

};

//DELETE - Delete a Time by ID
exports.deleteTime = function(req, res){
    console.log("DELETE");
    console.log("Removendo um Time.");

Tempo
        .findById(req.params.tempoID)
        .exec(
            function(err, tempo){
                if(!err){
                    console.log("Line ID of Time: " + tempo.line);
                    console.log("Parada ID of Time: " + tempo.parada);
                    var linhaID = tempo.line;
                    var paradaID = tempo.parada;

                    Line
                        .findById(linhaID)
                        .populate('paradas')
                        .exec(
                            function(err, line){
                                if(!err && line){
                                    var paradas = line.paradas;
                                    var index = paradas.indexOf(paradaID);
                                    console.log("Line.paradas: " + line.paradas);
                                    console.log("IndexOf " + paradaID + ": " + index);

                                    paradas.splice(index, 1);

                                    line.save(function(err){
                                        if(err){
                                            console.log("ERROR: " + err);
                                        } else {
                                            console.log("Parada dropped from Line.");
                                            console.log(line);
                                        }
                                    });
                                }else{
                                    console.log(err);
                                }
                            }
                        );
            tempo.remove();
            res.send("Time removed and Line cleaned.");
        } else {
            console.log("ERROR: " + err);
        }
    }
);



};