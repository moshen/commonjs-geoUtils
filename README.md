# Geographic Utilities for CommonJS
Largely based (copypasta) on the excellent javascript implementations of various geographic formulas by [Chris Veness](http://www.movable-type.co.uk/scripts/)

The original scripts have been modified slightly for usage as a CommonJS/Node.js module.  Also some functions were wrapped for clarity/consistency.

Criticism/Suggestions/Patches/Additions/PullReq's welcome.

# Status
The library works great!

TODO:

* Tests for everything (using [vows](http://vowsjs.org/)?  Might not be good for a non-node module)
* Add package.json

# Usage
	var gu = require('geoUtils');
	
    var point1 = new gu.LatLon(41.850033, -87.6500523);
Creates a lat/lon point for Chicago, Il
	var point2 = new gu.LatLon(43.0730517, -89.4012302);
Creates a lat/lon point for Madison, Wi
	
	point1.distanceTo(point2);
Great Circle distance.  Fairly accurate for most situations.
Returns 197.8 kilometers
	
	point1.distVincenty(point2);
Vincenty inverse formula distance using a WGS-84 ellipsoid.  Very accurate, but slower.
Returns 197986.973 meters

	point1.toString('dms', 4);
Pretty printing and conversion of lat/lon points.
Returns 41°51′00.1188″N, 087°39′00.1883″W

And much more!  Please refer to the source for further functions.
