var lib = {
    helpers: require('./helpers'),
    config: require('./config'),
    controllers: require('../controllers'),
    schemas: require('../schemas'),
    schemaValidator: require('./schemaValidator'),
    db: require('./db'),
    validateRequest: require('./validateRequest')
};

module.exports = lib;

