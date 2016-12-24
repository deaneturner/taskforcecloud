var BaseController = require('./basecontroller');
var swagger = require('swagger-node-restify');
var jwt = require('jwt-simple');

function Users() {
}

Users.prototype = new BaseController();

module.exports = function(lib) {
    var controller = new Users();

    controller.addAction({
        'path': '/api/users/:id',
        'method': 'GET',
        'summary': 'Retrieves a user',
        'responsClass': 'User',
        'nickname': 'getUser'
    }, function(req, res, next) {
        lib.db.model('User').findOne({_id: req.params.id}).exec(function(err, user) {
            if (err) return next(controller.RESTError('InternalServerError', err));
            controller.writeHAL(res, user);
        });
    });

    controller.addAction({
        'path': '/api/users',
        'method': 'GET',
        'summary': 'Retrieves a list users',
        'responsClass': 'User',
        'nickname': 'getUsers'
    }, function(req, res, next) {
        lib.db.model('User').find().sort('username').exec(function(err, users) {
            if (err) return next(controller.RESTError('InternalServerError', err));
            controller.writeHAL(res, users);
        });
    });

    controller.addAction({
        'path': '/api/users',
        'method': 'POST',
        'params': [swagger.bodyParam('user', 'The JSON representation of the user', 'string')],
        'summary': 'Adds a new user to the database',
        'responsClass': 'User',
        'nickname': 'addUser'
    }, function(req, res, next) {
        var newUser = req.body;

        var newUserModel = lib.db.model('User')(newUser);
        newUserModel.save(function(err, user) {
            if (err) return next(controller.RESTError('InternalServerError', err));
            controller.writeHAL(res, user);
        });
    });

    controller.addAction({
        'path': '/api/users/:id',
        'method': 'PUT',
        'params': [swagger.bodyParam('user', 'The JSON representation of the user', 'string')],
        'summary': 'Updates a user in the database',
        'responsClass': 'User',
        'nickname': 'updateUser'
    }, function(req, res, next) {
        var id = req.params.id;
        if (!id) {
            return next(controller.RESTError('InvalidArgumentError', 'Invalid id'));
        } else {
            var model = lib.db.model('User');
            model.findByIdAndUpdate(req.params.id,
                {$set: JSON.parse(req.body)},
                {new: true},
                function(err, updatedUser) {
                    if (err) return next(controller.RESTError('InternalServerError', err));
                    controller.writeHAL(res, {success: true, data: updatedUser});
                });
        }
    });

    controller.addAction({
        'path': '/api/users/:id',
        'method': 'DEL',
        'params': [swagger.bodyParam('id', 'The id of the user to delete', 'string')],
        'summary': 'Deletes a user from the database',
        'responsClass': 'User',
        'nickname': 'deleteUser'
    }, function(req, res, next) {
        lib.db.model('User').findOne({_id: req.params.id}).exec(function(err, user) {
            if (err) return next(controller.RESTError('InternalServerError', err));
            user.remove();
            controller.writeHAL(res, user);
        });
    });

    controller.addAction({
        'path': '/api/users/token/:token',
        'method': 'GET',
        'description': 'Returns a user using a given token',
        'responsClass': 'string',
        'nickname': 'getUserFromToken'
    }, function(req, res, next) {
        lib.db.model('User').findOne({_id: jwt.decode(req.params.token, lib.config.secretKey).iss}).exec(function(err, user) {
            var userJSON;
            if (err) return next(controller.RESTError('InternalServerError', err));
            userJSON = user.toObject();
            delete userJSON.password;
            controller.writeHAL(res, userJSON);
        });
    });

    return controller;
};

