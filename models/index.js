module.exports = function(db) {
    return {
        'Client': require('./client')(db),
        'ClientItem': require('./clientitem')(db),
        'ClientService': require('./clientservice')(db),
        'ClientServiceTask': require('./clientservicetask')(db),
        'User': require('./user')(db)
    };
};
