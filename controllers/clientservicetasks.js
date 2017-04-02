var BaseController = require('./basecontroller');
var _ = require('underscore');
var swagger = require('swagger-node-restify');

function ClientServiceItems() {
}

ClientServiceItems.prototype = new BaseController();

module.exports = function(lib) {
    var controller = new ClientServiceItems();

    controller.addAction({
        'path': '/api/clientservicetasks/:id',
        'method': 'GET',
        'summary': 'Returns the data of one client service item',
        'responsClass': 'ClientServiceItem',
        'nickname': 'getClientServiceItems'
    }, function(req, res, next) {
        var id = req.params.id;
        if (id != null) {
            lib.db.model('ClientServiceItem').findOne({_id: id}).exec(function(err, client) {
                if (err) return next(controller.RESTError('InternalServerError', err));
                if (!client) return next(controller.RESTError('ResourceNotFoundError', 'The client service item id cannot be found'));
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
        'responsClass': 'ClientServiceItem',
        'nickname': 'getClientServiceItems'
    }, function(req, res, next) {
        lib.db.model('ClientServiceItem').find().sort('name').exec(function(err, clients) {
            if (err) return next(controller.RESTError('InternalServerError', err));
            controller.writeHAL(res, clients);
        });
    });

    controller.addAction({
        'path': '/api/clientservicetasks',
        'method': 'POST',
        'params': [swagger.bodyParam('clientServiceItem', 'The JSON representation of the client service item', 'string')],
        'summary': 'Adds a new client service item to the database',
        'responsClass': 'ClientServiceItem',
        'nickname': 'addClientServiceItem'
    }, function(req, res, next) {
        var newClientServiceItem = JSON.parse(req.body);
        var newClientServiceItemModel = lib.db.model('ClientServiceItem')(newClientServiceItem);
        newClientServiceItemModel.save(function(err, clientServiceItem) {
            if (err) return next(controller.RESTError('InternalServerError', err));
            controller.writeHAL(res, {success: true, data: clientServiceItem});
        });
    });

    controller.addAction({
        'path': '/api/clientservicetasks/:id',
        'method': 'PUT',
        // 'params': [swagger.pathParam('id', 'The id of the client service', 'string'), swagger.bodyParam('clientService', 'The content to overwrite', 'string')],
        'summary': 'Updates the data of one client service item',
        'responsClass': 'ClientServiceItem',
        'nickname': 'updateClientServiceItem'
    }, function(req, res, next) {
        var id = req.params.id;
        if (!id) {
            return next(controller.RESTError('InvalidArgumentError', 'Invalid id'));
        } else {
            var model = lib.db.model('ClientServiceItem');
            model.findOne({_id: id})
                .exec(function(err, clientServiceItem) {
                    if (err) return next(controller.RESTError('InternalServerError', err));
                    clientServiceItem = _.extend(clientServiceItem, JSON.parse(req.body));
                    clientServiceItem.save(function(err, newClientServiceItem) {
                        if (err) return next(controller.RESTError('InternalServerError', err));
                        controller.writeHAL(res, {success: true, data: newClientServiceItem});
                    });
                });
        }
    });

    controller.addAction({
        'path': '/api/clientservicetasks/:id',
        'method': 'DEL',
        'params': [swagger.bodyParam('id', 'The id of the client service item to delete', 'string')],
        'summary': 'Deletes a client service item from the database',
        'responsClass': 'ClientServiceItem',
        'nickname': 'deleteClientServiceItem'
    }, function(req, res, next) {
        lib.db.model('ClientServiceItem').findOne({_id: req.params.id}).exec(function(err, clientServiceItem) {
            if (err) return next(controller.RESTError('InternalServerError', err));
            clientServiceItem.remove();
            controller.writeHAL(res, clientServiceItem);
        });
    });

    return controller;
};

