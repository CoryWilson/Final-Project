var gulp         = require('gulp'),
    assign       = require('lodash.assign'),
    browserify   = require('browserify'),
    browserSync  = require('browser-sync').create(),
    bower        = require('gulp-bower'),
    buffer       = require('vinyl-buffer'),
    childProcess = require('child_process'),
    del          = require('del'),
    gUtil        = require('gulp-util'),
    minifyCss    = require('gulp-minify-css'),
    nodemon      = require('gulp-nodemon'),
    notify       = require('gulp-notify'),
    rename       = require('gulp-rename'),
    reload       = browserSync.reload,
    sass         = require('gulp-sass'),
    source       = require('vinyl-source-stream'),
    sourcemaps   = require('gulp-sourcemaps'),
    uglify       = require('gulp-uglify'),
    watchify     = require('watchify');

var config = {
  sassPath        : './dev/sass',
  jsPath          : './dev/js',
  ngViewPath      : './dev/js/app/**/views',
  fontPath        : './assets/fonts',
  imgPath         : './assets/images',
  controllersPath : './app/controllers',
  modelsPath      : './app/models',
  routesPath      : './app/routes',
  viewsPath       : './app/views'
};

/* Clean Public Folder */
gulp.task('clean', function(){
  return del([
    './public/',
    '!./public/assets/fonts/**/*'
  ]);
});

/* Bower */
gulp.task('bower', function(){
  return bower();
});

/* Scripts */
gulp.task('scripts', ['clean'], function(){
  gulp.src(config.jsPath+'main.js')
    .pipe(sourcemaps.init())
      .pipe(uglify())
      .pipe(rename('main.min.js'))
    .pipe(sourcemaps.write('../../../maps/js'))
    .pipe(gulp.dest('./public/assets/js'));
});

gulp.task('script-watch', ['scripts'], reload);

gulp.task('ng-scripts', ['clean'], function(){
  gulp.src(config.jsPath+'/app/**/**/*.js')
  .pipe(sourcemaps.init())
  .pipe(sourcemaps.write('../../../../maps/js/angularApp'))
  .pipe(gulp.dest('./public/assets/js/app'));
});

gulp.task('ng-script-watch', ['ng-scripts'], reload);

gulp.task('ng-html', ['clean'], function(){
  gulp.src(config.ngViewPath+'/*.html')
  .pipe(gulp.dest('./public/assets/js/app/'));
});

gulp.task('ng-html-watch', ['ng-html'], reload);

/* Nodemon */
var BROWSER_SYNC_RELOAD_DELAY = 500;

gulp.task('nodemon', function (cb) {
  var called = false;
  return nodemon({

    // nodemon our expressjs server
    script: 'app.js',

    // watch core server file(s) that require server restart on change
    watch: ['app.js']
  })
    .on('start', function onStart() {
      // ensure start only got called once
      if (!called) { cb(); }
      called = true;
    })
    .on('restart', function onRestart() {
      // reload connected browsers after a slight delay
      setTimeout(function reload() {
        reload({
          stream: false   //
        });
      }, BROWSER_SYNC_RELOAD_DELAY);
    });
});

/* Startup the app server */
gulp.task('mongod', function(){
  childProcess.exec('mongod', function(err,stdout){
    console.log(stdout);
  });
});

/* Styles */
gulp.task('styles', function(){
  gulp.src(config.sassPath+'/main.scss')
  .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(minifyCss())
    .pipe(rename('main.min.css'))
  .pipe(sourcemaps.write('../../../maps/css'))
  .pipe(gulp.dest('./public/assets/css'))
  .pipe(browserSync.stream())
  .pipe(notify('Wubalubadubdub! Styles Done!'));
});

/* Styles task without browser-sync */
gulp.task('styles-no-bs', ['clean'], function(){
  gulp.src(config.sassPath+'/main.scss')
  .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(minifyCss())
    .pipe(rename('main.min.css'))
  .pipe(sourcemaps.write('../../../maps/css'))
  .pipe(gulp.dest('./public/assets/css'));
});

/* Images */
gulp.task('images', ['clean'], function(){
  gulp.src(config.imgPath+'/**/*.*')
  .pipe(gulp.dest('./public/assets/images'));
});

gulp.task('image-watch', ['images'], reload);

/* Fonts */
gulp.task('fonts', ['clean'], function(){
  gulp.src(config.fontPath+'/*/*')
  .pipe(gulp.dest('./public/assets/fonts'));
});

/* Browser Sync */
gulp.task('browser-sync', ['nodemon'], function(){
  browserSync.init({
    files   : ['./public/**/*.*'],
    proxy   : 'http://localhost:3000',
    port    : 4000,
    browser : ['google-chrome'],
    open    : false
  });

  gulp.watch(config.sassPath+'/**/**/*.scss',['styles']);
  gulp.watch(config.jsPath+'/*.js',['script-watch']);
  gulp.watch(config.jsPath+'/app/**/**/*.js', ['ng-script-watch']);
  gulp.watch(config.ngViewPath+'/*.html',['ng-html-watch']);
  gulp.watch(config.imgPath+'/*.*',['image-watch']);
  gulp.watch('./app/*/*',reload);
  gulp.watch('./app.js',reload);
  gulp.watch('./public/*',reload);
});

//Build Task
gulp.task('build',['images','fonts','ng-html','styles-no-bs','scripts','ng-scripts']);

//Default Task
//Cleans public folder
//Rebuilds public folder
//Starts mongod
//Runs browser-sync
gulp.task('default', ['browser-sync']);
