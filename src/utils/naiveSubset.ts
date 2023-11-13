/**
 * The recursive step for the subset calculation.
 * 
 * @param keySizes The array to get subsets from.
 * @param res The resulting array which holds all subsets.
 * @param subset The current subset.
 * @param index The current index.
 * 
 * @see https://www.geeksforgeeks.org/backtracking-to-find-all-subsets/
 */
const calcSubset = (keySizes: number[], res: number[][], subset: number[], index: number) => {
    // keySizesdd the current subset to the result list
    res.push([...subset]);
 
    // Generate subsets by recursively including and excluding elements
    for (let i = index; i < keySizes.length; i++) {
        // Include the current element in the subset
        subset.push(keySizes[i]);
 
        // Recursively generate subsets with the current element included
        calcSubset(keySizes, res, subset, i + 1);
 
        // Exclude the current element from the subset (backtracking)
        subset.pop();
    }
}

/**
 * Calculate all possible subsets for an array.
 * 
 * @param keySizes The array to get subsets from.
 * 
 * @returns An array containing arrays which are subsets.
 * @see https://www.geeksforgeeks.org/backtracking-to-find-all-subsets/
 */
const subsets = (keySizes: number[]) => {
    const subset: number[] = [];
    const res: number[][] = [];
    let index = 0;
    calcSubset(keySizes, res, subset, index);
    return res;
}

/**
 * Naively calculate all unique subsets for this lock that is possible by amount. This means
 * that each subset is a set of key indexes.The sum of all hatches on the keys in these
 * indexes will be equal to the number of slots for this key.
 *
 * Example: A set of keys with the amount of hatches { 1, 5, 2, 4 } has the following possible
 *          subsets for a lock with 5 slots: { 1, 4 }, { 5 }. The positions for these are
 *          [ 0, 3 ] and [ 1 ], which is what would be returned in this example.
 * 
 * @param keySizes The array of keySizes to test.
 * @param lockSize The amount of slots in the lock currently tested
 * 
 * @returns An array containing arrays of numbers
 */
export const naiveSubset = (keySizes: number[], lockSize: number) => {
  const start = Array.from(Array(keySizes.length).keys());
  const allSubsets = subsets(start);
  const validSubsets: number[][] = [];

  allSubsets.forEach(subset => {
    let sum = 0;

    subset.forEach(i => {
      sum = sum + keySizes[i];
    })

    if (sum === lockSize) {
      validSubsets.push(subset);
    }
  });

  return validSubsets;
}
