import * as p from "https://deno.land/std@0.165.0/path/mod.ts";
const input = await Deno.readTextFile(
  p.fromFileUrl(import.meta.resolve("./input.txt"))
);

const lines = input.split(/\n/);

const visited = new Set();
let hx = 0;
let hy = 0;
let tx = 0;
let ty = 0;

lines.map((line) => {
  const [d, s] = line.split(" ");
  const dv: { [d: string]: number[] } = {
    U: [0, 1],
    D: [0, -1],
    L: [-1, 0],
    R: [1, 0],
  };

  const [dx, dy] = dv[d];
  const steps = parseInt(s);

  [...Array(steps).keys()].map(() => {
    hx += dx;
    hy += dy;
    if (Math.abs(hx - tx) > 1 || Math.abs(hy - ty) > 1) {
      tx += hx != tx ? (hx > tx ? 1 : -1) : 0;
      ty += hy != ty ? (hy > ty ? 1 : -1) : 0;
    }
    visited.add([tx, ty].toString());
  });
});

console.log(visited.size);
