var gulp = require('gulp');

//Build the JavaScript source.


var babelify = require("babelify"); //es6
var browserify = require('browserify'); //build the source
var source = require('vinyl-source-stream');

/****************************
  JS BUILD
**********************/

/**
 * Build a js file from a given source.
 * @param {string} directory - directory name
 * @param {object} options   [description]
 */
function jsBuild(directory, options) {
	options = options || {};
	var entryFile = './' + directory + '/' + (options.entryFile || 'index.js');
	var generatedFile = (options.generatedFile || "generated.js");
	return browserify(({
			entries: [entryFile],
			extensions: ['.jsx'],
      standalone: "focus.components." + directory.replace('/', '.')
		}))
		.transform(babelify)
		.bundle()
		//Pass desired output filename to vinyl-source-stream
		.pipe(source(generatedFile))
		.pipe(gulp.dest('./' + directory + '/example/js/'));
}
gulp.task('browserify', function() {
	return browserify(({
			entries: ['./index.js'],
			extensions: ['.jsx'],
      standalone: "focus.components"
		}))
		.transform(babelify)
		.bundle()
		//Pass desired output filename to vinyl-source-stream
		.pipe(source('focus-components.js'))
		.pipe(gulp.dest('./dist/'))
		.pipe(gulp.dest('./example/js'));
});
gulp.task('componentify', function() {
	//Each component build
	var components = require('./package.json').components || [];
	return components.forEach(function(component) {
		return jsBuild(component.path, {
			entryFile: "index.js",
			generatedFile: component.name + ".js"
		});
	});
});

/*************************************
  STYLE BUILD
*********************************/





//Build the style woth sass.
