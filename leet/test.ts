let testPositive = [2, 1];
let testNegative = [-4];
let pointerA = 0;
let pointerB = 0;
let testTotal = testPositive[pointerA] + testNegative[pointerB];
if (testTotal < 0) {
  if (Math.abs(testTotal) == testPositive[pointerA]) {
    if (testPositive.filter((x) => x == Math.abs(testTotal)).length > 1) {
      console.log([
        testPositive[pointerA],
        testNegative[pointerB],
        Math.abs(testTotal),
      ]);
    } else {
      console.log("there is no asnwer");
    }
  } else {
    if (testPositive.some((x) => x == Math.abs(testTotal))) {
      console.log([
        testPositive[pointerA],
        testNegative[pointerB],
        Math.abs(testTotal),
      ]);
    } else {
      console.log("there is no answer");
    }
  }
}
