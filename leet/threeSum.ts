// concept:
// if there's 3 components it is either [+,0,-] or [+,+,-] or [-,-,+]
// there is no 0 its the later 2

function removeDuplicate(array: number[][]) {
  let sorted = array.map((x) => x.sort((a, b) => a - b));
  let stringified = sorted.map((y) => JSON.stringify(y));
  let unique = new Set(stringified);
  let backToArray = Array.from(unique).map((x) => JSON.parse(x));
  return backToArray;
}
//standard line
// function threeSum(nums: number[]): number[][] {
//   const answer: number[][] = [];
//   for (let i = 0; i < nums.length; i++) {
//     for (let j = i + 1; j < nums.length; j++) {
//       for (let k = j + 1; k < nums.length; k++) {
//         if (nums[i] + nums[j] + nums[k] === 0) {
//           answer.push([nums[i], nums[j], nums[k]]);
//         }
//       }
//     }
//   }
//   return removeDuplicate(answer);
// }

// optimized one below (not done)
function threeSum(nums: number[]): number[][] {
  const answer: number[][] = [];
  let positive: number[] = nums.filter((x) => x > 0).sort((a, b) => b - a);
  let negative: number[] = nums.filter((x) => x < 0).sort((a, b) => a - b);
  let zeros: number[] = nums.filter((x) => x == 0);
  let postivePointer = 0;
  let negativePointer = 0;
  let zerosPointer = 0;
  while (
    postivePointer <= positive.length &&
    negativePointer <= negative.length &&
    zerosPointer <= zeros.length
  ) {
    //when the total is negative negativePointer + 1 to increase the value
    //when total is positive positivePointer + 1 to reduce the value
    if (zeros.length != 0) {
      if (positive[postivePointer] + negative[negativePointer] == 0) {
        answer.push[(positive[postivePointer], negative[negativePointer], 0)];
      }
    }
  }
  return removeDuplicate(answer);
}

console.log(threeSum([-1, 0, 1, 2, -1, -4]));

// let testString = "[1,2,3]";
// console.log(JSON.parse(testString));
