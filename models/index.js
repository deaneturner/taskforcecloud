module.exports = function(db) {
	return {
		"Client": require("./client")(db),
		"User": require("./user")(db)
	};
}