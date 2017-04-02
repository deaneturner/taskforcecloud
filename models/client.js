var mongoose = require('mongoose');
var jsonSelect = require('mongoose-json-select');
var helpers = require('../lib/helpers');
var _ = require("underscore");

module.exports = function(db) {
    var schema = require('../schemas/client.js');
    var modelDef = db.getModelFromSchema(schema);

    modelDef.schema.plugin(jsonSelect, '-clientServiceItems');
    modelDef.schema.methods.toHAL = function() {
        var halObj = helpers.makeHAL(this.toJSON(),
            [{
                name: 'clientServiceItems',
                'href': '/client/' + this.id + '/clientServiceItems',
                'title': 'Client Service Items'
            }]);

        if (this.clientServiceItems.length > 0) {
            if (this.clientServiceItems[0].toString().length != 24) {
                halObj.addEmbed('clientServiceItems', _.map(this.clientServiceItems, function(e) {
                    return e.toHAL();
                }));
            }
        }

        return halObj;
    };

    return mongoose.model(modelDef.name, modelDef.schema);
};
