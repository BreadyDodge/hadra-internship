const numbers = [12, 45, 7, 89, 23, 56, 34, 91, 18, 67];
const target = 23;

//find index of target
function binarySearch(nums: number[], target): number {
  const sortedNumber = nums
    .map((value, location) => ({ value, location }))
    .sort((a, b) => a.value - b.value);
  let low = 0;
  let high = nums.length;
  while (low < high) {
    let mid = Math.floor((high + low) / 2);
    if (sortedNumber[mid].value > target) {
      high = mid - 1;
    }
    if (sortedNumber[mid].value < target) {
      low = mid + 1;
    }
    if (sortedNumber[mid].value == target) {
      return sortedNumber[mid].location;
    }
  }
  return -1;
}

console.log(binarySearch(numbers, target));

//think in isolated parts
//e.g. what happends if found what happen if not found in the while loop

//values outside of the loop doesnt update unless specified

//basic concept of binary search
//find mid
// if too high eliminate high parts and update high to mid
// if too low eliminate low parts and update low to mid
