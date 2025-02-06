//minimum k so that banans ate <= h
//n will always be < h

function minEatingSpeed(piles: number[], h: number): number {
  let numberOfPiles = piles.length;
  let high = Math.max(...piles);
  let low = 1;
  //exhaustive loop because going for optimal value
  while (low < high) {
    let mid = Math.floor((high + low) / 2);
    let timeElapsed = 0;
    for (const pile of piles) {
      timeElapsed += Math.ceil(pile / mid);
    }
    if (timeElapsed <= h) {
      high = mid;
    }
    if (timeElapsed > h) {
      low = mid;
    }
  }
  return low;
}

console.log(minEatingSpeed([30, 11, 23, 4, 20], 5));

// console.log(Math.ceil(3 / 5.5));

//working jail
// function minEatingSpeed(piles: number[], h: number): number {
//   let numberOfPiles = piles.length;
//   let ratio = h / numberOfPiles;
//   let biggestPile = Math.max(...piles);
//   let speedK = Math.ceil(biggestPile / ratio);
//   let timeElapsed = 0
// while (timeElapsed <= h) {
//   for (const pile of piles) {
//     timeElapsed += Math.ceil(pile / speedK);
//   }
//   if (timeElapsed <= h) {
//     speedK--;
//     timeElapsed = 0;
//   } else {
//     return speedK + 1;
//   }
// }
//   return 0;
// }
