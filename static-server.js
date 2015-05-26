
var components = require('./package.json').components.sort(function(a, b){
	if(a.name > b.name){
		return 1;
	}
	if (a.name < b.name){
		return -1;
	}
	return 0;
});
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
	prt = (opts.port !== undefined && opts.port !== '') ? (':' + port + '/') : '';
	var sb = "";
	for (var component in componentServers) {
		sb = sb +
			"<li><a href='" + urlRoot +
			prt  + (isGhPage ? componentServers[component]: component) + "'>" +
			component +
			"</a><img src ='http://react-components.com/img/react.svg' /></li>";
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
	//var style = ' <style>* { box-sizing: border-box; } ul{width: 100%; flex-wrap: wrap; list-style-type: none; display: flex; margin: -1em 0 0 -1em; align-items: flex-start;  min-width: 25%;}   li{flex-grow: 1; flex: 1; padding: 1em 0 0 1em; align-self: flex-start;}</style>';
	var fonts ="<link href='http://fonts.googleapis.com/css?family=Lato' rel='stylesheet' type='text/css'>"
	var style ='<style>body{color: white; background-color: blue; font-family: "Lato", sans-serif;} ul { display: flex; flex-wrap: wrap;  list-style-type: none;} li { background: url("https://facebook.github.io/react/img/logo_og.png") bottom center no-repeat; margin-top: 7px; margin-right: 7px; padding-top: 10px; height: 50px; background: white; flex: 1;	  min-width: 20%; border: 2px solid red;} li a{ text-align: center} li img{width: 20px; }</style> ';
	return fonts + style + '<p>The component you requested does not exists</p>' +
		'<h1>Components available</h1><ul>' + componentsUrl(opts) +
		'</ul>';
}
var page =buildPage({port: port});
var ghPage =buildPage({isGhPage: true, urlRoot: 'kleegroup.github.io/focus-components', port: ''});

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
