//counting method
// function isValid(s: string): boolean {
//   let openNormal: number = 0;
//   let openCurly: number = 0;
//   let openSquare: number = 0;
//   let closeNormal: number = 0;
//   let closeCurly: number = 0;
//   let closeSquare: number = 0;
//   for (let parenthesis of s) {
//     if (parenthesis === "(") {
//       openNormal++;
//     }
//     if (parenthesis === ")") {
//       closeNormal++;
//     }
//     if (parenthesis === "{") {
//       openCurly++;
//     }
//     if (parenthesis === "}") {
//       closeCurly++;
//     }
//     if (parenthesis === "[") {
//       openSquare++;
//     }
//     if (parenthesis === "]") {
//       closeSquare++;
//     }
//   }
//   if (
//     openNormal === closeNormal &&
//     openCurly === closeCurly &&
//     openSquare === closeSquare
//   ) {
//     return true;
//   } else {
//     return false;
//   }
// }
interface paranthesisList {
  type: string;
  isOpen: boolean;
  order: number;
}
function isValid(s: string): boolean {
  let orderCount = 1;
  const parenthesis: paranthesisList[] = [];
  for (let sign of s) {
    if (sign == "(" || sign == "[" || sign == "{") {
      parenthesis.unshift({
        type: sign,
        isOpen: true,
        order: orderCount,
      });
      orderCount++;
    }
    if (sign == ")") {
      const matchingSign = parenthesis
        .filter((x) => x.type == "(")
        .filter((y) => y.isOpen == true);
      if (matchingSign.length == 0) {
        return false;
      } else {
        for (let openBracket of matchingSign) {
          if (
            parenthesis
              .filter((z) => openBracket.order < z.order)
              .some((g) => g.isOpen == true)
          ) {
            return false;
          } else {
            openBracket.isOpen = false;
            break;
          }
        }
      }
    }
    if (sign == "]") {
      const matchingSign = parenthesis
        .filter((x) => x.type == "[")
        .filter((y) => y.isOpen == true);
      if (matchingSign.length == 0) {
        return false;
      } else {
        for (let openBracket of matchingSign) {
          if (
            parenthesis
              .filter((z) => openBracket.order < z.order)
              .some((g) => g.isOpen == true)
          ) {
            return false;
          } else {
            openBracket.isOpen = false;
            break;
          }
        }
      }
    }
    if (sign == "}") {
      const matchingSign = parenthesis
        .filter((x) => x.type == "{")
        .filter((y) => y.isOpen == true);
      if (matchingSign.length == 0) {
        return false;
      } else {
        for (let openBracket of matchingSign) {
          if (
            parenthesis
              .filter((z) => openBracket.order < z.order)
              .some((g) => g.isOpen == true)
          ) {
            return false;
          } else {
            openBracket.isOpen = false;
            break;
          }
        }
      }
    }
  }
  if (parenthesis.some((h) => h.isOpen == true)) {
    return false;
  } else {
    return true;
  }
}

// return parenthesis.some((parant) => (parant.isOpen ? false : true))

console.log(isValid("([]){"));

// if (
//   parenthesis
//     .filter((parent) => {
//       parent.order > openBracket.order;
//     })
//     .some((parent) => {
//       parent.isOpen == true;
//     })
// ) {
//   return false;
// } else {
//   break;
// }

// for (let openBracket of parenthesis) {
//   if (openBracket.type == "(") {
//     if (openBracket.isOpen) {
//       if (
//         parenthesis
//           .filter((e) => e.order > openBracket.order)
//           .some((e) => e.isOpen == true)
//       ) {
//         return false;
//       } else {
//         openBracket.isOpen = false;
//         break;
//       }
//     }
//   }
// }
