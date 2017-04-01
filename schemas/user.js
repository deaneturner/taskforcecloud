var constants = require('../lib/constants');

module.exports = {
    'id': 'User',
    'properties': {
        'username': {
            'type': 'string',
            'description': 'User\'s login name'
        },
        'password': {
            'type': 'string',
            'description': 'User\'s password'
        },
        'firstName': {
            'type': 'string',
            'description': 'User\'s first name'
        },
        'lastName': {
            'type': 'string',
            'description': 'User\'s last name'
        },
        'role': {
            'type': 'string',
            'description': 'User\'s authorization role',
            'default': constants.roles.default
        },
        'email': {
            'type': 'string',
            'description': 'User\'s email'
        },
        'phone': {
            'type': 'string',
            'description': 'User\'s phone'
        }
    }
};
