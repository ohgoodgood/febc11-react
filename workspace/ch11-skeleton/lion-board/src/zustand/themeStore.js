import { create } from "zustand";
// 상태 정보를 메모리(새로고침하면 다 날아감)가 아닌 스토리지에 저장해주는 기능 - zustand에서 제공됨
import { persist, createJSONStorage } from "zustand/middleware";

const useThemeStore = create(
  persist(
    // 기존 store 함수
    (set) => ({
      // isDarkMode: false, // 상태 관리 대상. 초기값: 라이트모드
      isDarkMode: window.matchMedia("(prefers-color-scheme: dark)").matches
        ? true
        : false, // 상태 관리 대상. 초기값: 시스템 세팅에 따라
      toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })), // 상태 수정
    }),

    // 스토리지 저장 옵션
    {
      name: "themeStore",
      // createJSONStorage()의 기본값은 localStorage
    }
  )
);

export default useThemeStore;
