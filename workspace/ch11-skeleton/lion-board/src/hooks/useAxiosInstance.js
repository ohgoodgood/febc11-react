import useUserStore from "@zustand/userStore";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

// access token 재발급 url
const REFRESH_URL = "/auth/refresh";

function useAxiosInstance() {
  const { user, setUser } = useUserStore();

  const navigate = useNavigate();
  const location = useLocation();

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
    // 유저 정보가 있다면(로그인 되어 있다면) 해당 유저의 액세스토큰을 헤더로 전달
    // if (user) {
    //   let token = user.accessToken;
    //   if (config.url === REFRESH_URL) {
    //     token = user.refreshToken;
    //   }
    //   config.headers["Authorization"] = `Bearer ${token}`;
    // }

    // refresh 요청일 경우, Authorization 헤더는 이미 refresh token으로 지정되어 있음
    if (user && config.url !== REFRESH_URL) {
      config.headers.Authorization = `Bearer ${user.accessToken}`;
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
    async (error) => {
      // 2xx 외의 범위에 있는 상태 코드는 이 함수가 호출됨
      // 공통 에러 처리

      console.error("interceptor: ", error);

      const { config, response } = error;

      if (response?.status === 401) {
        // 인증 실패 (401)
        if (config.url === REFRESH_URL) {
          // 리프레시 유알엘로 보냈는데도 인증 실패, 즉 리프레시토큰까지 만료된 경우
          navigateLogin();
        } else if (user) {
          // 로그인 했으나 액세스토큰이 만료된 경우
          // 리프레시토큰으로 액세스토큰 재발급 요청
          const {
            data: { accessToken },
          } = await instance.get(REFRESH_URL, {
            headers: {
              Authorization: `Bearer ${user.refreshToken}`,
            },
          });
          setUser({ ...user, accessToken });

          // 기존 요청을 갱신된 액세스토큰과 함께 다시 전송, 그 결과를 return
          config.headers.Authorization = `Bearer ${accessToken}`;
          return axios(config);
        } else {
          // 로그인 안 되어 있는 경우
          navigateLogin();
        }
      }
      return Promise.reject(error);
    }
  );

  // 로그인 화면으로 이동
  function navigateLogin() {
    const gotoLogin = confirm(
      "로그인 후 이용 가능합니다.\n로그인 페이지로 이동하시겠습니까?"
    );
    gotoLogin &&
      navigate("/users/login", {
        // 원래 가려던 페이지의 정보를 state 객체로 전달. 로그인 후에 원래대로 이동할 수 있도록
        state: { form: location.pathname },
      });
  }

  return instance;
}

export default useAxiosInstance;
