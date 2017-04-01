module.exports = {
    roles: {
        level0: 'Administrator',
        level1: 'Supervisor',
        level2: 'Contributor',
        default: 'Inactive',
        asList: function() {
            return [this.level0, this.level1, this.level2];
        }
    }
};
