'use strict';

var mongoose = require('mongoose'),
    Tempo = mongoose.model('Tempo'),
    Schedule = mongoose.model('Horario');

var url = "api/v1";

//POST - Create a new Schedule
exports.addSchedule = function(req, res){
    console.log("POST");
    console.log(req.body);

    var schedule = new Schedule({
        sentido: req.body.sentido,
        startTime: req.body.startTime,
        tempo: req.params.tempoID
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

    Tempo.findById(req.params.tempoID, function(err, tempo){
        var horarioId = schedule._id;
        if(req.params.typeID == 'week'){
            tempo.week.push(horarioId);
            tempo.modifiedOn = Date.now();
        }
        if(req.params.typeID == 'saturday'){
            tempo.saturday.push(horarioId);
            tempo.modifiedOn = Date.now();
        }
        if(req.params.typeID == 'def'){
            tempo.def.push(horarioId);
            tempo.modifiedOn = Date.now();
        } else {
            console.log(err);
        };

        tempo.save(function(err){
            if(!err){
                console.log("Horario added to the tempo: " + req.params.tempoID);
                console.log(tempo);
            } else {
                console.log('ERROR: ' + err);
            }
        });
    });

    res.send(schedule);

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