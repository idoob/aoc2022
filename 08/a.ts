import * as p from "https://deno.land/std@0.165.0/path/mod.ts";
const input = await Deno.readTextFile(
  p.fromFileUrl(import.meta.resolve("./input.txt"))
);

const rows = input
  .split(/\n/)
  .map((x) => Array.from(x).map((y) => parseInt(y)));

let count = 0;
const size = input.split(/\n/).length;
for (let i = 0; i < size; i++) {
  for (let j = 0; j < size; j++) {
    const cur = rows[i][j];

    if (i == 0 || i == size - 1 || j == 0 || j == size - 1) {
      count += 1;
      continue;
    }

    let l = j - 1;

    while (l >= 0 && cur > rows[i][l]) {
      l -= 1;
    }
    if (l == -1) {
      count += 1;
      continue;
    }

    let r = j + 1;

    while (r < size && cur > rows[i][r]) {
      r += 1;
    }

    if (r == size) {
      count += 1;
      continue;
    }

    let t = i - 1;
    while (t >= 0 && cur > rows[t][j]) {
      t -= 1;
    }

    if (t == -1) {
      count += 1;
      continue;
    }

    let b = i + 1;

    while (b < size && cur > rows[b][j]) {
      b += 1;
    }

    if (b == size) {
      count += 1;
    }
  }
}

console.log(count);
