'use strict';

var mongoose = require('mongoose'),
    Todo = mongoose.model('Todo');

 /**
 * Api Uri Versioning
 */
  var version = "v1";
  var url = "/api/" + version;

  //GET - Return all todos in the DB
  exports.findAllTodos = function(req, res) {
    Todo.find(function(err, todo) {
        if(!err) {
        console.log('GET ' + url + '/todos')
            res.send(todo);
        } else {
            console.log('ERROR: ' + err);
        }
    });
  };

  //GET - Return a Todo with specified ID
  exports.findById = function(req, res) {
    Todo.findById(req.params.id, function(err, todo) {
        if(!err) {
        console.log('GET ' + url + '/todos/' + req.params.id);
            res.send(todo);
        } else {
            console.log('ERROR: ' + err);
        }
    });
  };

  //POST - Insert a new todo in the DB
  exports.addTodo = function(req, res) {
    console.log('POST');
    console.log(req.body);

    var todo = new Todo({
        text: req.body.text
    });

    todo.save(function(err) {
        if(!err) {
            console.log('Created a new todo: ' + req.body.text);
        } else {
            console.log('ERROR: ' + err);
        }
    });

    res.send(todo);
  };

  //DELETE - Delete a post with specified ID
  exports.deleteTodo = function(req, res) {
    Todo.findById(req.params.id, function(err, todo) {
        if (!err && todo){
          todo.remove();
          res.json(200, {message: "Todo removed."});
        } else {
            res.json(403, {message: "Could not delete todo. " + err});
          }
    });
  };