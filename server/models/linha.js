'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LinhaSchema = new Schema({
    lineName: String,
    lineNumber: String,
    lineDescription: String,
    companhia: { type: mongoose.Schema.ObjectId, ref:'Companhia' },
    createdOn: { type: Date, default: Date.now },
    modifiedOn: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Linha', LinhaSchema);