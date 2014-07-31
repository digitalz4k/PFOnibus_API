'use strict';

var mongoose = require('mongoose'),
    LinhaSchema = require('./linha'),
    Schema = mongoose.Schema;

var CompanhiaSchema = new Schema({
    companyName: {type: String, default: "Company name"},
    companyLogo: {type: String, default: "Logo URL"},
    description: {type: String, default: "Description of the company."},
    email: {type: String, default: "Contact email"},
    phone: {type: String, default: "Phone number"},
    website: {type: String, default: "Company website"},
    linhas: [ { type: mongoose.Schema.ObjectId, ref: 'Linha' } ],
    createdOn: { type: Date, default: Date.now },
    modifiedOn: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Companhia', CompanhiaSchema);