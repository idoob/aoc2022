import * as p from "https://deno.land/std@0.165.0/path/mod.ts";
const input = await Deno.readTextFile(
  p.fromFileUrl(import.meta.resolve("./input.txt"))
);

const groups = input.split(/\n\n/);

interface monkeyAttributes {
  items: number[];
  operation: (n: number) => number;
  test: (n: number) => number;
  inspected: number;
  testNumber: number;
}

const buildOperation = (operation: string, n: number) => {
  if (operation == "*") {
    return isNaN(n)
      ? (x: number) => {
          return x * x;
        }
      : (x: number) => {
          return n * x;
        };
  } else {
    return isNaN(n)
      ? (x: number) => {
          return x + x;
        }
      : (x: number) => {
          return n + x;
        };
  }
};

const buildTest = (n: number, t: number, f: number) => {
  return (x: number) => {
    return x % n == 0 ? t : f;
  };
};

const monkeys: { [monkey: number]: monkeyAttributes } = {};

let commonMultiple = 1;

groups.forEach((item) => {
  const lines = item.split(/\n/);

  const id = parseInt(lines[0].split(" ")[1].split("")[0]);
  const items = lines[1]
    .split(": ")[1]
    .split(",")
    .map((n: string) => parseInt(n));

  const operationString = lines[2].split("=")[1].split(" ");
  const operation = buildOperation(
    operationString[2],
    parseInt(operationString[3])
  );

  const testDiv = parseInt(lines[3].split(" ")[5]);
  const t = parseInt(lines[4].split(" ")[9]);
  const f = parseInt(lines[5].split(" ")[9]);

  const test = buildTest(testDiv, t, f);

  monkeys[id] = {
    items: items,
    operation: operation,
    test,
    inspected: 0,
    testNumber: testDiv,
  };
});

for (let monkey = 0; monkey < Object.keys(monkeys).length; monkey++) {
  commonMultiple *= monkeys[monkey].testNumber;
}

const rounds = 10000;
for (let round = 0; round < rounds; round++) {
  for (let monkey = 0; monkey < Object.keys(monkeys).length; monkey++) {
    const cm = monkeys[monkey];
    cm.items.forEach((item) => {
      let nwl = cm.operation(item);
      nwl %= commonMultiple;
      const nm = cm.test(nwl);
      monkeys[nm].items.push(nwl);
      cm.inspected += 1;
    });
    cm.items = [];
  }
}

const ins = [];
for (let monkey = 0; monkey < Object.keys(monkeys).length; monkey++) {
  ins.push(monkeys[monkey].inspected);
}

ins.sort((a, b) => {
  return b - a;
});

console.log(ins[0] * ins[1]);
