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
  let positivePointer = 0;
  let negativePointer = 0;
  let total = positive[positivePointer] + negative[negativePointer];
  if (zeros.length != 0) {
    while (
      positivePointer < positive.length &&
      negativePointer < negative.length
    ) {
      let total = positive[positivePointer] + negative[negativePointer];
      if (total == 0) {
        answer.push([positive[positivePointer], negative[negativePointer], 0]);
        positivePointer++;
        negativePointer++;
      } else if (total > 0) {
        positivePointer++;
      } else if (total < 0) {
        negativePointer++;
      }
    }
  }
  positivePointer = 0;
  negativePointer = 0;
  while (
    positivePointer < positive.length &&
    negativePointer < negative.length
  ) {
    console.log(
      `${total} =  ${positive[positivePointer]} + ${negative[negativePointer]}`
    );
    if (total < 0) {
      if (Math.abs(total) == positive[positivePointer]) {
        if (positive.filter((x) => x == Math.abs(total)).length > 1) {
          answer.push([
            positive[positivePointer],
            negative[negativePointer],
            Math.abs(total),
          ]);
          positivePointer++;
          negativePointer++;
        } else {
          negativePointer++;
        }
      } else {
        if (positive.some((x) => x == Math.abs(total))) {
          answer.push([
            positive[positivePointer],
            negative[negativePointer],
            Math.abs(total),
          ]);
          positivePointer++;
          negativePointer++;
        } else {
          negativePointer++;
        }
      }
    } else if (total > 0) {
      if (-total == negative[negativePointer]) {
        if (negative.filter((x) => x == -total).length > 1) {
          answer.push([
            positive[positivePointer],
            negative[negativePointer],
            -total,
          ]);
          positivePointer++;
          negativePointer++;
        } else {
          positivePointer++;
        }
      } else {
        if (negative.some((x) => x == -total)) {
          answer.push([
            positive[positivePointer],
            negative[negativePointer],
            -total,
          ]);
          positivePointer++;
          negativePointer++;
        } else {
          positivePointer++;
        }

      }
    }
  }
  return removeDuplicate(answer);
}

console.log(threeSum([-1, 0, 1, 2, -1, -4]));

// let testPositive = [2, 1];
// let testNegative = [-4];
// let pointerA = 0;
// let pointerB = 0;
// let testTotal = testPositive[pointerA] + testNegative[pointerB];
// if (testTotal < 0) {
//   if (Math.abs(testTotal) == testPositive[pointerA]) {
//     if (testPositive.filter((x) => x == Math.abs(testTotal)).length > 1) {
//       console.log([
//         testPositive[pointerA],
//         testNegative[pointerB],
//         Math.abs(testTotal),
//       ]);
//     } else {
//       console.log("there is no asnwer");
//     }
//   } else {
//     if (testPositive.some((x) => x == Math.abs(testTotal))) {
//       console.log([
//         testPositive[pointerA],
//         testNegative[pointerB],
//         Math.abs(testTotal),
//       ]);
//     } else {
//       console.log("there is no answer");
//     }
//   }
// }
