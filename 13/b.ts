import * as p from "https://deno.land/std@0.165.0/path/mod.ts";

const input = await Deno.readTextFile(
  p.fromFileUrl(import.meta.resolve("./input.txt"))
);

const lines = input.split(/\s+/).map((l) => JSON.parse(l));
lines.push([[2]], [[6]]);

const compareNumber = (l: number, r: number): -1 | 0 | 1 => {
  if (l < r) {
    return -1;
  } else if (l == r) {
    return 0;
  } else {
    return 1;
  }
};

const compareList = (
  l: unknown[] | number,
  r: unknown[] | number
): -1 | 0 | 1 => {
  if (!Array.isArray(l) && !Array.isArray(r)) {
    return compareNumber(l, r);
  } else if (!Array.isArray(l)) {
    return compareList([l], r);
  } else if (!Array.isArray(r)) {
    return compareList(l, [r]);
  } else {
    const ll = l.length;
    const rl = r.length;

    for (let i = 0; i < ll && i < rl; i++) {
      const cur = compareList(l[i], r[i]);
      if (cur != 0) return cur;
    }

    if (ll == rl) {
      return 0;
    } else {
      return ll < rl ? -1 : 1;
    }
  }
};

lines.sort(compareList);

console.log(
  (lines.findIndex((x) => JSON.stringify(x) == JSON.stringify([[2]])) + 1) *
    (lines.findIndex((x) => JSON.stringify(x) == JSON.stringify([[6]])) + 1)
);
