var BaseController = require("./basecontroller");
var _ = require("underscore");
var swagger = require("swagger-node-restify");
var jwt = require('jwt-simple');
var moment = require('moment');
var lib = require("../lib");
var User = require('../models/user');

function Login() {
}

Login.prototype = new BaseController();

module.exports = function (lib) {
    var controller = new Login();

    controller.addAction({
        'path': '/login',
        'method': 'POST',
        'params': [swagger.bodyParam('user', 'The JSON representation of the login request', 'string')],
        'description': 'Finds the user and logs them in',
        'responsClass': 'User',
        'nickname': 'loginUser'
    }, function (req, res, next) {
        function createToken(user) {
            var expires = moment().add(10, 's').unix();
            return jwt.encode({
                iss: user.username,
                exp: expires
            }, lib.config.secretKey);
        }

        // if (!req.body.username || !req.body.password) {
        //     return res.status(400).send("You must send the username and the password");
        // }


        var userModel = lib.db.model('User');
        userModel.find().exec(function (err, user) {
            if (err) return next(controller.RESTError('InternalServerError', err));

            controller.writeHAL(res, {
                id_token: createToken(userModel({username: 'test', password: 'XXX'}))
            });
        });
    });

    controller.addAction({
        'path': '/register',
        'method': 'POST',
        'params': [swagger.bodyParam('user', 'The JSON representation of the register request', 'string')],
        'description': 'Registers the user and logs them in',
        'responsClass': 'User',
        'nickname': 'registerUser'
    }, function (req, res, next) {
        var userModel = lib.db.model('User');
        userModel.find().exec(function (err, user) {
            if (err) return next(controller.RESTError('InternalServerError', err));


            controller.writeHAL(res, user);
        });
    });

    return controller;
};

