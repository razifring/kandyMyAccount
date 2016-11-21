/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {

    var packages = {
        app: {
            main: './main.js',
            defaultExtension: 'js'
        },
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
    };

    var packageNames = [
        '@angular/common',
        '@angular/compiler',
        '@angular/core',
        '@angular/http',
        '@angular/platform-browser',
        '@angular/platform-browser-dynamic',
        '@angular/router',
        '@angular/router-deprecated',
        '@angular/testing',
        '@angular/upgrade',
    ];

    packageNames.forEach(function(pkgName) {
        packages[pkgName] = { main: 'index.js', defaultExtension: 'js' };
    });

    System.config({
        defaultJSExtensions: true,
        packages: packages,
        map: {
            // our app is within the app folder
            app: 'javascripts/app',
            // angular bundles
            '@angular/core': 'scripts/@angular/core/bundles/core.umd.js',
            '@angular/common': 'scripts/@angular/common/bundles/common.umd.js',
            '@angular/compiler': 'scripts/@angular/compiler/bundles/compiler.umd.js',
            '@angular/platform-browser': 'scripts/@angular/platform-browser/bundles/platform-browser.umd.js',
            '@angular/platform-browser-dynamic': 'scripts/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
            '@angular/http': 'scripts/@angular/http/bundles/http.umd.js',
            '@angular/router': 'scripts/@angular/router/bundles/router.umd.js',
            '@angular/forms': 'scripts/@angular/forms/bundles/forms.umd.js',
            '@angular/upgrade': 'scripts/@angular/upgrade/bundles/upgrade.umd.js',
            // other libraries
            'rxjs':                      'scripts/rxjs',
            'angular2-busy':             'scripts/angular2-busy/index.js',
            'angular2-dynamic-component':    'scripts/angular2-dynamic-component',
            'ts-metadata-helper':    'scripts/ts-metadata-helper',
            'core-js':    'scripts/core-js',
            'ng2-dropdown': 'scripts/ng2-dropdown',
            'ng2-device-detector': 'scripts/ng2-device-detector/dist',
            'angular2-in-memory-web-api': 'scripts/angular2-in-memory-web-api',
            'angular2-cookie':            'scripts/angular2-cookie',
            'lodash':            'scripts/lodash',
            'ng2-bootstrap/ng2-bootstrap': 'scripts/ng2-bootstrap/bundles/ng2-bootstrap.umd.js',
            'moment': 'scripts/moment/moment.js'
        },
    });
})(this);