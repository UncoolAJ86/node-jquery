/**
* Returns an array of elements with the given IDs, eg.
* @example q("main", "foo", "bar")
* @result [<div id="main">, <span id="foo">, <input id="bar">]
*/
var query_ids = function() {
	var r = [];

	for ( var i = 0; i < arguments.length; i++ ) {
		r.push( document.getElementById( arguments[i] ) );
	}

	return r;
}

var recreate_doc = function(html) {
	document = require('jsdom').jsdom(html);
	window = document.createWindow();
	$ = jQuery = require(process.cwd() + '/build/dist/node-jquery').create(window, true);
}

exports.query_ids = query_ids;
exports.recreate_doc = recreate_doc;
