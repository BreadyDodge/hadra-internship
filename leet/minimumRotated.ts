function findMin(nums: number[]): number {
  let low = 0;
  let high = nums.length - 1;
  while (low < high) {
    let mid = Math.floor((low + high) / 2);
    if (nums[mid] < nums[high]) {
      high = mid;
    } else {
      low = mid + 1;
    }
  }
  return nums[low];
}

console.log(findMin([3, 4, 5, 1, 2]));
