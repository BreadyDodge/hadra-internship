const morseList = [
  ".-",
  "-...",
  "-.-.",
  "-..",
  ".",
  "..-.",
  "--.",
  "....",
  "..",
  ".---",
  "-.-",
  ".-..",
  "--",
  "-.",
  "---",
  ".--.",
  "--.-",
  ".-.",
  "...",
  "-",
  "..-",
  "...-",
  ".--",
  "-..-",
  "-.--",
  "--..",
];

const alphabet = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

function uniqueMorseRepresentations(words: string[]): number {
  const answer: string[] = [];
  for (let word of words) {
    let splitWord = word.split("");
    answer.push(
      splitWord
        .map((letter) => alphabet.indexOf(letter))
        .map((index) => morseList[index])
        .join("")
    );
  }
  let uniqueAnswer = new Set(answer);
  return uniqueAnswer.size;
}

console.log(uniqueMorseRepresentations(["gin", "zen", "gig", "msg"]));
