// set variables for environment
var express = require('express'),
            app = express(),
            path = require('path');

// views as directory for all template files
app.set('views', path.join(__dirname, 'public/views'));
app.set('view engine', 'jade');

app.use(express.static('public'));

// set routes
app.get('/', function(req, res) {
  res.render('index', { title: 'The index page!' })
});

// Set server port
app.listen(4000);
console.log('server is running');