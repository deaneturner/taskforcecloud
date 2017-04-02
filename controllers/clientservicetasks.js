var BaseController = require('./basecontroller');
var _ = require('underscore');
var swagger = require('swagger-node-restify');

function ClientServiceTasks() {
}

ClientServiceTasks.prototype = new BaseController();

module.exports = function(lib) {
    var controller = new ClientServiceTasks();

    controller.addAction({
        'path': '/api/clientservicetasks/:id',
        'method': 'GET',
        'summary': 'Returns the data of one client service task',
        'responsClass': 'ClientServiceTask',
        'nickname': 'getClientServiceTasks'
    }, function(req, res, next) {
        var id = req.params.id;
        if (id != null) {
            lib.db.model('ClientServiceTask').findOne({_id: id}).exec(function(err, client) {
                if (err) return next(controller.RESTError('InternalServerError', err));
                if (!client) return next(controller.RESTError('ResourceNotFoundError', 'The client service task id cannot be found'));
                controller.writeHAL(res, client);
            });
        } else {
            next(controller.RESTError('InvalidArgumentError', 'Invalid client id'));
        }
    });

    controller.addAction({
        'path': '/api/clientservicetasks',
        'method': 'GET',
        'summary': 'Returns the list of client service items ordered by name',
        'responsClass': 'ClientServiceTask',
        'nickname': 'getClientServiceTasks'
    }, function(req, res, next) {
        lib.db.model('ClientServiceTask').find().sort('name').exec(function(err, clients) {
            if (err) return next(controller.RESTError('InternalServerError', err));
            controller.writeHAL(res, clients);
        });
    });

    controller.addAction({
        'path': '/api/clientservicetasks',
        'method': 'POST',
        'params': [swagger.bodyParam('clientServiceTask', 'The JSON representation of the client service task', 'string')],
        'summary': 'Adds a new client service task to the database',
        'responsClass': 'ClientServiceTask',
        'nickname': 'addClientServiceTask'
    }, function(req, res, next) {
        var newClientServiceTask = JSON.parse(req.body);
        var newClientServiceTaskModel = lib.db.model('ClientServiceTask')(newClientServiceTask);
        newClientServiceTaskModel.save(function(err, clientServiceTask) {
            if (err) return next(controller.RESTError('InternalServerError', err));
            controller.writeHAL(res, {success: true, data: clientServiceTask});
        });
    });

    controller.addAction({
        'path': '/api/clientservicetasks/:id',
        'method': 'PUT',
        // 'params': [swagger.pathParam('id', 'The id of the client service', 'string'), swagger.bodyParam('clientService', 'The content to overwrite', 'string')],
        'summary': 'Updates the data of one client service task',
        'responsClass': 'ClientServiceTask',
        'nickname': 'updateClientServiceTask'
    }, function(req, res, next) {
        var id = req.params.id;
        if (!id) {
            return next(controller.RESTError('InvalidArgumentError', 'Invalid id'));
        } else {
            var model = lib.db.model('ClientServiceTask');
            model.findOne({_id: id})
                .exec(function(err, clientServiceTask) {
                    if (err) return next(controller.RESTError('InternalServerError', err));
                    clientServiceTask = _.extend(clientServiceTask, JSON.parse(req.body));
                    clientServiceTask.save(function(err, newClientServiceTask) {
                        if (err) return next(controller.RESTError('InternalServerError', err));
                        controller.writeHAL(res, {success: true, data: newClientServiceTask});
                    });
                });
        }
    });

    controller.addAction({
        'path': '/api/clientservicetasks/:id',
        'method': 'DEL',
        'params': [swagger.bodyParam('id', 'The id of the client service task to delete', 'string')],
        'summary': 'Deletes a client service task from the database',
        'responsClass': 'ClientServiceTask',
        'nickname': 'deleteClientServiceTask'
    }, function(req, res, next) {
        lib.db.model('ClientServiceTask').findOne({_id: req.params.id}).exec(function(err, clientServiceTask) {
            if (err) return next(controller.RESTError('InternalServerError', err));
            clientServiceTask.remove();
            controller.writeHAL(res, clientServiceTask);
        });
    });

    return controller;
};

