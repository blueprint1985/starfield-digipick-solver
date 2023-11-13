import { naiveSubset } from "./naiveSubset";

/**
 * Gets the number of hatches/slots in for each key/lock ring in an array of keys/lock rings.
 * 
 * @param input An array of keys/lock rings
 * 
 * @returns An array containing the number of hatches/slots in each key/lock ring provided.
 */
const calculateSizes = (input: number[][]) => {
  return [...input].map(i => {
    return i.reduce((acc, next) => acc + next, 0);
  });
}

/**
 * The main puzzle solver.
 * 
 * @param keys All provided keys.
 * @param locks All provided locks.
 */
export const solver = (keys: number[][], locks: number[][]) => {
  const lockSizes = calculateSizes(locks);
  const keySizes = calculateSizes(keys);

  lockSizes.forEach((ls, i) => {
    // Get all valid subsets (by key array position 0-N) of keys by length only.
    const validSubsets = naiveSubset(keySizes, ls);

    // The above possible subset still not tell us whether the keys in each subset actually fits. This is still TODO.
  });
};
