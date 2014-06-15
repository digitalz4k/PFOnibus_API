'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TodoSchema = new Schema({
    text: String,
    updated_at: {type: Date, default: Date.now}
});

mongoose.model('Todo', TodoSchema);