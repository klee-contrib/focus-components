(function() {
	var components = getComponents();
	var localServerOptions = {
		port: 3000
	};
	createLocalServer(components, localServerOptions);
	generateGithubPage(components);
})();

/**
 * Get the components to serve, as an array looking like [{name, path}, ...]
 * @return {array} Components to serve
 */
function getComponents() {
	var componentsConfig = require('./package.json').components.sort(function(a, b){
		if(a.name > b.name){
			return 1;
		}
		if (a.name < b.name){
			return -1;
		}
		return 0;
	});
	return componentsConfig.reduce(function(components, component) {
		var path = '/src/' + component.path + '/example/';
		console.log('route', component.name, 'path', path);
		components[component.name] = path;
		return components;
	}, {});
}

/**
 * Create local web server.
 * @param  {array} components        components to serve
 * @param  {object} localServerOptions server options
 */
function createLocalServer(components, localServerOptions) {
	var express = require('express');
	var app = express();

	// Add static paths

	Object.keys(components).map(function(componentName) {
		var component = components[componentName];
		app.use('/' + componentName, express.static(__dirname + component));
	});

	app.use('/focus-components/example', express.static(__dirname + "/example"));
	app.use('/focus-components/dist', express.static(__dirname + "/dist"));

	// Generate content

	var localServerContent = buildPageHtml(localServerOptions, components);

	// Add a special 404 with all existing components and their urls.
	app.use(function(req, res, next) {
		res.status(404).send(localServerContent);
	});

	app.listen(localServerOptions.port, function() {
		console.log('Application started on port: ', localServerOptions.port)
	});
}

/**
 * Generate Github page file, then save it to "components.html"
 * @param  {array} components        components to generate the file from
 */
function generateGithubPage(components) {
	var githubPageContent = buildPageHtml({isGhPage: true, urlRoot: 'kleegroup.github.io/focus-components'}, components);
	var fs = require('fs');
	fs.writeFile(__dirname + '/components.html', githubPageContent, function(err) {
		if (err) {
			throw err;
		}
		console.log("Github page file was successfully saved !");
	});
}

/**
 * Build components links
 * @param  {object} opts the options
 * @return {HTML}      the rendered links
 */
function buildComponentsLinks(opts, components) {
	opts = opts || {};
	var urlRoot = 'http://' + (opts.urlRoot || 'localhost');
	var portSuffix = opts.port ? (':' + opts.port) : '';
	var isGhPage = opts.isGhPage || false;
	return Object.keys(components).reduce(function(links, componentName) {
		var component = components[componentName];
		links += "<li><a href='" + urlRoot + portSuffix + '/' + componentName
		+ "'>" + componentName + "</a><img src ='http://react-components.com/img/react.svg' /></li>";
		return links;
	}, '');
}

/**
 * Build static page HTML
 * @param  {object} opts       page options
 * @param  {array} components
 * @return {HTML}            The rendered HTML
 */
function buildPageHtml(opts, components){
	var fonts ="<link href='http://fonts.googleapis.com/css?family=Lato' rel='stylesheet' type='text/css'>"
	var style ='<style>body{color: white; background-color: blue; font-family: "Lato", sans-serif;} ul { display: flex; flex-wrap: wrap;  list-style-type: none;} li { background: url("https://facebook.github.io/react/img/logo_og.png") bottom center no-repeat; margin-top: 7px; margin-right: 7px; padding-top: 10px; height: 50px; background: white; flex: 1;	  min-width: 20%; border: 2px solid red;} li a{ text-align: center} li img{width: 20px; }</style> ';
	return fonts + style + '<h1>Components available</h1><ul>' + buildComponentsLinks(opts, components) + '</ul>';
}
