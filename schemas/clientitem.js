module.exports = {
    'id': 'ClientItem',
    'properties': {
        '_clientId': {
            'type': 'string',
            'description': 'Id of owning client'
        },
        'name': {
            'type': 'string',
            'description': 'Name of client item'
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
