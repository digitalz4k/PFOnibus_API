'use strict';

var mongoose = require('mongoose'),
    ParadaSchema = require('./parada'),
    Schema = mongoose.Schema;

var HorarioSchema = new Schema({
    sentido: Boolean,
    startTime: String,
    parada: { type: mongoose.Schema.ObjectId, ref:'Parada' },
    createdOn: { type: Date, default: Date.now },
    modifiedOn: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Horario', HorarioSchema);