import { create } from "zustand";
// 상태 정보를 메모리(새로고침하면 다 날아감)가 아닌 스토리지에 저장해주는 기능 - zustand에서 제공됨
import { persist, createJSONStorage } from "zustand/middleware";

const useUserStore = create(
  persist(
    // 기존 store 함수
    (set) => ({
      user: null, // 상태 관리 대상, 초기값(로그아웃 상태)
      setUser: (user) => set({ user }), // 상태 수정
      resetUser: () => set({ user: null }), // 상태 리셋
    }),

    // 스토리지 저장 옵션
    {
      name: "user",
      storage: createJSONStorage(() => sessionStorage), // createJSONStorage()의 기본값은 localStorage
    }
  )
);

export default useUserStore;
