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
    // 요청이 전달되기 전에 필요한 공통 작업 수행

    // 유저 정보가 있다면(로그인 되어 있다면) 해당 유저의 액세스토큰을 헤더로 전달
    if (user) {
      let token = user.accessToken;
      if (config.url === REFRESH_URL) {
        token = user.refreshToken;
      }
      config.headers["Authorization"] = `Bearer ${token}`;
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
          const gotoLogin = confirm(
            "로그인 후에 이용해주세요.\n로그인 페이지로 이동하시겠습니까?"
          );
          gotoLogin &&
            navigate("/users/login", { state: { from: location.pathname } });
          // 원래 가려던 페이지의 정보를 state 객체로 전달. 로그인 후에 원래대로 이동할 수 있도록 (아직 추가 작업 필요)
        } else {
          // 리프레시 유알엘이 아닌 주소에서 에러가 반환된 경우, 즉 액세스토큰이 없거나 만료된 경우
          // 리프레시토큰으로 액세스토큰 재발급 요청
          const accessToken = await getAccessToken(instance);
          if (accessToken) {
            // 기존 요청을 갱신된 액세스토큰과 함께 다시 전송, 그 결과를 return
            config.headers.Authorization = `Bearer ${accessToken}`;
            return axios(config);
          }
        }
      } else {
        return Promise.reject(error);
      }
    }
  );

  // accessToken 재발급 코드
  async function getAccessToken(instance) {
    try {
      const {
        data: { accessToken },
      } = await instance.get(REFRESH_URL);
      setUser({ ...user, accessToken });
      return accessToken;
    } catch (err) {
      console.error(err);
    }
  }

  return instance;
}

export default useAxiosInstance;
