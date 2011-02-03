
// Initial implementation of bounding box

exports.withinBoundingBox = function(point1, point2, listOfPoints) {
  var boundingBox = {};
  if( point1._lat > point2._lat ){
    boundingBox.north = point1._lat;
    boundingBox.south = point2._lat;
  } else {
    boundingBox.north = point2._lat;
    boundingBox.south = point1._lat;
  }

  if( point1._lon > point2._lon ){
    boundingBox.west = point1._lon;
    boundingBox.east = point2._lon;
  } else {
    boundingBox.west = point2._lon;
    boundingBox.east = point1._lon;
  }
  
  boundingBox.pointsWithin = [];
  listOfPoints.forEach(function(point){
    if( point._lat < boundingBox.north && point._lat > boundingBox.south && 
        point._lon < boundingBox.west && point._lon > boundingBox.east ){
      boundingBox.pointsWithin.push(point);
    }
  });

  return boundingBox.pointsWithin;
};



