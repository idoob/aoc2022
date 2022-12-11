import * as p from "https://deno.land/std@0.165.0/path/mod.ts";
const input = await Deno.readTextFile(
  p.fromFileUrl(import.meta.resolve("./input.txt"))
);

const rows = input
  .split(/\n/)
  .map((x) => Array.from(x).map((y) => parseInt(y)));
const size = input.split(/\n/).length;

let max = -1;
for (let i = 0; i < size; i++) {
  for (let j = 0; j < size; j++) {
    const cur = rows[i][j];
    let score = 1;
    const dir = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ];
    
    dir.map((d) => {
      const [dx, dy] = d;
      let [x, y] = [i + dx, j + dy];
      let numTrees = 1;
      while (
        x > 0 &&
        x < size - 1 &&
        y > 0 &&
        y < size - 1 &&
        cur > rows[x][y]
      ) {
        numTrees += 1;
        x += dx;
        y += dy;
      }
      score *= numTrees;
    });
    max = score > max ? score : max;
  }
}

console.log(max);
