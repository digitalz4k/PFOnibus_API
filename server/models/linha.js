'use strict';

var mongoose = require('mongoose'),
    ParadaSchema = require('./parada'),
    Schema = mongoose.Schema;

var LinhaSchema = new Schema({
    lineName: String,
    lineNumber: String,
    lineDescription: String,
    lineFrom: { type: mongoose.Schema.ObjectId, ref:'Parada' },
    lineTo: { type: mongoose.Schema.ObjectId, ref:'Parada' },
    paradas: [ { type: mongoose.Schema.ObjectId, ref: 'Parada' } ],
    companhia: { type: mongoose.Schema.ObjectId, ref:'Companhia' },
    createdOn: { type: Date, default: Date.now },
    modifiedOn: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Linha', LinhaSchema);