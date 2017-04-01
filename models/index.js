module.exports = function(db) {
    return {
        'Client': require('./client')(db),
        'ClientService': require('./clientservice')(db),
        'User': require('./user')(db)
    };
};
