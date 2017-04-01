var BaseController = require('./basecontroller');
var swagger = require('swagger-node-restify');
var jwt = require('jwt-simple');
var moment = require('moment');

function Login() {
}

Login.prototype = new BaseController();

module.exports = function(lib) {
    var controller = new Login();

    function createToken(user, isKeepLoggedIn) {
        var session = lib.config.session[JSON.parse(isKeepLoggedIn) ? 'keepLoggedIn' : 'default'];
        var expires = moment().add(session.duration, session.interval).unix();
        return jwt.encode({
            iss: user._id,
            exp: expires
        }, lib.config.secretKey);
    }

    controller.addAction({
        'path': '/login',
        'method': 'POST',
        'params': [swagger.bodyParam('user', 'The JSON representation of the login request', 'string')],
        'description': 'Finds the user and logs them in',
        'responsClass': 'User',
        'nickname': 'loginUser'
    }, function(req, res, next) {
        // if (!req.body.username || !req.body.password) {
        //     return res.status(400).send('You must send the username and the password');
        // }

        var userModel = lib.db.model('User');
        userModel.findOne({
            username: req.params.username
        }).exec(function(err, user) {
            if (err) return next(controller.RESTError('InternalServerError', err));

            if (!user) {
                // res.status(403).send({success: false, msg: 'Authentication failed, User not found'});
                controller.writeHAL(res, {success: false, field: 'username', msgKey: 'exists'});
            } else {
                user.comparePassword(req.params.password, function(err, isMatch) {
                    if (isMatch && !err) {
                        controller.writeHAL(res, {
                            success: true,
                            id_token: createToken(user, req.params.isKeepLoggedIn)
                        });
                    } else {
                        controller.writeHAL(res, {success: false, field: 'password', msgKey: 'match'});
                    }
                });
            }
        });
    });

    controller.addAction({
        'path': '/register',
        'method': 'POST',
        'params': [swagger.bodyParam('user', 'The JSON representation of the register request', 'string')],
        'description': 'Registers the user and then logs them in',
        'responsClass': 'User',
        'nickname': 'registerUser'
    }, function(req, res, next) {
        var userModel = lib.db.model('User');
        userModel.findOne({
            username: req.params.username
        }).exec(function(err, user) {
            if (err) return next(controller.RESTError('InternalServerError', err));

            if (!user) {
                // check password
                if (/^(?=.{8,32}$)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*/.test(req.params.password)) {
                    // valid
                    var newUserModel = lib.db.model('User')({
                        username: req.params.username,
                        password: req.params.password,
                        firstName: req.params.firstName,
                        lastName: req.params.lastName,
                        email: req.params.username,
                        isKeepLoggedIn: req.params.isKeepLoggedIn
                    });

                    newUserModel.save(function(err, newUser) {
                        if (err) return next(controller.RESTError('InternalServerError', err));

                        controller.writeHAL(res, {
                            success: true,
                            id_token: createToken(newUser, req.params.isKeepLoggedIn)
                        });
                    });
                } else {
                    // invalid password
                    controller.writeHAL(res, {success: false, field: 'password', msgKey: 'pattern'});
                }
            } else {
                // user exists
                controller.writeHAL(res, {success: false, field: 'username', msgKey: 'exists'});
            }
        });
    });

    return controller;
};

