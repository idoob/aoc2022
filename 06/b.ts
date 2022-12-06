import * as p from "https://deno.land/std@0.165.0/path/mod.ts";
const file = await Deno.readTextFile(
  p.fromFileUrl(import.meta.resolve("./input.txt"))
);

const input = file.slice();
let [l, r] = [0, 14];

let a = -1;
while (r < input.length) {
  const window = new Set(input.slice(l, r));
  if (window.size == 14) {
     a = r;
    break;
  } else {
    r += 1;
    l += 1;
  }
}

console.log(a);
