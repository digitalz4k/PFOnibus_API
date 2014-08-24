'use strict';

var mongoose = require('mongoose'),
    LinhaSchema = require('./linha'),
    HorarioSchema = require('./horario'),
    ParadaSchema = require('./parada'),
    Schema = mongoose.Schema;

var TempoSchema = new Schema({
    line: { type: mongoose.Schema.ObjectId, ref:'Linha' },
    parada: { type: mongoose.Schema.ObjectId, ref:'Parada' },
    week: [ { type: mongoose.Schema.ObjectId, ref: 'Horario' } ],
    saturday: [ { type: mongoose.Schema.ObjectId, ref: 'Horario' } ],
    def: [ { type: mongoose.Schema.ObjectId, ref: 'Horario' } ],
    createdOn: { type: Date, default: Date.now },
    modifiedOn: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Tempo', TempoSchema);