import * as p from "https://deno.land/std@0.165.0/path/mod.ts";
const input = await Deno.readTextFile(
  p.fromFileUrl(import.meta.resolve("./input.txt"))
);

const elves = input.split(/\s/) as string[];

const pairs = elves.reduce(function (result, value, index, array) {
  if (index % 2 === 0) result.push(array.slice(index, index + 2));
  return result;
}, [] as string[]);

const conv = (num) => {
  switch (num) {
    case "A":
    case "X":
      return 1;
    case "B":
    case "Y":
      return 2;
    case "C":
    case "Z":
      return 3;
  }
};

const didWin = (me, op) => {
  switch (me) {
    case 1:
      return op == "3";
    case 2:
      return op == "1";
    case 3:
      return op == "2";
  }
};
let score = 0;
for (const pair of pairs) {
  const [op, me] = pair;

  const meNum = conv(me);
  const opNum = conv(op);

  score += meNum;

  // console.log(didWin(meNum, opNum));
  if (didWin(meNum, opNum)) {
    score += 6;
  } else {
    if (meNum === opNum) {
      score += 3;
    } else {
      score += 0;
    }
  }
  console.log(meNum, opNum, score);
}
