var mongoose = require('mongoose');
var jsonSelect = require('mongoose-json-select');
var helpers = require('../lib/helpers');
var _ = require("underscore");

module.exports = function(db) {
    var schema = require('../schemas/client.js');
    var modelDef = db.getModelFromSchema(schema);

    modelDef.schema.plugin(jsonSelect, '-clientServiceTasks');
    modelDef.schema.methods.toHAL = function() {
        var halObj = helpers.makeHAL(this.toJSON(),
            [{
                name: 'clientServiceTasks',
                'href': '/client/' + this.id + '/clientServiceTasks',
                'title': 'Client Service Items'
            }]);

        if (this.clientServiceTasks.length > 0) {
            if (this.clientServiceTasks[0].toString().length != 24) {
                halObj.addEmbed('clientServiceTasks', _.map(this.clientServiceTasks, function(e) {
                    return e.toHAL();
                }));
            }
        }

        return halObj;
    };

    return mongoose.model(modelDef.name, modelDef.schema);
};
