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
        'summary': 'Retrieves a list users',
        'responsClass': 'User',
        'nickname': 'getUsers'
    }, function (req, res, next) {
        lib.db.model('User').find().sort('username').exec(function (err, users) {
            if (err) return next(controller.RESTError('InternalServerError', err));
            controller.writeHAL(res, users);
        });
    });

    return controller;
};

