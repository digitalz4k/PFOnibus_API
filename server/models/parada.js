'use strict';

var mongoose = require('mongoose'),
    LinhaSchema = require('./linha'),
    HorarioSchema = require('./horario'),
    Schema = mongoose.Schema;

var ParadaSchema = new Schema({
    paradaNome: String,
    paradaLongitude: Number,
    paradaLatitude: Number,
    line: { type: mongoose.Schema.ObjectId, ref:'Linha' },
    isShow: Boolean,
    horarios: {
        week: [ { type: mongoose.Schema.ObjectId, ref: 'Horario' } ],
        saturday: [ { type: mongoose.Schema.ObjectId, ref: 'Horario' } ],
        def: [ { type: mongoose.Schema.ObjectId, ref: 'Horario' } ]
    },
    createdOn: { type: Date, default: Date.now },
    modifiedOn: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Parada', ParadaSchema);