import * as p from "https://deno.land/std@0.165.0/path/mod.ts";
// @deno-types="https://cdn.skypack.dev/@types/lodash?dts"
import lodash from "https://cdn.skypack.dev/lodash-es";

const input = await Deno.readTextFile(
  p.fromFileUrl(import.meta.resolve("./input.txt"))
);

const lines = input.split(/\s+/);

let count = 0;
for (let i = 0; i < lines.length; i = i + 3) {
  const [l1, l2, l3] = [
    lines[i].split(""),
    lines[i + 1].split(""),
    lines[i + 2].split(""),
  ];

  for (let j = 0; j < l1.length; j++) {
    if (
      lodash.find(l2, (x) => x === l1[j]) &&
      lodash.find(l3, (x) => x === l1[j])
    ) {
      count +=
        l1[j] === l1[j].toLowerCase()
          ? l1[j].charCodeAt(0) - 96
          : l1[j].charCodeAt(0) - 38;
      break;
    }
  }
}

console.log(count);
