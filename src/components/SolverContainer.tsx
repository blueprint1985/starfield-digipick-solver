import { useCallback, useState } from "react";
import Ring from "./Ring"

const defaultRing: number[] = Array(32).fill(0);
const lockSelect = Array.from({ length: 3 }, (value, index) => index + 2);
const keySelect = Array.from({ length: 9 }, (value, index) => index + 4);
const defaultLock: number[][] = Array(2).fill(defaultRing);
const defaultKey: number[][] = Array(4).fill(defaultRing);

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
    </div>
  );
};

export default SolverContainer;
