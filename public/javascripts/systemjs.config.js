/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {

    var packages = {
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
        paths: {
            // paths serve as alias
            'npm:': 'scripts/',
            'public:': ''
        },
        map: {
            // our app is within the app folder
            app: 'public:javascripts/app/main.js',
            // angular bundles
            '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
            '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
            '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
            '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
            '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
            '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
            '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
            '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
            '@angular/upgrade': 'npm:@angular/upgrade/bundles/upgrade.umd.js',
            // other libraries
            'rxjs':                      'npm:rxjs',
            'angular2-busy':             'npm:angular2-busy/index.js',
            'angular2-dynamic-component':    'npm:angular2-dynamic-component',
            'ts-metadata-helper':    'npm:ts-metadata-helper',
            'core-js':    'npm:core-js',
            'ng2-dropdown': 'npm:ng2-dropdown',
            'ng2-device-detector': 'npm:ng2-device-detector/dist',
            'angular2-in-memory-web-api': 'npm:angular2-in-memory-web-api',
            'angular2-cookie':            'npm:angular2-cookie',
            'lodash':            'npm:lodash',
            'ng2-bootstrap/ng2-bootstrap': 'npm:ng2-bootstrap/bundles/ng2-bootstrap.umd.js',
            'moment': 'npm:moment/moment.js'
        },
    });
})(this);