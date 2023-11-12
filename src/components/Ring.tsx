import { useMemo } from "react";

interface RingProps {
  id: number;
  ring: number[];
  onSliceClick: (isLockRing: boolean, ringId: number, sliceId: number) => void;
  isLockRing?: boolean;
}

const Ring = ({ id, ring, onSliceClick, isLockRing = false }: RingProps) => {
  return (
    <div>
      <table>
        <tbody>
          <tr>
            {ring.map((slice, i) => {
              return (
                <td
                  key={`${isLockRing ? "lockRing" : "keyRing"}-${id}-${i}`}
                  style={{ height: 30, width: 30, backgroundColor: "#1e8de3", color: "black", cursor: "pointer" }}
                  onClick={() => onSliceClick(isLockRing, id, i)}
                >
                  {slice === 1 ? "x" : ""}
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Ring;
