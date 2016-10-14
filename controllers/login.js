var BaseController = require("./basecontroller");
var _ = require("underscore");
var swagger = require("swagger-node-restify");

function Login() {
}

Login.prototype = new BaseController();

module.exports = function (lib) {
    var controller = new Login();

    controller.addAction({
        'path': '/login',
        'method': 'GET',
        'params': [swagger.bodyParam('user', 'The JSON representation of the login request', 'string')],
        'description': 'Finds the user and logs them in',
        'responsClass': 'User',
        'nickname': 'loginUser'
    }, function (req, res, next) {
        var userModel = lib.db.model('User');
        userModel.find().exec(function (err, user) {
            if (err) return next(controller.RESTError('InternalServerError', err));


            controller.writeHAL(res, user);
        });
    });

    return controller;
};

