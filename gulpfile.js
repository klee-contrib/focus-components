// Dependencies

var gulp = require('gulp');
var babelify = require("babelify"); //es6
var browserify = require('browserify'); //build the source
var watchify = require('watchify'); //build the source
var source = require('vinyl-source-stream');


/**
* LINT
*/
var src = 'src/**/*.js';
var srcCSS = 'src/**/*.scss';
var sources = [src];
gulp.task('eslint', function() {
	//gulp eslint 2>lint/lintErrors.txt
	var eslint = require('gulp-eslint');
	var options = {
		"globals": {
			"jQuery": false,
			"$": true,
			"require": true,
			"Backbone": true,
			"Fmk": true,
			"_": true,
			"Promise": true,
			"module": true
		},
		"env": {
			"browser": true,
			"node": true
		},
		rules: {
			"valid-jsdoc": [2, {
				"requireParamDescription": true
			}],
			"quotes": [0]
		}
	};
	var format = "compact"; //"compact", "checkstyle", "jslint-xml", "junit" and "tap".
	gulp
	.src(sources)
	.pipe(eslint(options))
	.pipe(eslint.formatEach(format, process.stderr));
});

/****************************
JS BUILD
**********************/
function generateGulpBuildTask(name) {
	gulp.task(name, function() {
		var literalify = require('literalify');
		var build = name === "browserify" ? browserify : watchify;
		return build(({
			entries: ['./src/index.js'],
			extensions: ['.jsx'],
			standalone: 'FocusComponents'
		}))
		.transform({
			global: true
		}, literalify.configure({
			react: 'window.React',
			focus: 'window.Focus',
			jquery: 'window.jQuery',
			backbone: 'window.Backbone',
			moment: 'window.moment'
		}))
		.transform(babelify)
		.bundle()
		//Pass desired output filename to vinyl-source-stream
		.pipe(source('focus-components.js'))
		.pipe(gulp.dest('./dist/js'))
		.pipe(gulp.dest('./example/js'))
		.pipe(gulp.dest('../focus-demo/ui/vendor'));
	});
}
generateGulpBuildTask("browserify");
generateGulpBuildTask("watchify");


/*************************************
STYLE BUILD
*********************************/

gulp.task('style', function() {
	var sass = require('gulp-sass');
	var concat = require('gulp-concat');
	gulp.src(['src/**/*.scss'])
	.pipe(sass())
	.pipe(concat('focus-components.css'))
	.pipe(gulp.dest('./example/css/'))
	.pipe(gulp.dest('./dist/css'))
	.pipe(gulp.dest('../focus-demo/ui/vendor'));
});

gulp.task('build', ['browserify', 'style']);
