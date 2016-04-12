'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');
var nodemon = require('gulp-nodemon');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var path = require('path');

var sourcemaps = require("gulp-sourcemaps");
var babelify = require("babelify");

//var KarmaServer = require('karma').Server;

var dest = path.join(__dirname, 'public/dist');

gulp.task('default', function(cb) {
	//runSequence('install', 'index', 'watch', 'serve', cb);
	runSequence('build-app', 'sass', cb);
});

gulp.task('dist', function(cb) {
	//runSequence('install', 'index', 'watch', 'serve', cb);
	runSequence('build-app', 'sass', cb);
});

gulp.task('watch', function() {
	gulp.watch(['public/src/**/*.js', 'public/index.html'], ['build-app']);
	gulp.watch(['public/styles/*.sass'], ['sass']);

});

// bundle application code
gulp.task('build-app', function() {

	var externalLib = ['react', 'jquery', 'react-dom', 'flux', 'q'];
	var polyfill = ['object-assign', 'isomorphic-fetch'];
	// build external libs;
	var core_lib = browserify();

	core_lib.require(externalLib);

	core_lib.bundle().pipe(source('vendor.js'))
		.pipe(gulp.dest(dest));


	// optionally loaded polyfills
	var poly_fill = browserify();
	poly_fill.require(polyfill);
	poly_fill.bundle().pipe(source('polyfill.js'))
		.pipe(gulp.dest(dest));

	// build application bundle
	var application = browserify(path.join(__dirname, 'public/src/app.js'), {
		debug: true
	});

	application.external(externalLib);
	application.external(polyfill);

	application.transform(babelify);

	application.bundle()
		//Pass desired output filename to vinyl-source-stream
		.pipe(source('bundle.js'))
		// Start piping stream to tasks!
		.pipe(gulp.dest(dest));
});

gulp.task('sass', function () {
	gulp.src(path.join(__dirname, 'public/styles/style.sass'))
		.pipe(sass().on('error', sass.logError))
		.pipe(postcss([autoprefixer({browsers: ['last 2 versions']})]))
		.pipe(gulp.dest(dest));
});
