const path = require('path');
const restify = require('restify');
const webpack = require('webpack');
//const webpackMiddleware = require('webpack-dev-middleware');
//const webpackHotMiddleware = require('webpack-hot-middleware');
const isDevelopment = process.env.NODE_ENV !== 'production';
const webpackConfig = isDevelopment ? require('./config/webpack.dev.js') : require('./config/webpack.prod.js');
const mongoose = require('mongoose');
const lib = require("./lib");
const config = lib.config;
const db = lib.db;
const morgan = require('morgan');
const colors = require("colors");
const swagger = require("swagger-node-restify");

var server = restify.createServer(config.server);
server.use(restify.queryParser());
server.use(restify.bodyParser());

restify.defaultResponseHeaders = function (data) {
    this.header('Access-Control-Allow-Origin', '*');
};

///Middleware to check for valid api key sent
// server.use(function(req, res, next) {
//   // Move forward if dealing with the swagger-ui or a valid key
//   if(req.url.indexOf("swagger-ui") != -1 || lib.helpers.validateKey(req.headers.hmacdata || '', req.params.api_key, lib)) {
//     next();
//   } else {
//     res.send(401, { error: true, msg: 'Invalid api key sent'});
//   }
// });

/**
 Validate each request, as long as there is a schema for it
 */
server.use(function(req, res, next) {
    var results = lib.schemaValidator.validateRequest(req);
    if(results.valid) {
        next();
    } else {
        res.send(400, results);
    }
});

if (isDevelopment) {
    //const compiler = webpack(webpackConfig);
    // const middleware = webpackMiddleware(compiler, {
    //     publicPath: webpackConfig.output.publicPath,
    //     contentBase: 'public',
    //     stats: {
    //         colors: true,
    //         hash: false,
    //         timings: true,
    //         chunks: false,
    //         chunkModules: false,
    //         modules: false
    //     }
    // });

    // MongoDb
    process.env.MONGODB_URI || (process.env.MONGODB_URI = config.database.mongoUrl);

    //server.use(middleware);
    //server.use(webpackHotMiddleware(compiler));

    server.get(/^\/swagger-ui(\/.*)?/, restify.serveStatic({
        directory: __dirname + '/',
        default: 'index.html'
    }));

    /*
     * TO ENABLE SWAGGER UI
     * Comment out this root get and restart server, to enable swagger ui.
     * Otherwise, path interferes with swagger-ui loading.
     */
    server.get(/.*/, function response(req, res) {
        res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
        res.end();
    });

    swagger.addModels(lib.schemas);
    swagger.setAppHandler(server);
    lib.helpers.setupRoutes(server, swagger, lib);

    swagger.configureSwaggerPaths("", "/api-docs", ""); // remove the {format} part of the paths, to
    swagger.configure('http://localhost:' + config.server.port, '0.1');
    console.log('Swagger: ' + 'http://localhost:' + config.server.port + '/swagger-ui');

} else {
    server.get(/.*/, restify.serveStatic({
        'directory': __dirname + '/dist',
        'default': 'index.html'
    }));
}

db.connect(function(err) {
    if(err) {
        console.log("Error trying to connect to database: ".red, err.stack.red);
        process.exit(1);
    }
    else {
        console.log("Database service successfully started".green);
    }
});

mongoose.connection.on('open', function () {
    server.use(morgan('dev'));

    var serverInstance = server.listen(config.server.port, function () {
        var port = serverInstance.address().port;
        console.log("App now running on port", port);
        console.log("process.env.NODE_ENV", process.env.NODE_ENV);
        console.log(process.env.NODE_ENV !== 'production' ? "DEVELOPMENT" : "PRODUCTION");
        console.log("process.env.MONGODB_URI", process.env.MONGODB_URI);
    });
});
