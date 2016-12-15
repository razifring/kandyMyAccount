var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var typescript = require('gulp-typescript');
var systemjsBuilder = require('systemjs-builder');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');
console.log(gutil.env);
// Compile TypeScript app to JS
gulp.task('compile:ts', function () {
    return gulp
        .src([
            "public/javascripts/**/*.ts",
            "typings/*.d.ts"
        ])
        .pipe(sourcemaps.init())
        .pipe(typescript({
            "module": "system",
            "moduleResolution": "node",
            "outDir": "javascripts/app",
            "target": "ES5"
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('javascripts/app'));
});

// Generate systemjs-based bundle (app/app.js)
gulp.task('bundle:app', function() {
    let bsaeUrl;
    if(gutil.env.env==='dev'){
        baseUrl = '/home/vagrant/mean';
    } else {
        baseUrl = '/nodes/node_Kandy-Stage_nodeMyAccount_pm2/origin/develop';
    }

    var builder = new systemjsBuilder(baseUrl, './public/javascripts/systemjs.config.js');
    builder.config({
        packages:{
            rxjs: {
                defaultExtension: 'js'
            },
            "ng2-dropdown": {
                main: 'index.js',
                defaultExtension: 'js'
            },
            "ng2-device-detector": {
                main: 'index.js',
                defaultExtension: 'js'
            },
            'angular2-in-memory-web-api': {
                main: './index.js',
                defaultExtension: 'js'
            },
            'angular2-cookie': {
                main: './core.js',
                defaultExtension: 'js'
            },
            'lodash':{
                main:'index.js', defaultExtension:'js'
            },
            'bootstrap':{
                main:'index.js', defaultExtension:'js'
            }
        },
        paths: {
            'npm:': './node_modules/',
            'public:': './public/'
        }
    });
    return builder.buildStatic('app', 'public/javascripts/app/app.js');
});

// Copy and bundle dependencies into one file (vendor/vendors.js)
// system.config.js can also bundled for convenience
gulp.task('bundle:vendor', function () {
    return gulp.src([
        'node_modules/zone.js/dist/zone.js',
        'node_modules/reflect-metadata/Reflect.js',
        'node_modules/systemjs/dist/system.src.js',
    ])
        .pipe(concat('vendors.js'))
        .pipe(gulp.dest('public/javascripts/vendor'));
});

// Copy dependencies loaded through SystemJS into dir from node_modules
gulp.task('copy:vendor', function () {
    gulp.src(['node_modules/rxjs/**/*'])
        .pipe(gulp.dest('public/lib/js/rxjs'));

    gulp.src(['node_modules/angular2-in-memory-web-api/**/*'])
        .pipe(gulp.dest('public/lib/js/angular2-in-memory-web-api'));

    return gulp.src(['node_modules/@angular/**/*'])
        .pipe(gulp.dest('public/lib/js/@angular'));
});

gulp.task('vendor', ['bundle:vendor', 'copy:vendor']);
gulp.task('app', ['compile:ts', 'bundle:app']);

// Bundle dependencies and app into one file (app.bundle.js)
gulp.task('bundle', ['vendor', 'app'], function () {
    return gulp.src([
        'javascripts/app/app.js',
        'vendor/vendors.js'
    ])
        .pipe(concat('app.bundle.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./javascripts/app'));
});

gulp.task('default', ['bundle']);