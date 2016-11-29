var lib = {
    helpers: require('./helpers'),
    config: require('./config'),
    controllers: require('../controllers'),
    schemas: require('../schemas'),
    schemaValidator: require('./schemaValidator'),
    jwtValidator: require('./jwtValidator'),
    db: require('./db')
};

module.exports = lib;
