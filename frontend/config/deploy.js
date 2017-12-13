module.exports = function (deployTarget) {
    var ENV = {
        // include other plugin configuration that applies to all deploy targets here
        build: {
            environment: deployTarget
        },
        'revision-data': {
            type: 'git-commit'
        },
        's3-index': {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            bucket: "give-me-love",
            region: "sa-east-1",
            allowOverwrite: true
        },
        's3': {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            bucket: "give-me-love",
            region: "sa-east-1"
        }
    };

    if (deployTarget === 'development') {
        // configure other plugins for development deploy target here
    }

    if (deployTarget === 'staging') {
        // configure other plugins for staging deploy target here
    }

    if (deployTarget === 'production') {
        // configure other plugins for production deploy target here
    }

    // Note: if you need to build some configuration asynchronously, you can return
    // a promise that resolves with the ENV object instead of returning the
    // ENV object synchronously.
    return ENV;
};
