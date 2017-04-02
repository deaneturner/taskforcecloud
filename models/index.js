module.exports = function(db) {
    return {
        'Client': require('./client')(db),
        'ClientService': require('./clientservice')(db),
        'ClientServiceItem': require('./clientserviceitem')(db),
        'User': require('./user')(db)
    };
};
