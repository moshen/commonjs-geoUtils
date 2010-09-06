/**
 * Unit tests for commonjs-geoUtils
 */

var assert = require('assert');
var LatLon = require('../lib/geoUtils').LatLon;

var point = new LatLon(55, -1);
assert.equal(point.toString(), "55,-1", "Expecting toString() to return 'latitude,longitude'");
