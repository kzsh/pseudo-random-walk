export const MAX_UINT32 = 4294967295;
export const TRACKED_STEPS = 100;
export const cryptoPRNGContainer = new Uint32Array(1);
export const SEED = 12345123;
export const SEED_LENGTH = String(SEED).length;
export const MAX_SEED = (function() {
  var max = "";
  for (let i = 0; i < SEED_LENGTH; i++) {
    max += "9";
  }

  return +max;
})();
