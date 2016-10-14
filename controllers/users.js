var BaseController = require("./basecontroller");
var _ = require("underscore");
var swagger = require("swagger-node-restify");

function Users() {
}

Users.prototype = new BaseController();

module.exports = function (lib) {
    var controller = new Users();

    controller.addAction({
        'path': '/users',
        'method': 'GET',
        'params': [swagger.bodyParam('user', 'The JSON representation of the user', 'string')],
        'summary': 'Retrieves a user',
        'responsClass': 'User',
        'nickname': 'getUser'
    }, function (req, res, next) {
        var userModel = lib.db.model('User');
        userModel.find().exec(function (err, user) {
            if (err) return next(controller.RESTError('InternalServerError', err));


            controller.writeHAL(res, user);
        });
    });

    return controller;
};

