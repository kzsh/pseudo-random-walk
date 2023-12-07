import {MAX_SEED, MAX_UINT32, SEED, cryptoPRNGContainer} from '../constants';
import {makeGetNumber} from "../utils/seeded-prng";
import {PrngLibType} from '../types'

const getNumForSeed = makeGetNumber(SEED);
export function randomDeviation({ prngLib }: {prngLib?: PrngLibType} = {}) {
  let prn;

  if (prngLib === "crypto") {
    window.crypto.getRandomValues(cryptoPRNGContainer);
    prn = cryptoPRNGContainer[0] / MAX_UINT32;
  } else if (prngLib === "random") {
    prn = Math.random();
  } else {
    prn = getNumForSeed() / MAX_SEED;
  }

  return prn > 0.5 ? 1 : -1;
}
