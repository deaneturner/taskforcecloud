var BaseController = require('./basecontroller');
var _ = require('underscore');
var swagger = require('swagger-node-restify');

function Clients() {
}

Clients.prototype = new BaseController();

module.exports = function(lib) {
    var controller = new Clients();

    controller.addAction({
        'path': '/api/clients/:id',
        'method': 'GET',
        'summary': 'Returns the data of one client',
        'responsClass': 'Client',
        'nickname': 'getClient'
    }, function(req, res, next) {
        var id = req.params.id;
        if (id != null) {
            lib.db.model('Client').findOne({_id: id}).exec(function(err, client) {
                if (err) return next(controller.RESTError('InternalServerError', err));
                if (!client) return next(controller.RESTError('ResourceNotFoundError', 'The client id cannot be found'));
                controller.writeHAL(res, client);
            });
        } else {
            next(controller.RESTError('InvalidArgumentError', 'Invalid client id'));
        }
    });

    controller.addAction({
        'path': '/api/clients',
        'method': 'GET',
        'summary': 'Returns the list of clients ordered by name',
        'responsClass': 'Client',
        'nickname': 'getClients'
    }, function(req, res, next) {
        lib.db.model('Client').find().sort('name').exec(function(err, clients) {
            if (err) return next(controller.RESTError('InternalServerError', err));
            controller.writeHAL(res, clients);
        });
    });

    controller.addAction({
        'path': '/api/clients',
        'method': 'POST',
        'params': [swagger.bodyParam('client', 'The JSON representation of the client', 'string')],
        'summary': 'Adds a new client to the database',
        'responsClass': 'Client',
        'nickname': 'addClient'
    }, function(req, res, next) {
        var newClient = JSON.parse(req.body);
        var newClientModel = lib.db.model('Client')(newClient);
        newClientModel.save(function(err, client) {
            if (err) return next(controller.RESTError('InternalServerError', err));
            controller.writeHAL(res, {success: true, data: client});
        });
    });

    controller.addAction({
        'path': '/api/clients/:id',
        'method': 'PUT',
        'summary': 'Updates the data of one client',
        'responsClass': 'Client',
        'nickname': 'updateClient'
    }, function(req, res, next) {
        var id = req.params.id;
        if (!id) {
            return next(controller.RESTError('InvalidArgumentError', 'Invalid id'));
        } else {
            var model = lib.db.model('Client');
            model.findOne({_id: id})
                .exec(function(err, client) {
                    if (err) return next(controller.RESTError('InternalServerError', err));
                    client = _.extend(client, JSON.parse(req.body));
                    client.save(function(err, newClient) {
                        if (err) return next(controller.RESTError('InternalServerError', err));
                        controller.writeHAL(res, {success: true, data: newClient});
                    });
                });
        }
    });

    controller.addAction({
        'path': '/api/clients/:id',
        'method': 'DEL',
        'params': [swagger.bodyParam('id', 'The id of the client to delete', 'string')],
        'summary': 'Deletes a client from the database',
        'responsClass': 'Client',
        'nickname': 'deleteClient'
    }, function(req, res, next) {
        var id = req.params.id;
        lib.db.model('Client').findOne({_id: id}).exec(function(err, client) {
            if (err) return next(controller.RESTError('InternalServerError', err));
            client.remove();
            // delete associated client items
            lib.db.model('ClientItem').find({_clientId: id}).exec(function(err, clientitems) {
                if (err) return next(controller.RESTError('InternalServerError', err));
                clientitems.forEach(function(clientitem) {
                    clientitem.remove();
                });
            });
            controller.writeHAL(res, client);
        });
    });

    controller.addAction({
        'path': '/api/clients/:id/clientitems',
        'method': 'GET',
        'summary': 'Returns the list of client items, by client id, ordered by name',
        'responsClass': 'ClientItem',
        'nickname': 'getClientItemsByClientId'
    }, function(req, res, next) {
        var id = req.params.id;
        lib.db.model('ClientItem').find({_clientId: id}).sort('name').exec(function(err, clientitems) {
            if (err) return next(controller.RESTError('InternalServerError', err));
            controller.writeHAL(res, clientitems);
        });
    });

    return controller;
};

