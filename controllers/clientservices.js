var BaseController = require('./basecontroller');
var _ = require('underscore');
var swagger = require('swagger-node-restify');

function ClientServices() {
}

ClientServices.prototype = new BaseController();

module.exports = function(lib) {
    var controller = new ClientServices();

    controller.addAction({
        'path': '/api/clientservices/:id',
        'method': 'GET',
        'summary': 'Returns the data of one client',
        'responsClass': 'ClientService',
        'nickname': 'getClientServices'
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
        'path': '/api/clientservices',
        'method': 'GET',
        'summary': 'Returns the list of client services ordered by name',
        'responsClass': 'ClientService',
        'nickname': 'getClientServices'
    }, function(req, res, next) {
        lib.db.model('Client').find().sort('name').exec(function(err, clients) {
            if (err) return next(controller.RESTError('InternalServerError', err));
            controller.writeHAL(res, clients);
        });
    });

    controller.addAction({
        'path': '/api/clientservices',
        'method': 'POST',
        'params': [swagger.bodyParam('clientService', 'The JSON representation of the client service', 'string')],
        'summary': 'Adds a new client service to the database',
        'responsClass': 'ClientService',
        'nickname': 'addClientService'
    }, function(req, res, next) {
        var newClient = JSON.parse(req.body);
        var newClientModel = lib.db.model('Client')(newClient);
        newClientModel.save(function(err, clientService) {
            if (err) return next(controller.RESTError('InternalServerError', err));
            controller.writeHAL(res, {success: true, data: clientService});
        });
    });

    controller.addAction({
        'path': '/api/clientservices/:id',
        'method': 'PUT',
        // 'params': [swagger.pathParam('id', 'The id of the client service', 'string'), swagger.bodyParam('clientService', 'The content to overwrite', 'string')],
        'summary': 'Updates the data of one client service',
        'responsClass': 'ClientService',
        'nickname': 'updateClientService'
    }, function(req, res, next) {
        var id = req.params.id;
        if (!id) {
            return next(controller.RESTError('InvalidArgumentError', 'Invalid id'));
        } else {
            var model = lib.db.model('Client');
            model.findOne({_id: id})
                .exec(function(err, clientService) {
                    if (err) return next(controller.RESTError('InternalServerError', err));
                    clientService = _.extend(clientService, JSON.parse(req.body));
                    clientService.save(function(err, newClient) {
                        if (err) return next(controller.RESTError('InternalServerError', err));
                        controller.writeHAL(res, {success: true, data: newClient});
                    });
                });
        }
    });

    controller.addAction({
        'path': '/api/clientservices/:id',
        'method': 'DEL',
        'params': [swagger.bodyParam('id', 'The id of the client service to delete', 'string')],
        'summary': 'Deletes a client service from the database',
        'responsClass': 'ClientService',
        'nickname': 'deleteClientService'
    }, function(req, res, next) {
        lib.db.model('Client').findOne({_id: req.params.id}).exec(function(err, clientService) {
            if (err) return next(controller.RESTError('InternalServerError', err));
            clientService.remove();
            controller.writeHAL(res, clientService);
        });
    });

    return controller;
};

