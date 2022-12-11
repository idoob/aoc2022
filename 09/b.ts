import * as p from "https://deno.land/std@0.165.0/path/mod.ts";

const input = await Deno.readTextFile(
  p.fromFileUrl(import.meta.resolve("./input.txt"))
);

const lines = input.split(/\n/);
const visited = new Set();
const knots = [...Array(10).keys()].map(() => [0, 0]);

const mvknot = (kx1: number, ky1: number, kx2: number, ky2: number) => {
  if (Math.abs(kx1 - kx2) > 1 || Math.abs(ky1 - ky2) > 1) {
    kx2 += kx1 != kx2 ? (kx1 > kx2 ? 1 : -1) : 0;
    ky2 += ky1 != ky2 ? (ky1 > ky2 ? 1 : -1) : 0;
  }
  return [
    [kx1, ky1],
    [kx2, ky2],
  ];
};

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
    const [hx, hy] = knots[0];
    knots[0] = [hx + dx, hy + dy];

    [...Array(10).keys()].slice(1).map((k) => {
      const updatedPair = mvknot(
        knots[k - 1][0],
        knots[k - 1][1],
        knots[k][0],
        knots[k][1]
      );
      knots[k - 1] = updatedPair[0];
      knots[k] = updatedPair[1];
    });
    visited.add(knots[9].toString());
  });
});

console.log(visited.size);
