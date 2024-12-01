import { useSetAtom } from "jotai";
import { useEffect } from "react";
import { setCounter } from "@jotai/atoms";

function Right3() {
  useEffect(() => {
    console.log("      # Right3 렌더링.");
  });

  // 상태 변경 함수 구독
  const setCount = useSetAtom(setCounter);

  return (
    <div>
      <h3>Right3</h3>
      <button
        onClick={() => {
          setCount((prev) => prev - 1);
        }}
      >
        -1
      </button>

      <button
        onClick={() => {
          setCount(0);
        }}
      >
        reset
      </button>

      <button
        onClick={() => {
          setCount((prev) => prev + 1);
        }}
      >
        +1
      </button>
    </div>
  );
}

export default Right3;
