var components = require('./package.json').components;
var componentServers = {};
var port = "3000";
/**
 * Creates a component map with all existing components.
 */
components.map(function(component) {
	var pth = '/' + component.path + '/example/';
	console.log('route', component.name, 'path', pth);
	componentServers[component.name] = pth; //new static.Server(pth);
});
/**
 * Render the existing components list with links.
 */
function componentsUrl() {
	var sb = "";
	for (var component in componentServers) {
		sb = sb +
			"<li><a href='http://localhost:" +
			port + "/" + component + "'>" +
			component +
			"</a></li>";
	}
	return sb;
}

//Creates a static server for each components example.
var express = require('express');
var app = express();
for (var componentName in componentServers) {
	app.use('/' + componentName,
		express.static(__dirname + componentServers[componentName])
	);
}
app.use('/example', express.static(__dirname + "/example"));
app.use('/dist', express.static(__dirname + "/dist"));
//Add a special 404 with all existing components and their urls.
app.use(function(req, res, next) {
	res.status(404)
		.send('<p>The component you requested does not exists</p>' +
			'<h1>Components available</h1><ul>' + componentsUrl() +
			'</ul>');
});

//Start the application.
app.listen(port, function() {
	console.log('application started on port: ', port)
});
