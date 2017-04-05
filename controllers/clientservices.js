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
        'summary': 'Returns the data of one client service',
        'responsClass': 'ClientService',
        'nickname': 'getClientServices'
    }, function(req, res, next) {
        var id = req.params.id;
        if (id != null) {
            lib.db.model('ClientService').findOne({_id: id}).exec(function(err, client) {
                if (err) return next(controller.RESTError('InternalServerError', err));
                if (!client) return next(controller.RESTError('ResourceNotFoundError', 'The client service id cannot be found'));
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
        lib.db.model('ClientService').find().sort('name').exec(function(err, clients) {
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
        var newClientService = JSON.parse(req.body);
        var newClientServiceModel = lib.db.model('ClientService')(newClientService);
        newClientServiceModel.save(function(err, clientService) {
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
            var model = lib.db.model('ClientService');
            model.findOne({_id: id})
                .exec(function(err, clientService) {
                    if (err) return next(controller.RESTError('InternalServerError', err));
                    clientService = _.extend(clientService, JSON.parse(req.body));
                    clientService.save(function(err, newClientService) {
                        if (err) return next(controller.RESTError('InternalServerError', err));
                        controller.writeHAL(res, {success: true, data: newClientService});
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
        var id = req.params.id;
        lib.db.model('ClientService').findOne({_id: id}).exec(function(err, clientservice) {
            if (err) return next(controller.RESTError('InternalServerError', err));
            clientservice.remove();
            // delete associated client service tasks
            lib.db.model('ClientServiceTask').find({_clientServiceId: id}).exec(function(err, clientservicetasks) {
                if (err) return next(controller.RESTError('InternalServerError', err));
                clientservicetasks.forEach(function(clientservicetask) {
                    clientservicetask.remove();
                });
            });
            controller.writeHAL(res, clientservice);
        });
    });

    controller.addAction({
        'path': '/api/clientservices/:id/clientservicetasks',
        'method': 'GET',
        'summary': 'Returns the list of client service tasks, by client service id, ordered by name',
        'responsClass': 'ClientServiceTask',
        'nickname': 'getClientServiceTaskByClientServiceId'
    }, function(req, res, next) {
        var id = req.params.id;
        lib.db.model('ClientServiceTask').find({_clientServiceId: id}).sort('name').exec(function(err, clientservicetasks) {
            if (err) return next(controller.RESTError('InternalServerError', err));
            controller.writeHAL(res, clientservicetasks);
        });
    });

    return controller;
};

