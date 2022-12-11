import * as p from "https://deno.land/std@0.165.0/path/mod.ts";
const input = await Deno.readTextFile(
  p.fromFileUrl(import.meta.resolve("./input.txt"))
);

const lines = input.split(/\n/);

const results: number[] = [];
const pix: string[] = [];
let x = 1;
let cycle = 0;

const draw = () => {
  if (cycle % 40 >= x - 1 && cycle % 40 <= x + 1) {
    pix.push("#");
  } else {
    pix.push(".");
  }
};

const addSignal = () => {
  if (cycle == 20 || (cycle >= 60 && (cycle - 20) % 40 == 0)) {
    results.push(cycle * x);
  }
};

for (let i = 0; i < lines.length; i++) {
  const cur = lines[i].split(" ");

  if (cur[0] == "noop") {
    draw();
    cycle += 1;
    addSignal();
  }
  // is add 
  else {
    for (let r = 2; r > 0; r--) {
      draw();
      cycle += 1;
      addSignal();
    }
    x += parseInt(cur[1]);
  }
}

for (let j = 0; j < pix.length; j += 40) {
  console.log(pix.slice(j, j + 40).join(""));
}
