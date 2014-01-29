module.exports = function  (config) {
    config.set({
        basePath:'',
        frameworks:['jasmine'],

        files:[
            'lib/angular/angular.js',
            'lib/angular-mocks/angular-mocks.js',
            'lib/angular-resource/angular-resource.js',
            'lib/angular-route/angular-route.js',
            'src/hyUI/hySplitPanel/*.js',
            'test/hyUI/hySplitPanel/*.js'
        ],
        exclude:[],
        port:8080,
        logLevel: config.LOG_INFO,

        autoWatch:true,
        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: ['PhantomJS'],
        reporters:['mocha'],
        singleRun: false
    });
};