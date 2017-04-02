module.exports = {
    'id': 'Client',
    'properties': {
        'company': {
            'type': 'string',
            'description': 'Company name of the client'
        },
        'firstName': {
            'type': 'string',
            'description': 'First name of the client'
        },
        'lastName': {
            'type': 'string',
            'description': 'lastName name of the client'
        },
        'address1': {
            'type': 'string',
            'description': 'Address1 of this client'
        },
        'address2': {
            'type': 'string',
            'description': 'Address2 of this client'
        },
        'phone': {
            'type': 'string',
            'description': 'Phone of the client'
        },
        'email': {
            'type': 'string',
            'description': 'Email of the client'
        },
        'clientServiceTasks': {
            'type': 'array',
            'description': 'List of items being serviced',
            'items': {
                '$ref': 'ClientServiceTask'
            }
        }
    }
};
