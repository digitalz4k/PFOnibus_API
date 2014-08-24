'use strict';

var mongoose = require('mongoose'),
    TempoSchema = require('./tempo'),
    Schema = mongoose.Schema;

var HorarioSchema = new Schema({
    sentido: Boolean,
    startTime: String,
    tempo: { type: mongoose.Schema.ObjectId, ref:'Tempo' },
    createdOn: { type: Date, default: Date.now },
    modifiedOn: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Horario', HorarioSchema);