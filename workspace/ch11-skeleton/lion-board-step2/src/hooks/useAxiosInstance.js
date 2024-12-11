import useUserStore from "@zustand/userStore";
import axios from "axios";

function useAxiosInstance() {
  const { user } = useUserStore();

  const instance = axios.create({
    baseURL: "https://11.fesp.shop",
    timeout: 1000 * 15,
    headers: {
      "Content-Type": "application/json", // request의 데이터 타입
      accept: "application/json", // response의 데이터 타입
      "client-id": "00-board",
    },
  });

  // 요청 인터셉터 추가하기
  instance.interceptors.request.use((config) => {
    // 요청이 전달되기 전에 필요한 공통 작업 수행

    // 유저 정보가 있다면(로그인 되어 있다면) 해당 유저의 액세스토큰을 헤더로 전달
    if (user) {
      config.headers["Authorization"] = `Bearer ${user.accessToken}`;
    }

    config.params = {
      delay: 500,
      ...config.params, // 기존 쿼리스트링 복사
    };

    return config;
  });

  // 응답 인터셉터 추가하기
  instance.interceptors.response.use(
    (response) => {
      // 2xx 범위에 있는 상태 코드는 이 함수가 호출됨
      // 응답 데이터를 이용해서 필요한 공통 작업 수행

      return response;
    },
    (error) => {
      // 2xx 외의 범위에 있는 상태 코드는 이 함수가 호출됨
      // 공통 에러 처리
      console.error("interceptor: ", error);

      return Promise.reject(error);
    }
  );

  return instance;
}

export default useAxiosInstance;
