import axios from "axios";
import { toast } from "react-toastify";

function useAxiosInstance() {
  const instance = axios.create({
    baseURL: "https://11.fesp.shop",
    timeout: 5000,
    headers: {
      "Content-Type": "application/json", // request의 데이터 타입
      accept: "application/json", // response의 데이터 타입
      "client-id": "00-nike",
    },
  });

  // 요청 인터셉터 추가하기
  instance.interceptors.request.use((config) => {
    // 요청이 전달되기 전에 필요한 공통 작업 수행
    console.log("interceptor: ", config);
    config.params = {
      delay: 2000,
      ...config.params, // 기존 쿼리스트링 복사
    };

    return config;
  });

  // 응답 인터셉터 추가하기
  instance.interceptors.response.use(
    (response) => {
      // 2xx 범위에 있는 상태 코드는 이 함수가 호출됨
      // 응답 데이터를 이용해서 필요한 공통 작업 수행
      if (response.data?.ok !== undefined) {
        // 0 또는 1 반환됨
        response.data.ok = !!response.data.ok; // 0 또는 1을 boolean으로 변환
      }

      console.log("interceptor: ", response);

      return response;
    },
    (error) => {
      // 2xx 외의 범위에 있는 상태 코드는 이 함수가 호출됨
      // 공통 에러 처리

      console.error("interceptor: ", error);
      const message = "잠시 후 다시 요청해주세요.";
      // alert(message);
      // error.message = message;
      toast.error(message);

      return Promise.reject(error);
    }
  );

  return instance;
}

export default useAxiosInstance;
