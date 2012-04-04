"use strict";

var Class = module.exports = function () {
};

Class.extend = function (properties) {
	var ctor = properties.initialize;
	if (typeof ctor === "undefined")
		ctor = properties.initialize = function () {};
	function tmp() {};
	tmp.prototype = this.prototype;
	ctor.prototype = new tmp();
	ctor.extend = Class.extend;
	// assign properties
	for (var k in properties) {
		if (k.charAt(0) == '$') {
			ctor[k.substring(1)] = properties[k];
		} else {
			ctor.prototype[k] = properties[k];
		}
	}
	if (typeof ctor.initialize === "function") {
		ctor.initialize();
	}
	return ctor;
};

Class.prototype.initialize = function () {
};

Class.$import = function (name) {
	var module = require(name);
	var script = [];
	for (var i in module)
		if (module.hasOwnProperty(i) && i.match(/^[^_]/))
			script.push("var " + i + " = require(\"" + name + "\")." + i + ";\n");
	return script.join("");
};