import * as p from "https://deno.land/std@0.165.0/path/mod.ts";
const input = await Deno.readTextFile(
  p.fromFileUrl(import.meta.resolve("./input.txt"))
);

const elves = input.split(/\r?\n/) as string[];

let cur = 0;
let max = 0;
for (const cal of elves) {
  if (!cal) {
    max = cur > max ? cur : max;
    cur = 0;
  } else {
    cur += parseInt(cal);
  }
}
max = cur > max ? cur : max;

console.log(max);
