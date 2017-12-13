module.exports = function(environment) {
    var appName = 'give-me-love',
        ENV = {
        modulePrefix: appName,
        environment: environment,
        rootURL: '/',
        locationType: 'auto',
        EmberENV: {
            FEATURES: {
                // Here you can enable experimental features on an ember canary build
                // e.g. 'with-controller': true
            },
            EXTEND_PROTOTYPES: {
                // Prevent Ember Data from overriding Date.parse.
                Date: false
            }
        },

        APP: {
            // Here you can pass flags/options to your application instance
            // when it is created
        },

        contentSecurityPolicy: {
            'object-src': "'self' blob:",
            'style-src': "'self' 'unsafe-inline'",
            'connect-src': `'self' wss://${appName}.com:49152/livereload`,
            'script-src': "'self' 'unsafe-eval'",
            'media-src': "'self' blob:"
        }
    };

    const hosts = ['localhost', '0.0.0.0', '127.0.0.1'],
        srcs = ['connect', 'script', 'style', 'image', 'default'],
        csp = ENV.contentSecurityPolicy;

    hosts.forEach(host => {
        srcs.forEach(src => csp[`${src}-src`] += ` ${host}:49152/* ${host}:4200/* ${host}:3000/* *`)
    });

    if (environment === 'development') {
        //ENV.APP.LOG_RESOLVER = true;
        //ENV.APP.LOG_ACTIVE_GENERATION = true;
        ENV.APP.LOG_TRANSITIONS = true;
        //ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
        ENV.APP.LOG_VIEW_LOOKUPS = true;
    }

    if (environment === 'test') {
        // Testem prefers this...
        ENV.locationType = 'none';

        // keep test console output quieter
        ENV.APP.LOG_ACTIVE_GENERATION = false;
        ENV.APP.LOG_VIEW_LOOKUPS = false;

        ENV.APP.rootElement = '#ember-testing';
    }

    if (environment === 'production') {

    }

    return ENV;
};
