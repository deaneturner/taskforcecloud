var mongoose = require("mongoose");
var jsonSelect = require('mongoose-json-select');
var helpers = require("../lib/helpers");
var _ = require("underscore");

module.exports = function (db) {
    var schema = require("../schemas/login.js");
    var modelDef = db.getModelFromSchema(schema);

    modelDef.schema.methods.toHAL = function () {
        return helpers.makeHAL(this.toJSON());
    };

    return mongoose.model(modelDef.name, modelDef.schema);
};

