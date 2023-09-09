function calculateMidpoint(lat1, lon1, lat2, lon2) {
  // Convert degrees to radians
  const lat1Rad = lat1 * (Math.PI / 180);
  const lon1Rad = lon1 * (Math.PI / 180);
  const lat2Rad = lat2 * (Math.PI / 180);
  const lon2Rad = lon2 * (Math.PI / 180);

  // Calculate the midpoint coordinates
  const midLat = (lat1Rad + lat2Rad) / 2;
  const midLon = (lon1Rad + lon2Rad) / 2;

  // Convert the midpoint coordinates back to degrees
  const midLatDeg = midLat * (180 / Math.PI);
  const midLonDeg = midLon * (180 / Math.PI);

  return {
    lat: midLatDeg.toFixed(3), // Round to 3 decimal places
    lon: midLonDeg.toFixed(3), // Round to 3 decimal places
  };
}
/*
module.exports = calculateMidpoint;

const calculateMidpoint = require("./calculateMidpoint");
*/

test("calculateMidpoint calculates the correct midpoint", () => {
  const result = calculateMidpoint(51.5074, 0.1278, 48.8566, 2.3522);

  // Use toEqual to compare objects
  expect(result).toEqual({
    lat: 50.182,
    lon: 1.24,
  });
});
