const calculateMidpoint = require("./calculateMidpoint.js");

test("calculateMidpoint calculates the correct midpoint", () => {
  expect(calculateMidpoint(51.5074, 0.1278, 48.8566, 2.3522)).toEqual({
    lat: 50.182,
    lon: 1.24,
  });
});