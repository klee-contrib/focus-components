var components = require('./package.json').components;
var componentServers = {};
components.map(function(component) {
	var pth = '/' + component.path + '/example/';
	console.log('route', component.name, 'path', pth);
	componentServers[component.name] = pth; //new static.Server(pth);
});

var express = require('express');
var app = express();
for (var componentName in componentServers) {
	//console.log('route', "/" + componentName);
	//console.log('path', __dirname + componentServers[componentName]);
	app.use('/' + componentName,
		express.static(__dirname + componentServers[componentName])
	);
}

app.listen(3000);
