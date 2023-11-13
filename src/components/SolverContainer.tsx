import { useCallback, useState } from "react";
import Ring from "./Ring"
import { solver } from "../utils/solver";

const defaultRing: number[] = Array(32).fill(0);
const lockSelect = Array.from({ length: 3 }, (value, index) => index + 2);
const keySelect = Array.from({ length: 9 }, (value, index) => index + 4);
const defaultLock: number[][] = Array(2).fill(defaultRing);
const defaultKey: number[][] = Array(4).fill(defaultRing);

const testLocks = [
  [1, 3, 5, 11, 27, 29, 31],
  [7, 23, 25, 27],
  [3, 9, 13, 21, 31],
  [7, 15, 19, 21, 25]
];

const testKeys = [
  [1],
  [1, 9, 13, 19],
  [1],
  [1, 3],
  [1, 9, 19],
  [1, 9, 19],
  [1],
  [1, 5, 9, 21],
  [1, 5, 9, 17],
  [1, 17],
  [1, 7],
  [1, 5, 9]
];

const SolverContainer = () => {
  const [lockRingAmount, setLockRingAmount] = useState<number>(2);
  const [lockRings, setLockRings] = useState<number[][]>(defaultLock);
  const [keyRingAmount, setKeyRingAmount] = useState<number>(4);
  const [keyRings, setKeyRings] = useState<number[][]>(defaultKey);

  const updateRingAmount = useCallback((newAmount: number, isLockRing = false) => {
    const newRings = isLockRing ? [...lockRings] : [...keyRings];
    const currentAmount = isLockRing ? lockRingAmount : keyRingAmount;

    if (newAmount < currentAmount) {
      newRings.splice(newAmount);
    } else if (newAmount > currentAmount) {
      const ringsToAdd = Array(newAmount - currentAmount).fill(defaultRing);
      newRings.push(...ringsToAdd);
    }

    if (isLockRing) {
      setLockRings(newRings);
      setLockRingAmount(newAmount);
    } else {
      setKeyRings(newRings);
      setKeyRingAmount(newAmount);
    }
  }, [lockRings, lockRingAmount, keyRings, keyRingAmount]);

  const onSliceClick = useCallback((isLockRing: boolean, ringId: number, sliceId: number) => {
    const newRings = isLockRing ? [...lockRings] : [...keyRings];
    const newRing = [...newRings[ringId]];
    newRing[sliceId] = newRing[sliceId] === 1 ? 0 : 1;
    newRings[ringId] = newRing;

    if (isLockRing) {
      setLockRings(newRings);
    } else {
      setKeyRings(newRings);
    }
  }, [keyRings, lockRings]);

  const onSolveClick = useCallback(() => {
    solver(keyRings, lockRings);
  }, [keyRings, lockRings]);

  return (
    <div>
      <div>
        <div>
          <select name="lockSelect" onChange={(e) => updateRingAmount(parseInt(e.target.value), true)} value={lockRingAmount}>
            {lockSelect.map(val => <option key={`lockSelect-${val}`} value={val}>{val}</option>)}
          </select>
        </div>
        <div>
          {lockRings.map((ring, ringId) => <Ring key={`lockRing-${ringId}`} id={ringId} ring={ring} onSliceClick={onSliceClick} isLockRing={true} />)}
        </div>
      </div>

      <div>
        <div>
          <select name="keySelect" onChange={(e) => updateRingAmount(parseInt(e.target.value))} value={keyRingAmount}>
            {keySelect.map((val) => <option key={`keySelect-${val}`} value={val}>{val}</option>)}
          </select>
        </div>
        <div>
          {keyRings.map((ring, ringId) => <Ring key={`keyRing-${ringId}`} id={ringId} ring={ring} onSliceClick={onSliceClick} />)}
        </div>
      </div>

      <div>
        <button onClick={onSolveClick}>Solve</button>
      </div>
    </div>
  );
};

export default SolverContainer;
