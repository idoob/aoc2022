import * as p from "https://deno.land/std@0.165.0/path/mod.ts";
const input = await Deno.readTextFile(
  p.fromFileUrl(import.meta.resolve("./input.txt"))
);

const lines = input.split(/\n/);

const grid = Array.from({ length: 1000 }, () =>
  Array.from({ length: 1000 }, () => ".")
);

let maxX = 0;
lines.forEach((line) => {
  const points = line.split("->").map((x) => x.trim());

  for (let i = 0; i < points.length - 1; i++) {
    const [sy, sx] = points[i].split(",").map((x) => parseInt(x));
    const [ey, ex] = points[i + 1].split(",").map((x) => parseInt(x));

    if (sx == ex) {
      const max = Math.max(sy, ey);
      const min = Math.min(sy, ey);

      for (let j = min; j <= max; j++) {
        grid[sx][j] = "#";
      }
    } else {
      const max = Math.max(sx, ex);
      const min = Math.min(sx, ex);

      for (let j = min; j <= max; j++) {
        grid[j][sy] = "#";
      }
    }

    maxX = sx > maxX ? sx : maxX;
    maxX = ex > maxX ? ex : maxX;
  }
});

grid[maxX + 2] = Array.from({ length: 1000 }, () => "#");

const dir = { d: [1, 0], l: [1, -1], r: [1, 1] };
let done = false;
let count = 0;

while (!done) {
  let [cx, cy] = [0, 500];
  let d: "d" | "l" | "r" = "d";
  while (true) {
    const [nx, ny] = [cx + dir[d][0], cy + dir[d][1]];
    if (grid[nx][ny] != "#" && grid[nx][ny] != "o") {
      cx = nx;
      cy = ny;
      d = "d";
    } else if (d == "d") {
      d = "l";
    } else if (d == "l") {
      d = "r";
    } else {
      grid[cx][cy] = "o";
      count += 1;
      if (cx == 0 && cy == 500) {
        done = true;
      }
      break;
    }
  }
}

console.log(count);
