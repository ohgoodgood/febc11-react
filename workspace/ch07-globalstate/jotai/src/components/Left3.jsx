import { useAtom } from "jotai";
import { useEffect } from "react";
import { counterValue } from "@jotai/atoms";

function Left3() {
  useEffect(() => {
    console.log("      # Left3 렌더링.");
  });

  // 상태 값 읽기 (구독)
  const [count] = useAtom(counterValue);

  return (
    <div>
      <h3>Left3</h3>
      <span>{count}</span>
    </div>
  );
}

export default Left3;
