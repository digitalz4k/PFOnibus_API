'use strict';

var mongoose = require('mongoose'),
    Station = mongoose.model('Parada'),
    Schedule = mongoose.model('Horario');

var url = "api/v1";

//GET - Return all Bus Stations in the DB
exports.findAllSchedulesByType = function(req, res){
    console.log("GET");
    console.log("Lista de horarios para " + req.params.typeID);
    Station
        .findById(req.params.paradaID)
        .exec(
            function(err, horario){
                if(!err){
                    console.log('GET ' + url + '/horarios/' + req.params.typeID);
                    res.send(horario);
                } else {
                    console.log("ERROR: " + err);
                }
            });
};

//POST - Create a new Schedule
exports.addSchedule = function(req, res){
    console.log("POST");
    console.log(req.body);

    var schedule = new Schedule({
        sentido: req.body.sentido,
        startTime: req.body.startTime,
        parada: req.params.paradaID,
    });

    schedule.save(
        function(err){
            if(err){
                console.log("Cannot add the Schedule. " + err);
            } else {
                console.log("New Schedule added.");
            }
        }
    );

    Station.findById(req.params.paradaID, function(err, parada){
        var horarioId = schedule._id;
        if(req.params.typeID == 'week'){
            parada.horarios.week.push(horarioId);
            parada.modifiedOn = Date.now();
        }
        if(req.params.typeID == 'saturday'){
            parada.horarios.saturday.push(horarioId);
            parada.modifiedOn = Date.now();
        }
        if(req.params.typeID == 'def'){
            parada.horarios.def.push(horarioId);
            parada.modifiedOn = Date.now();
        } else {
            console.log(err);
        };

        parada.save(function(err){
            if(!err){
                console.log("Horario added to parada: " + parada.paradaNome);
                console.log(parada);
            } else {
                console.log('ERROR: ' + err);
            }
        });
    });

    res.send(schedule);

};

//PUT - Update a Schedule by ID
exports.updateSchedule = function(req, res){
    console.log("PUT");
    console.log("Atualizando um horario.");

    Schedule.findById(req.params.horarioID, function(err, schedule){
            schedule.sentido = req.body.sentido;
            schedule.startTime = req.body.startTime;
            schedule.modifiedOn = Date.now();

            schedule.save(function(err){
                    if(err){
                        console.log("ERROR : " + err);
                    } else {
                        console.log("Schedule updated.");
                    }
            return res.send(schedule);
            });
    });
};

//DELETE - Delete a Schedule by ID
exports.deleteSchedule = function(req, res){
    console.log("DELETE");
    console.log("Removendo um horario.");

    Schedule
        .findById(req.params.horarioID)
        .exec(
            function(err, schedule){
                if(!err){
                    schedule.remove();
                    res.send("Schedule removed.");
                } else {
                    console.log("ERROR: " + err);
                }
            }
        );
};