function reverse(x: number): number {
  let stringNumber: string = JSON.stringify(Math.abs(x));
  let reversedNumber: string[] = [];
  stringNumber.split("").map((x) => reversedNumber.unshift(x));
  let temp = reversedNumber;
  let finalNumber = Number(temp.join(""));
  if (x > 0 && finalNumber < 2147483647 && finalNumber > -2147483648) {
    return finalNumber;
  }
  if (x < 0 && finalNumber < 2147483647 && finalNumber > -2147483648) {
    return finalNumber - 2 * finalNumber;
  }
  return 0;
}

console.log(reverse(-2147483648));

// const test = -123;
// console.log();
