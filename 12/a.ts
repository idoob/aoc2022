import * as p from "https://deno.land/std@0.165.0/path/mod.ts";
const input = await Deno.readTextFile(
  p.fromFileUrl(import.meta.resolve("./input.txt"))
);

const lines = input.split(/\n/);
const grid: string[][] = [];
let starting: number[] = [];
let ending: number[] = [];

lines.forEach((line, index) => {
  const elements = line.split("");
  grid.push(elements);

  const foundS = elements.indexOf("S");
  const foundE = elements.indexOf("E");
  if (foundS > -1) {
    starting = [index, foundS];
    grid[index][foundS] = "a";
  }

  if (foundE > -1) {
    ending = [index, foundE];
    grid[index][foundE] = "z";
  }
});

const rows = lines.length;
const cols = grid[0].length;
const visited: boolean[][] = [...Array(rows)].map(() =>
  Array(cols).fill(false)
);

visited[starting[0]][starting[1]] = true;
const q: number[][] = [starting];
let steps = 0;
let nodesLeft = 1;
let nodesNext = 0;

function visit(
  r: number,
  c: number,
) {
  const dir: number[][] = [
    [-1, 0],
    [1, 0],
    [0, 1],
    [0, -1],
  ];

  const a = "abcdefghijklmnopqrstuvwxyz";

  for (let i = 0; i < 4; i++) {
    const vr = r + dir[i][0];
    const vc = c + dir[i][1];

    if (vr < 0 || vc < 0) continue;
    if (vr >= rows || vc >= cols) continue;
    if (visited[vr][vc]) continue;
    if (
      grid[vr][vc] != grid[r][c] &&
      a.indexOf(grid[vr][vc]) > a.indexOf(grid[r][c]) + 1
    ) {
      continue;
    }

    q.push([vr, vc]);
    nodesNext += 1;
    visited[vr][vc] = true;
  }
}

while (q.length > 0) {
  const [cr, cc] = q.shift()!;

  if (cr == ending[0] && cc == ending[1]) {
    break;
  }
  visit(cr, cc);
  nodesLeft -= 1;

  if (nodesLeft == 0) {
    nodesLeft = nodesNext;
    nodesNext = 0;
    steps += 1;
  }
}

console.log(steps);
