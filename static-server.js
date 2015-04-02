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
function componentsUrl(opts) {
	opts = opts || {};
	var isGhPage = opts.isGhPage || false,
	urlRoot = 'http://' + (opts.urlRoot || 'localhost'),
	prt = opts.port || (':' + port + '/');
	var sb = "";
	for (var component in componentServers) {
		sb = sb +
			"<li><a href='" + urlRoot +
			prt  + (isGhPage ? componentServers[component]: component) + "'>" +
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
function buildPage(opts){
	return '<p>The component you requested does not exists</p>' +
		'<h1>Components available</h1><ul>' + componentsUrl(opts) +
		'</ul>';
}
var page =buildPage();
var ghPage =buildPage({isGhPage: true, urlRoot: 'kleegroup.github.io/focus-components', port: ':80'});

app.use('/focus-components/example', express.static(__dirname + "/example"));
app.use('/focus-components/dist', express.static(__dirname + "/dist"));
//Add a special 404 with all existing components and their urls.
app.use(function(req, res, next) {
	res.status(404)
		.send(page);
});

//Start the application.
app.listen(port, function() {
	console.log('application started on port: ', port)
});
//Save the ghPagefile.
//
var fs = require('fs');
fs.writeFile(__dirname + '/components.html', ghPage, function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
});
