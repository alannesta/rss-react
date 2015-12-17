var _ = require('underscore');

function cacheFactory() {
	var _cache = '';

	this.setCache = function(cache) {
		//_cache = Object.assign({}, cache);
		_cache = cache
	},

	this.getCache = function() {
		return JSON.parse(_cache);
	}
}

module.exports = new cacheFactory();
