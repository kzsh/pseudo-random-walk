const floor = Math.floor;

const makePrng = (seed: number) => {
  return function*() {
    let currentValue = seed;
    let length = String(seed).length;
    let start = 0;
    while (true) {
      let seedSquare = currentValue * currentValue;
      let middle = floor(String(seedSquare).length / 2);
      let start = middle - floor(length / 2);
      let end = start + length;
      //console.debug(seedSquare, middle, start, end);
      let result = String(seedSquare).substring(start, end);
      currentValue = +result;
      yield result;
    }
  };
};

export const makeGetNumber = (seed: number) => {
  let prng = makePrng(seed)();
  return () => +prng.next().value;
};
