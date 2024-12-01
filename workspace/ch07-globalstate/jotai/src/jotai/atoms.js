import { atom } from "jotai";

// 상태 값 atom
export const counterValue = atom(0);

// 상태 변경 atom (쓰기 전용)
export const setCounter = atom(null, (get, set, update) => {
  const currentValue = get(counterValue); // 현재 상태값 가져오기
  // 상태 업데이트
  set(
    counterValue,
    typeof update === "function" ? update(currentValue) : update
  );
});
