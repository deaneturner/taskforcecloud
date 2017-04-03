var _ = require('underscore');
var mongoose = require('mongoose');

// Schema = mongoose.Schema;
var Schema = mongoose.Schema;

var obj = {
    cachedModels: {},
    getModelFromSchema: getModelFromSchema,
    model: function(mname) {
        return this.models[mname];
    },
    connect: function(cb) {
        mongoose.connect(process.env.MONGODB_URI, {safe: true});
        this.connection = mongoose.connection;
        this.connection.on('error', cb);
        this.connection.on('open', cb);
    }
};

obj.models = require('../models/')(obj);

module.exports = obj;

function translateComplexType(v, strType) {
    var tmp = null;
    var type = strType || v['type'];
    switch (type) {
        case 'array':
            tmp = [];
            if (v['items']['$ref'] != null) {
                tmp.push({
                    type: Schema.Types.ObjectId,
                    ref: v['items']['$ref']
                });
            } else {
                var originalType = v['items']['type'];
                v['items']['type'] = translateTypeToJs(v['items']['type']);
                tmp.push(translateComplexType(v['items'], originalType));
            }
            break;
        case 'object':
            tmp = {};
            var props = v['properties'];
            _.each(props, function(data, k) {
                if (data['$ref'] != null) {
                    tmp[k] = {
                        type: Schema.Types.ObjectId,
                        ref: data['$ref']
                    };
                } else {
                    tmp[k] = translateTypeToJs(data['type']);
                }
            });
            break;
        default:
            tmp = v;
            tmp['type'] = translateTypeToJs(type);
            break;
    }
    return tmp;
}

/**
 Turns the JSON Schema into a Mongoose schema
 */
function getModelFromSchema(schema) {
    var data = {
        name: schema.id,
        schema: {}
    };

    var newSchema = {};
    var tmp = null;
    _.each(schema.properties, function(v, propName) {
        if (v['$ref'] != null) {
            tmp = {
                type: Schema.Types.ObjectId,
                ref: v['$ref']
            };
        } else {
            tmp = translateComplexType(v);
        }
        newSchema[propName] = tmp;
    });
    data.schema = new Schema(newSchema, {timestamps: true});
    return data;
}

function translateTypeToJs(t) {
    if (t.indexOf('int') === 0) {
        t = 'number';
    }
    return eval(t.charAt(0).toUpperCase() + t.substr(1));
}
