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

const need = (me) => {
  switch (me) {
    case "X":
      return 0;
    case "Y":
      return 3;
    case "Z":
      return 6;
  }
};

const toLose = (n) => {
  switch (n) {
    case 1:
      return 3;
    case 2:
      return 1;
    case 3:
      return 2;
  }
};

let score = 0;
for (const pair of pairs) {
  const [op, me] = pair;

  const scoredNeeded = need(me);
  const opPick = conv(op);

  console.log(scoredNeeded);

  score += scoredNeeded;
  if (scoredNeeded === 3) {
    score += opPick;
  }

  if (scoredNeeded === 0) {
    score += toLose(opPick);
  }

  if (scoredNeeded === 6) {
    score += toLose(toLose(opPick));
  }
  console.log(score);
}
