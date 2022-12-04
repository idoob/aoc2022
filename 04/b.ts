import * as p from "https://deno.land/std@0.165.0/path/mod.ts";
// @deno-types="https://cdn.skypack.dev/@types/lodash?dts"
import { range } from "https://cdn.skypack.dev/lodash-es";

const input = await Deno.readTextFile(
  p.fromFileUrl(import.meta.resolve("./input.txt"))
);

const lines = input.split(/\s+/);

let count = 0;
lines.map((line) => {
  const pair = line.split(",");

  const [l1, l2] = pair[0].split("-");
  const [r1, r2] = pair[1].split("-");

  const leftSet = new Set(range(parseInt(l1), parseInt(l2) + 1));
  const rightSet = new Set(range(parseInt(r1), parseInt(r2) + 1));

  const intersection = new Set(
    [...leftSet].filter((element) => rightSet.has(element))
  );

  if (intersection.size > 0) {
    count += 1;
  }
});

console.log(count);
