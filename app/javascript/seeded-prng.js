const floor = Math.floor;

const makePrng = function(seed) {
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
      currentValue = result;
      yield result;
    }
  };
};

const makeGetNumber = function(seed) {
  let prng;
  return function getNumber() {
    if (!prng) {
      prng = makePrng(seed)();
    }
    return prng.next().value;
  };
};

let getNumberForSeed121 = makeGetNumber(121);
let getNumberForSeed512 = makeGetNumber(512);

console.debug("begin getting numbers for seed 121");
for (let x = 0; x < 10; x++) {
  //log(getNumberForSeed121());
}

console.debug("begin getting numbers for seed 512");
for (let x = 0; x < 10; x++) {
  //log(getNumberForSeed512());
}

function log(message) {
  const messageNode = document.createTextNode(message);
  const p = document.createElement("p");
  p.appendChild(messageNode);
  document.body.appendChild(p);
}

export default makeGetNumber;
