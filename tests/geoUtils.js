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
  print = document.write;
  print(testHeader);
} else {
  print = function(s){
    // Does nothing, because I have no idea where I am.
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
var LatLon = require('../lib/geoUtils').LatLon;

testing({
  test : "Expecting LatLon.toString() to return 'latitude,longitude'",
  run : function(){
    var point = new LatLon(41.850033, -87.6500523);
    assert.equal(point.toString(), "41.850033,-87.6500523", this.test);
  }
});

testing({
  test : "Expecting LatLon.toString('dms', 4) to return '41°51′00.1188″N, 087°39′00.1883″W'",
  run : function(){
    var point = new LatLon(41.850033, -87.6500523);
    assert.equal(point.toString('dms', 4), "41°51′00.1188″N, 087°39′00.1883″W", this.test);
  }
});

testing({
  test : "Expecting LatLon.distanceTo() to return correctly",
  run : function(){
    var point1 = new LatLon(41.850033, -87.6500523);
    var point2 = new LatLon(43.0730517, -89.4012302);
    assert.equal(point1.distanceTo(point2), 197.8, this.test);
  }
});

testing({
  test : "Expecting LatLon.distVincenty() to return correctly",
  run : function(){
    var point1 = new LatLon(41.850033, -87.6500523);
    var point2 = new LatLon(43.0730517, -89.4012302);
    assert.equal(point1.distVincenty(point2), 197986.973, this.test);
  }
});

//testing({
//  test : "Should fial",
//  run : function(){
//    assert.equal(1, 2, this.test);
//  }
//});

testing();