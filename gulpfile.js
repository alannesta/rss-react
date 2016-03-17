'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');
var nodemon = require('gulp-nodemon');
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var path = require('path');

//var KarmaServer = require('karma').Server;

var dest = path.join(__dirname, 'public/dist');

gulp.task('default', function(cb) {
	//runSequence('install', 'index', 'watch', 'serve', cb);
	runSequence('build-app', 'sass', 'serve', 'watch', cb);
});

gulp.task('dist', function(cb) {
	//runSequence('install', 'index', 'watch', 'serve', cb);
	runSequence('build-app', 'sass', cb);
});

gulp.task('watch', function() {
	gulp.watch(['public/src/**/*.js', 'public/index.html'], ['build-app']);
	gulp.watch(['public/styles/*.sass'], ['sass']);

});

// bundle applicatio code
gulp.task('build-app', function() {

	var b = browserify(path.join(__dirname, 'public/src/app.js'), {
		debug: true
	});

	b.transform(reactify);

	return b.bundle()
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

gulp.task('serve', function() {
	nodemon({
		script: 'server.js',
		env: { 'NODE_ENV': 'development' }
	})
});

//gulp.task('test', function(cb) {
//    var server = new KarmaServer({
//        configFile: __dirname + '/karma.conf.js',
//        singleRun: true
//    }, cb);
//
//    server.start();
//});
