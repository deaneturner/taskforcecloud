module.exports = function(db) {
    return {
        'Client': require('./client')(db),
        'ClientService': require('./clientservice')(db),
        'ClientServiceTask': require('./clientservicetask')(db),
        'User': require('./user')(db)
    };
};
