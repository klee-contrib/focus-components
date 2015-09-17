var express = require('express');
var app = express();

// Server config

var port = 3000;

// Add static path

app.use('/images', express.static(__dirname + '/showcase/assets'));
app.use('/', express.static(__dirname + '/showcase'));

app.listen(port, function() {
	console.log('Application started on port: ', port)
});
