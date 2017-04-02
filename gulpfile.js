var gulp = require('gulp');
var concat = require('gulp-concat');
var browserSync = require('browser-sync');
var jshint = require('gulp-jshint');
var svgmin = require('gulp-svgmin');
var htmlmin = require('gulp-htmlmin');
var argv = require('yargs').argv;
var gulpif = require('gulp-if');
var sourcemaps = require('gulp-sourcemaps');
var run = require('gulp-run');
var rename = require('gulp-rename');
var reload = browserSync.reload;

var JS_BLOB = ['js/*.js', 'js/libs/*.js', 'js/dynamic/*.js'];
var CSS_BLOB = 'css/*.css';
var HTML_BLOB = '*.html';
var MAPS_BLOB = 'static/maps/*.svg';
var STATIC_BLOB = 'static/*';
var BUILD_BLOBS = ['build/*', 'build/*/*'];
var DESCRIPTION_BLOB = 'static/descriptions/*.html';

var tasks = {};

// JavaScript tasks
gulp.task('lint', tasks.lint = function() {
    return gulp.src(JS_BLOB)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('build_js', ['build_maps:metadata'], tasks.build_js = function() {
    gulp.src(JS_BLOB)
        .pipe(sourcemaps.init())
        .pipe(concat('scripts.js'))
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest('./build/js/'));
});

// HTML tasks
gulp.task('build_html', tasks.build_html = function() {
    gulp.src(HTML_BLOB)
        .pipe(gulpif(argv.minify, htmlmin({collapseWhitespace: true})))
        .pipe(gulp.dest('./build/'));
});

// CSS tasks
gulp.task('build_css', tasks.build_css = function() {
    gulp.src(CSS_BLOB)
        .pipe(concat('styles.css'))
        .pipe(gulp.dest('./build/css/'));
});

// Static file tasks
gulp.task('build_static', tasks.build_static = function() {
    gulp.src(STATIC_BLOB)
        .pipe(gulp.dest('build/static/'));
});

gulp.task('build_descriptions', tasks.build_descriptions = function() {
    gulp.src(DESCRIPTION_BLOB)
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('build/static/descriptions'));
});

// Map tasks
gulp.task('build_maps', tasks.build_maps = function() {
    gulp.src(MAPS_BLOB)
        .pipe(svgmin({
            plugins: [{
                mergePaths: false,
                cleanupIDs: false
            }]
        }))
        .pipe(gulp.dest('build/static/maps/'));
});
gulp.task('gen_maps_metadata', tasks.gen_maps_metadata = function() {
    run('python3 python/generate_map_ranges.py').exec()
        .pipe(rename('map_ranges.js'))
        .pipe(gulp.dest('js/dynamic/'));
});
gulp.task('build_maps:metadata', ['gen_maps_metadata'], tasks.build_maps);

// General build task
gulp.task('build', ['build_maps:metadata', 'build_html', 'build_js',
                    'build_css', 'build_static', 'build_descriptions']);

// Live serve task
gulp.task('serve', tasks.serve = function() {
    browserSync({
        server: {
            baseDir: './build/'
        }
    });

    gulp.watch(BUILD_BLOBS, {cwd: '.'}, function() {
        reload();
    });
});
