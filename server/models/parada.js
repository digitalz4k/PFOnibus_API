'use strict';

var mongoose = require('mongoose'),
    LinhaSchema = require('./linha'),
    TempoSchema = require('./tempo'),
    Schema = mongoose.Schema;

var ParadaSchema = new Schema({
    paradaNome: String,
    paradaLongitude: Number,
    paradaLatitude: Number,
    isShow: Boolean,
    horarios: [ { type: mongoose.Schema.ObjectId, ref: 'Tempo' } ],
    createdOn: { type: Date, default: Date.now },
    modifiedOn: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Parada', ParadaSchema);