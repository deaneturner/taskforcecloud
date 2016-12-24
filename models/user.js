var mongoose = require('mongoose');
var helpers = require('../lib/helpers');
var bcrypt = require('bcrypt');

module.exports = function(db) {
    var schema = require('../schemas/user.js');
    var modelDef = db.getModelFromSchema(schema);

    modelDef.schema.pre('save', function(next) {
        var user = this;
        if (this.isModified('password') || this.isNew) {
            bcrypt.genSalt(10, function(err, salt) {
                if (err) {
                    return next(err);
                }
                bcrypt.hash(user.password, salt, function(err, hash) {
                    if (err) {
                        return next(err);
                    }
                    user.password = hash;
                    next();
                });
            });
        } else {
            return next();
        }
    });

    modelDef.schema.methods.toHAL = function() {
        return helpers.makeHAL(this.toJSON());
    };

    modelDef.schema.methods.comparePassword = function(passw, cb) {
        bcrypt.compare(passw, this.password, function(err, isMatch) {
            if (err) {
                return cb(err);
            }
            cb(null, isMatch);
        });
    };

    return mongoose.model(modelDef.name, modelDef.schema);
};

