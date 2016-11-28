const path = require('path');
const restify = require('restify');
const isDevelopment = process.env.NODE_ENV !== 'production';
const mongoose = require('mongoose');
const lib = require('./lib');
const config = lib.config;
const db = lib.db;
const morgan = require('morgan');
const swagger = require('swagger-node-restify');

var server = restify.createServer(config.server);
server.use(restify.queryParser());
server.use(restify.bodyParser());

restify.defaultResponseHeaders = function(data) {
    this.header('Access-Control-Allow-Origin', '*');
};

// Middleware to check for valid api key sent
// server.use(function(req, res, next) {
//   // Move forward if dealing with the swagger-ui or a valid key
//   if(req.url.indexOf('swagger-ui') != -1 || lib.helpers.validateKey(req.headers.hmacdata || '', req.params.api_key, lib)) {
//     next();
//   } else {
//     res.send(401, { error: true, msg: 'Invalid api key sent'});
//   }
// });

/**
 Validate each request, inspecting json web token
 */
server.use(function(req, res, next) {
    var results = lib.jwtValidator.validateRequest(req, res, next);
    if (results.valid) {
        next();
    } else {
        res.send();
    }
});

/**
 Validate each request, as long as there is a schema for it
 */
server.use(function(req, res, next) {
    var results = lib.schemaValidator.validateRequest(req);
    if (results.valid) {
        next();
    } else {
        res.send(400, results);
    }
});

if (isDevelopment) {
    const webpackConfig = require('./webpack.config');
    const webpack = require('webpack');
    const webpackMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');

    const compiler = webpack(webpackConfig);
    const middleware = webpackMiddleware(compiler, {
        publicPath: '/',
        stats: {
            colors: true,
            hash: false,
            timings: true,
            chunks: false,
            chunkModules: false,
            modules: false
        },
        noInfo: false,
        // display no info to console (only warnings and errors)

        quiet: false,
        // display nothing to the console

        lazy: false
        // switch into lazy mode
        // that means no watching, but recompilation on every request
    });

    // MongoDb
    process.env.MONGODB_URI || (process.env.MONGODB_URI = config.database.mongoUrl);

    server.use(middleware);
    server.use(webpackHotMiddleware(compiler));

    server.get(/^\/swagger-ui(\/.*)?/, restify.serveStatic({
        directory: path.join(__dirname, '/'),
        default: 'index.html'
    }));

    /*
     * api-docs exclusion enables swagger-ui (otherwise, .*)
     *
     * Comment out to enable swagger api calls.
     */
    server.get(/^(?!\/api(\/.*)?).*/, function response(req, res) {
        res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
        res.end();
    });

    swagger.addModels(lib.schemas);
    swagger.setAppHandler(server);
    lib.helpers.setupRoutes(server, swagger, lib);

    swagger.configureSwaggerPaths('', '/api-docs', ''); // remove the {format} part of the paths, to
    swagger.configure('http://localhost:' + config.server.port, '0.1');
    console.log('swagger-ui: ' + 'http://localhost:' + config.server.port + '/swagger-ui');
} else {
    server.get(/^(?!\/api(\/.*)?).*/, restify.serveStatic({
        'directory': path.join(__dirname, '/dist'),
        'default': 'index.html'
    }));

    lib.helpers.setupRoutes(server, null, lib);
}

db.connect(function(err) {
    if (err) {
        console.log('Error trying to connect to database: '.red, err.stack.red);
        console.log('\n!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
        console.log('If running heroku LOCAL, ensure the dev procfile is being used. (e.g. heroku local -f Procfile-dev)');
        console.log('\n!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
        process.exit(1);
    } else {
        console.log('Database service successfully started'.green);
    }
});

mongoose.connection.on('open', function() {
    server.use(morgan('dev'));

    var serverInstance = server.listen(config.server.port, function() {
        var port = serverInstance.address().port;
        console.log('App now running on port', port);
        console.log('process.env.NODE_ENV', process.env.NODE_ENV);
        console.log(process.env.NODE_ENV !== 'production' ? 'DEVELOPMENT' : 'PRODUCTION');
        console.log('process.env.MONGODB_URI', process.env.MONGODB_URI);
    });
});
