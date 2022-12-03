import * as p from "https://deno.land/std@0.165.0/path/mod.ts";
// @deno-types="https://cdn.skypack.dev/@types/lodash?dts"
import lodash from "https://cdn.skypack.dev/lodash-es";

const input = await Deno.readTextFile(
  p.fromFileUrl(import.meta.resolve("./input.txt"))
);

const lines = input.split(/\s+/);

let count = 0;
lines.map((line) => {
  const le = line.substring(0, line.length / 2).split("");
  const ri = line.substring(line.length / 2).split("");

  for (let j = 0; j < le.length; j++) {
    if (lodash.find(ri, (x) => x === le[j])) {
      count +=
        le[j] === le[j].toLowerCase()
          ? le[j].charCodeAt(0) - 96
          : le[j].charCodeAt(0) - 38;
      break;
    }
  }
});

console.log(count);
