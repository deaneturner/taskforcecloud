const jwt = require('jwt-simple');
const db = require('./db');
const config = require('./config');
var moment = require('moment');
var constants = require('../lib/constants');

module.exports = {
    validateRequest: validate
};

function validate(req, res, next) {
    if (req.url.startsWith('/api')) {
        var token = (req.headers['jwt']);

        if (token) {
            try {
                var decoded = jwt.decode(token, config.secretKey);

                if (decoded.exp <= moment().unix()) {
                    res.status(400);
                    res.json({
                        'status': 400,
                        'message': 'Token Expired'
                    });
                    res.send();
                }

                // Authorize can access resource
                db.model('User').findOne({_id: decoded.iss}).exec(function(err, user) {
                    if (err) {
                        res.status(401);
                        res.json({
                            'status': 401,
                            'message': 'Invalid User'
                        });
                        res.send();
                    }
                    if (user) {
                        if (constants.roles.asList().indexOf(user.role) != -1) {
                            // user has been assigned a role - level 0..n
                            next();
                        } else if (user.role === constants.roles.default) {
                            res.status(403);
                            res.json({
                                'status': 403,
                                'message': 'Please contact your administrator to acquire access rights and a role.'
                            });
                            res.send();
                        } else {
                            res.status(403);
                            res.json({
                                'status': 403,
                                'message': 'Not Authorized'
                            });
                            res.send();
                        }
                    } else {
                        // No user with this name exists, respond back with a 401
                        res.status(401);
                        res.json({
                            'status': 401,
                            'message': 'Invalid User'
                        });
                        res.send();
                    }
                });
            } catch (err) {
                res.status(500);
                res.json({
                    'status': 500,
                    'message': 'Oops something went wrong',
                    'error': err
                });
                res.send();
            }
        } else {
            res.status(401);
            res.json({
                'status': 401,
                'message': 'Invalid Token or Key'
            });
            res.send();
        }
    } else {
        next();
    }
}
