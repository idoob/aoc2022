import * as p from "https://deno.land/std@0.165.0/path/mod.ts";
const input = await Deno.readTextFile(
  p.fromFileUrl(import.meta.resolve("./input.txt"))
);

const lines = input.split(/\n/);

const results: number[] = [];

let x = 1;
let cycle = 0;
let i = 0;
let remaining = 0;
while (cycle < 10000000000 && i < lines.length) {
  let cur = lines[i];

  if (cur == "noop") {
    i += 1;
    cycle += 1;
    if (cycle == 20 || (cycle >= 60 && (cycle - 20) % 40 == 0)) {
      console.log("no op pushed", cycle);
      results.push(cycle * x);
    }
  } else {
    const y = parseInt(cur.split(" ")[1]);
    remaining = 2;
    while (remaining > 0) {
      cycle += 1;
      remaining -= 1;
      if (cycle == 20 || (cycle >= 60 && (cycle - 20) % 40 == 0)) {
        if (cycle == 20) {
          console.log(cycle, remaining, y);
        }
        results.push(cycle * x);
        console.log("cycle pushed is ", cycle);
      }
    }
    x += y;
    i += 1;
  }
}

console.log(
  results.slice(0, 6).reduce((prev: number, a: number) => prev + a, 0)
);
