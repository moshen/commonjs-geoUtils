/**
 * Unit tests for commonjs-geoUtils
 */

var testHeader = "\ngeoUtils Tests:\n";

// Some ugliness to get stdout printing accross varying javascript implementations
if ( typeof(document) === 'undefined' ){
  try {
    // Narwhal/Rhino
    print(testHeader);
  } catch(e){
    if ( typeof(system) === 'undefined' ) {
      // Node.js
      print = require('sys').puts;
    } else {
      // v8cgi
      print = function(s){
        system.stdout(s + '\n');
      }
    }
    print(testHeader);
  }
} else if ( typeof(document.write) === 'function' ) {
  // Browser window?
  print = function(s){ document.write('<p class="tests">' + s + '</p>'); };
  print(testHeader);
} else {
  // Throws on failed tests because I don't know how to print them
  print = function(s){
    if( s.indexOf('[FAILED]') === 0 ){
      throw(s);
    }
  }
}

var testing  = (function(){
  var passed = 0;
  var total = 0;
  
  return function(testFunc){
    if (typeof(testFunc) === 'undefined'){
      print('');
      print('Tests passed: ' + passed + '/' + total);
      
      return;
    }
    
    try{
      testFunc.run();
      print('[PASSED] : ' + testFunc.test);
      passed += 1;
      total += 1;
    } catch(e){
      print('[FAILED] : ' + testFunc.test +
            '\n\t' + e);
      total += 1;
    }
  }
})();

var assert = require('assert');

// Now to the tests...

print('LatLon :');
var LatLon = require('./lib/geoUtils').LatLon;

testing({
  test : "Expecting LatLon.toString() to return 'latitude,longitude'",
  run : function(){
    var point = new LatLon(41.850033, -87.6500523);
    assert.equal(point.toString(), "41.850033,-87.6500523");
  }
});

testing({
  test : "Expecting LatLon.toString('dms', 4) to return '41°51′00.1188″N, 087°39′00.1883″W'",
  run : function(){
    var point = new LatLon(41.850033, -87.6500523);
    assert.equal(point.toString('dms', 4), "41°51′00.1188″N, 087°39′00.1883″W");
  }
});

testing({
  test : "Expecting LatLon.distanceTo() to return correctly",
  run : function(){
    var point1 = new LatLon(41.850033, -87.6500523);
    var point2 = new LatLon(43.0730517, -89.4012302);
    assert.equal(point1.distanceTo(point2), 197.8);
  }
});

testing({
  test : "Expecting LatLon.distVincenty() to return correctly",
  run : function(){
    var point1 = new LatLon(41.850033, -87.6500523);
    var point2 = new LatLon(43.0730517, -89.4012302);
    assert.equal(point1.distVincenty(point2), 197986.973);
  }
});


print('\n\nGeo :');
var Geo = require('./lib/geoUtils').Geo;

testing({
  test : "Expecting Geo.parseDMS('41°51′00.1188″N') to return 41.850033",
  run : function(){
    assert.equal(Geo.parseDMS('41°51′00.1188″N'), 41.850033);
  }
});

testing({
  test : "Expecting Geo.toDMS(41.850033, 'dms', 4) to return '041\u00b051\u203200.1188\u2033'",
  run : function(){
    assert.equal(Geo.toDMS(41.850033, 'dms', 4), '041\u00b051\u203200.1188\u2033');
  }
});

testing({
  test : "Expecting Geo.toLat(41.850033 ,'dms', 4) to return '41°51′00.1188″N'",
  run : function(){
    assert.equal(Geo.toLat(41.850033, 'dms', 4), '41°51′00.1188″N');
  }
});

testing({
  test : "Expecting Geo.toLon(-87.6500523 ,'dms', 4) to return '087°39′00.1883″W'",
  run : function(){
    assert.equal(Geo.toLon(-87.6500523, 'dms', 4), '087°39′00.1883″W');
  }
});

testing({
  test : "Expecting Geo.toBrng(-87.6500523 ,'dms', 4) to return '272°20′59.8117″'",
  run : function(){
    assert.equal(Geo.toBrng(-87.6500523, 'dms', 4), '272°20′59.8117″');
  }
});

print('\n\nNumeric Conversions :');
var geoUtils = require('./lib/geoUtils');

testing({
  test : "Expecting geoUtils.toRad(41.850033) to return 0.7304208679182801",
  run : function(){
    assert.equal(geoUtils.toRad(41.850033), 0.7304208679182801);
  }
});

testing({
  test : "Expecting geoUtils.toDeg(0.7304208679182801) to return 41.850033",
  run : function(){
    assert.equal(geoUtils.toDeg(0.7304208679182801), 41.850033);
  }
});

testing({
  test : "Expecting geoUtils.toPrecisionFixed(0.7304208679182801, 4) to return '0.7304'",
  run : function(){
    assert.equal(geoUtils.toPrecisionFixed(0.7304208679182801, 4), '0.7304');
  }
});

print('\n\nDistance comparisons :');

testing({
  test : "Expecting geoUtils.withinBoundingBox() to return the appropriate points",
  run : function(){
    var points = [
      new LatLon(42.4356, -88.4262),
      new LatLon(42.4264, -88.2431),
      new LatLon(42.2435, -88.4616),
      new LatLon(42.4376, -88.4366),
      new LatLon(42.4376, -90.4366)
    ];
    
    var results = geoUtils.withinBoundingBox(new LatLon(41.850033, -87.6500523), new LatLon(43.0730517, -89.4012302), points);
    
    for( var i in results ){
      assert.equal( results[i] , points[i] );
    }

    assert.equal( results.length, 4);
  }
});


//testing({
//  test : "Should fial",
//  run : function(){
//    assert.equal(1, 2, this.test);
//  }
//});
//
testing();
