var mongoose = require('mongoose');
var helpers = require('../lib/helpers');

module.exports = function(db) {
    var schema = require('../schemas/clientservicetask.js');
    var modelDef = db.getModelFromSchema(schema);

    modelDef.schema.methods.toHAL = function() {
        var halObj = helpers.makeHAL(this.toJSON());
        return halObj;
    };

    return mongoose.model(modelDef.name, modelDef.schema);
};
