module.exports = {
    'id': 'ClientItem',
    'properties': {
        '_clientId': {
            'type': 'string',
            'description': 'Id of owning client item'
        },
        'name': {
            'type': 'string',
            'description': 'Name of client item'
        },
        'address1': {
            'type': 'string',
            'description': 'Address1 of this client item'
        },
        'address2': {
            'type': 'string',
            'description': 'Address2 of this client item'
        },
        'city': {
            'type': 'string',
            'description': 'City location of this client item'
        },
        'state': {
            'type': 'string',
            'description': 'State location of this client item'
        },
        'services': {
            'type': 'array',
            'description': 'Services assigned to client item',
            'items': {
                '$ref': 'ClientService'
            }
        }
    }
};
