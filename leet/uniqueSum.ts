function sumOfUnique(nums: number[]): number {
  let answer = 0;
  let unique: number[] = [];
  let removedList: number[] = [];
  nums.map((x) =>
    unique.includes(x) || removedList.includes(x)
      ? (unique.includes(x) ? unique.splice(unique.indexOf(x), 1) : "",
        removedList.push(x))
      : unique.push(x)
  );
  console.log(unique);
  console.log(removedList);
  unique.forEach((x) => (answer += x));
  return answer;
}

console.log(sumOfUnique([1, 2, 3, 2]));

// let test = [0, 1, 2];
// console.log(test.indexOf(3));
