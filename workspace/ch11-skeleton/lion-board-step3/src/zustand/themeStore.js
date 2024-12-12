import { create } from "zustand";
// 상태 정보를 메모리(새로고침하면 다 날아감)가 아닌 스토리지에 저장해주는 기능 - zustand에서 제공됨
import { persist } from "zustand/middleware";

const useThemeStore = create(
  persist(
    // 기존 store 함수
    (set) => ({
      isDarkMode: window.matchMedia("(prefers-color-scheme: dark)").matches
        ? true
        : false,
      toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
      // set 함수를 호출하는 두 가지 방식
      // 객체를 직접 전달: set({key: value})
      // 업데이트 함수를 전달: set((state) => ({key: value}))
      // 두 번째 방식에서, zustand가 현재 스토어에 저장된 상태(state)를 업데이트 함수의 인자로 전달함.
      // 따라서, 위 코드에서 state는 스토어에 저장된 모든 상태(isDarkMode 포함)의 최신 값을 포함함.
      // 업데이트 함수가 새로운 상태를 반환하면, zustand는 스토어를 업데이트하고 변경 사항을 구독 중인 컴포넌트에 알림.
    }),

    {
      name: "themeStore",
      // createJSONStorage()의 기본값은 localStorage
    }
  )
);

export default useThemeStore;
