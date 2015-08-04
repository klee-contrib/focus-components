var gulp = require('gulp');

//Build the JavaScript source.


var babelify = require("babelify"); //es6
var browserify = require('browserify'); //build the source
var watchify = require('watchify'); //build the source
var source = require('vinyl-source-stream');


/**
 * LINT
 */
var src = '{spec,search,list,form,page,common,application}/**/*.js';
var srcCSS = '{spec,search,list,form,page,common,application,style}/**/*.scss';
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
				/*  "prefer": {
					"return": "return"
				},*/
				"requireParamDescription": true
			}],
			"quotes": [0]
		}
	};
	var format = "compact"; //"compact", "checkstyle", "jslint-xml", "junit" and "tap".
	gulp
		.src(sources)
		.pipe(eslint(options))
		//.pipe(eslint.format(undefined, process.stdout))
		//.pipe(eslint.failOnError())
		.pipe(eslint.formatEach(format, process.stderr));
	//.on('error', gutil.log);
});

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
	var literalify = require('literalify');
	return browserify(({
			entries: [entryFile],
			extensions: ['.jsx'],
			standalone: "FocusComponents." + directory.replace('/', '.')
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
		.pipe(source(generatedFile))
		.pipe(gulp.dest('./' + directory + '/example/js/'));
}
/*gulp.task('browserify', function() {
	var literalify = require('literalify');
	return browserify(({
			entries: ['./index.js'],
			extensions: ['.jsx'],
			standalone: "focus-components"
		}))
		.transform({
			global: true
		}, literalify.configure({
			react: 'window.React',
			focus: 'window.focus'
		}))
		.transform(babelify)
		.bundle()
		//Pass desired output filename to vinyl-source-stream
		.pipe(source('focus-components.js'))
		.pipe(gulp.dest('./dist/'))
		.pipe(gulp.dest('./example/js'));
});
*/
function build(name){
	gulp.task(name, function() {
		var literalify = require('literalify');
		var build = name === "browserify" ? browserify : watchify;
		return build(({
				entries: ['./index.js'],
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
			.pipe(gulp.dest('../rodolphe-demo/ui/vendor'));
	});
}
build("browserify");
build("watchify");
gulp.task('componentify-js', function() {
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
function styleBuild(directory, options) {
	options = options || {};
	var sass = require('gulp-sass');
	var concat = require('gulp-concat');
	var generatedFile = (options.generatedFile || "component.css");
	return gulp.src([directory + '/**/*.scss'])
		.pipe(sass())
		.pipe(concat(generatedFile))
		.pipe(gulp.dest(directory + '/example/css/'));
}

gulp.task('componentify-style', function() {
	//Each component build
	var components = require('./package.json').components || [];
	return components.forEach(function(component) {
		return styleBuild(component.path, {
			generatedFile: component.name + ".css"
		});
	});
});

gulp.task('style', function() {
	var sass = require('gulp-sass');
	var concat = require('gulp-concat');
	gulp.src(['{spec,search,list,form,page,common,application,style}/**/*.scss'])
		.pipe(sass())
		.pipe(concat('focus-components.css'))
		.pipe(gulp.dest('./example/css/'))
		.pipe(gulp.dest('./dist/css'))
		.pipe(gulp.dest('../rodolphe-demo/ui/vendor'));
});

gulp.task('build', ['browserify', 'style', 'componentify-img'])
gulp.task('componentify', ['componentify-js', 'componentify-style',
	'componentify-img'
]);

/****************************
  IMAGE BUILD
****************************/
function imgBuild(directory, options) {
	options = options || {};
	return gulp.src([directory + '/assets/img/*.{svg,gif,png}'])
		.pipe(gulp.dest(directory + '/example/img/'))
        .pipe(gulp.dest('./dist/img/'));
}
gulp.task('componentify-img', function() {
	var components = require('./package.json').components || [];
	return components.forEach(function(component) {
		return imgBuild(component.path);
	});

});

//Copy the focus-components directory into another repository.
gulp.task('focus-components-npm', ['style', 'browserify'], function() {
	var react = require('gulp-react');
	var babel = require('gulp-babel');
	var gulpif = require('gulp-if');
	return gulp.src(['package.json', 'index.js',
			'{spec,search,list,form,common,example,page,application}/**/*.{js,css}'
		])
		.pipe(gulpif(/[.]js$/, react({
			harmony: true
		})))
		.pipe(gulpif(/[.]js$/, babel()))
		.pipe(gulp.dest('../rodolphe/app/node_modules/focus-components/'));
});
gulp.task('watch', function(){
	gulp.watch(['package.json','index.js',src, srcCSS],['build', 'style']);
});

//Build the style woth sass.
