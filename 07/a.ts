import * as p from "https://deno.land/std@0.165.0/path/mod.ts";
const input = await Deno.readTextFile(
  p.fromFileUrl(import.meta.resolve("./input.txt"))
);

let path: string[] = [];
const paths: { [p: string]: number } = {};
const dirs = new Set<string>();

const lines = input.split(/\n/);

lines.forEach((line) => {
  dirs.add(path.join("/"));
  if (line.startsWith("$")) {
    if (line.startsWith("$ cd")) {
      const d = line.slice(5);
      if (d == ".." && path.length > 0) {
        path.pop();
      } else if (d == "/") {
        path = [];
      } else {
        path = path.concat(d.split("/"));
      }
    }
  } else {
    const [sizeOrDir, file] = line.split(" ");
    if (sizeOrDir == "dir") return;
    else {
      paths[[...path, file].join("/")] = parseInt(sizeOrDir);
    }
  }
});

let sum = 0;
dirs.forEach((dir) => {
  let curDirSize = 0;
  for (const [curPath, curPathSize] of Object.entries(paths)) {
    if (curPath.startsWith(dir)) {
      curDirSize += curPathSize;
    }
  }
  if (curDirSize <= 100000) {
    sum += curDirSize;
  }
});

console.log(sum);
