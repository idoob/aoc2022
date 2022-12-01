import * as p from "https://deno.land/std@0.165.0/path/mod.ts";
const input = await Deno.readTextFile(
  p.fromFileUrl(import.meta.resolve("./input.txt"))
);

const elves = input.split(/\r?\n/) as string[];

let cur = 0;
let cals: number[] = [];
for (const cal of elves) {
  if (!cal) {
    cals.push(cur);
    cur = 0;
  } else {
    cur += parseInt(cal);
  }
}

console.log(
  cals
    .sort((a, b) => a - b)
    .slice(-3)
    .reduce((total, n) => total + n, 0)
);
