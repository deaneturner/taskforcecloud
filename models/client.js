var mongoose = require('mongoose');
var jsonSelect = require('mongoose-json-select');
var helpers = require('../lib/helpers');
var _ = require('underscore');

module.exports = function(db) {
    var schema = require('../schemas/client.js');
    var modelDef = db.getModelFromSchema(schema);

    modelDef.schema.plugin(jsonSelect, '-clientItems');
    modelDef.schema.methods.toHAL = function() {
        var halObj = helpers.makeHAL(this.toJSON(),
            [{
                name: 'clientItems',
                'href': '/client/' + this.id + '/clientItems',
                'title': 'Client Service Items'
            }]);

        if (this.clientItems.length > 0) {
            if (this.clientItems[0].toString().length != 24) {
                halObj.addEmbed('clientItems', _.map(this.clientItems, function(e) {
                    return e.toHAL();
                }));
            }
        }

        return halObj;
    };

    return mongoose.model(modelDef.name, modelDef.schema);
};
