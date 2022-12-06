import * as p from "https://deno.land/std@0.165.0/path/mod.ts";
// @deno-types="https://cdn.skypack.dev/@types/lodash?dts"
import { range } from "https://cdn.skypack.dev/lodash-es";

const input = await Deno.readTextFile(
  p.fromFileUrl(import.meta.resolve("./input.txt"))
);

const sm: { [name: number]: string[] } = {
  0: [],
  1: [],
  2: [],
  3: [],
  4: [],
  5: [],
  6: [],
  7: [],
  8: [],
};

function transform() {
  const block = `!!!!!Q!PP\n!!!!GVSZF\n!!!WVFZWQ\n!!VTNJWBW\n!ZLVBCRNM\nCWRHHPTMB\nQQMZZNGGJ\nBRBCDHDCN\n`;

  const rows: string[][] = block.split("\n").map((r) => r.split(""));

  for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < rows[0].length; j++) {
      if (rows[i][j] && rows[i][j] != "!") sm[j].unshift(rows[i][j]);
    }
  }
}

const lines = input.split(/\n/);
const cut = lines.indexOf("");
const mvs = lines.slice(cut + 1).map((x) =>
  x
    .split(" ")
    .filter((x) => !isNaN(parseInt(x)))
    .map((x) => parseInt(x))
);

transform();

mvs.map((move) => {
  const [amount, from, to] = move;
  const crane = [];

  for (let i = 0; i < amount; i++) {
    if (sm[from - 1].length > 0) {
      crane.unshift(sm[from - 1].pop()!);
    }
  }
  sm[to - 1].push(...crane);
});

const top = "".concat(...range(9).map((index) => sm[index].at(-1)!));
console.log("".concat(...top));
