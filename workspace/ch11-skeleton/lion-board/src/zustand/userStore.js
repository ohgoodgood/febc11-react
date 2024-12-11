import { create } from "zustand";
// `persist` 미들웨어: 상태 정보를 메모리(새로고침하면 다 날아감)가 아닌 스토리지에 저장해주는 기능 - zustand에서 제공됨
import { persist, createJSONStorage } from "zustand/middleware";

// store 생성
// zustand 내부의 create 함수가 실행됨 -> UserStore가 호출됨 -> set, get, subscribe 함수 등을 생성하여 UserStore에 인자로 전달함 -> UserStore 내부에서 해당 함수들 사용하여 상태 업데이트 가능
const UserStore = (set) => ({
  user: null,
  setUser: (user) => set({ user }),
  resetUser: () => set({ user: null }),
});

// storage를 사용하지 않는 경우
// const useUserStore = create(UserStore);

// storage를 사용하는 경우
const useUserStore = create(
  persist(UserStore, {
    name: "user",
    storage: createJSONStorage(() => sessionStorage),
  })
);

// storage를 사용하는 경우 (하나로 통합된 방식)

// const useUserStore = create(
//   persist(
//     // 기존 store 함수 (UserStore)
//     (set) => ({
//       user: null, // 상태 관리 대상, 초기값(로그아웃 상태)
//       setUser: (user) => set({ user }), // 상태 수정
//       resetUser: () => set({ user: null }), // 상태 리셋
//     }),

//     // 스토리지 저장 옵션
//     {
//       name: "user",
//       storage: createJSONStorage(() => sessionStorage), // createJSONStorage()의 기본값은 localStorage
//     }
//   )
// );

export default useUserStore;
