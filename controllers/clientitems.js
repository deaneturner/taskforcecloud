var BaseController = require('./basecontroller');
var _ = require('underscore');
var swagger = require('swagger-node-restify');

function ClientItems() {
}

ClientItems.prototype = new BaseController();

module.exports = function(lib) {
    var controller = new ClientItems();

    controller.addAction({
        'path': '/api/clientitems/:id',
        'method': 'GET',
        'summary': 'Returns the data of one client item',
        'responsClass': 'ClientItem',
        'nickname': 'getClientItem'
    }, function(req, res, next) {
        var id = req.params.id;
        if (id != null) {
            lib.db.model('ClientItem').findOne({_id: id}).exec(function(err, clientitem) {
                if (err) return next(controller.RESTError('InternalServerError', err));
                if (!clientitem) return next(controller.RESTError('ResourceNotFoundError', 'The client item id cannot be found'));
                controller.writeHAL(res, clientitem);
            });
        } else {
            next(controller.RESTError('InvalidArgumentError', 'Invalid client item id'));
        }
    });

    controller.addAction({
        'path': '/api/clientitems',
        'method': 'GET',
        'summary': 'Returns the list of client items ordered by name',
        'responsClass': 'ClientItem',
        'nickname': 'getClientItems'
    }, function(req, res, next) {
        lib.db.model('ClientItem').find().sort('name').exec(function(err, clientitems) {
            if (err) return next(controller.RESTError('InternalServerError', err));
            controller.writeHAL(res, clientitems);
        });
    });

    controller.addAction({
        'path': '/api/clientitems',
        'method': 'POST',
        'params': [swagger.bodyParam('clientitem', 'The JSON representation of the client item', 'string')],
        'summary': 'Adds a new client item to the database',
        'responsClass': 'ClientItem',
        'nickname': 'addClientItem'
    }, function(req, res, next) {
        var newClientItem = JSON.parse(req.body);
        var newClientItemModel = lib.db.model('ClientItem')(newClientItem);
        newClientItemModel.save(function(err, clientitem) {
            if (err) return next(controller.RESTError('InternalServerError', err));
            controller.writeHAL(res, {success: true, data: clientitem});
        });
    });

    controller.addAction({
        'path': '/api/clientitems/:id',
        'method': 'PUT',
        'summary': 'Updates the data of one client item',
        'responsClass': 'ClientItem',
        'nickname': 'updateClientItem'
    }, function(req, res, next) {
        var id = req.params.id;
        if (!id) {
            return next(controller.RESTError('InvalidArgumentError', 'Invalid id'));
        } else {
            var model = lib.db.model('ClientItem');
            model.findOne({_id: id})
                .exec(function(err, clientitem) {
                    if (err) return next(controller.RESTError('InternalServerError', err));
                    clientitem = _.extend(clientitem, JSON.parse(req.body));
                    clientitem.save(function(err, newClientItem) {
                        if (err) return next(controller.RESTError('InternalServerError', err));
                        controller.writeHAL(res, {success: true, data: newClientItem});
                    });
                });
        }
    });

    controller.addAction({
        'path': '/api/clientitems/:id',
        'method': 'DEL',
        'params': [swagger.bodyParam('id', 'The id of the client item to delete', 'string')],
        'summary': 'Deletes a client item from the database',
        'responsClass': 'ClientItem',
        'nickname': 'deleteClientItem'
    }, function(req, res, next) {
        lib.db.model('ClientItem').findOne({_id: req.params.id}).exec(function(err, clientitem) {
            if (err) return next(controller.RESTError('InternalServerError', err));
            clientitem.remove();
            controller.writeHAL(res, clientitem);
        });
    });

    return controller;
};

