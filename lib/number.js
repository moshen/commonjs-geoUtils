// extend Number object with methods for converting degrees/radians

/** Convert numeric degrees to radians */
var toRad = function(deg) {
  return deg * Math.PI / 180;
}
Number.prototype.toRad = function(){
  return toRad(this);
}
exports.toRad = toRad;

/** Convert radians to numeric (signed) degrees */
var toDeg = function(rad) {
  return rad * 180 / Math.PI;
}
Number.prototype.toDeg = function(){
  return toDeg(this);
}
exports.toDeg = toDeg;

/**
 * Format the significant digits of a number, using only fixed-point notation (no exponential)
 *
 * @param   {Number} precision: Number of significant digits to appear in the returned string
 * @returns {String} A string representation of number which contains precision significant digits
 */
var toPrecisionFixed = function(in_num , precision) {
  var numb = in_num < 0 ? -in_num : in_num;  // can't take log of -ve number...
  var sign = in_num < 0 ? '-' : '';

  if (numb == 0) { n = '0.'; while (precision--) n += '0'; return n };  // can't take log of zero

  var scale = Math.ceil(Math.log(numb)*Math.LOG10E);  // no of digits before decimal
  var n = String(Math.round(numb * Math.pow(10, precision-scale)));
  if (scale > 0) {  // add trailing zeros & insert decimal as required
    var l = scale - n.length;
    while (l-- > 0) n = n + '0';
    if (scale < n.length) n = n.slice(0,scale) + '.' + n.slice(scale);
  } else {          // prefix decimal and leading zeros if required
    while (scale++ < 0) n = '0' + n;
    n = '0.' + n;
  }
  return sign + n;
}
Number.prototype.toPrecisionFixed = function(precision){
  return toPrecisionFixed(this, precision);
}
exports.toPrecisionFixed = toPrecisionFixed;
