import InputError from "@components/InputError";
import useAxiosInstance from "@hooks/useAxiosInstance";
import { useMutation } from "@tanstack/react-query";
import useUserStore from "@zustand/userStore";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Login() {
  // `useUserStore`는 Zustand의 `create` 함수로 생성된 사용자 상태 저장소(storage)
  // `create` 함수 내부에서 정의된 `set` 메서드는 상태를 업데이트하는 역할
  // `store => store.setUser`는 상태 저장소의 `setUser` 메서드에 접근하는 콜백
  // 최종적으로, `useUserStore`에서 추출한 `setUser`를 현재 문서에서의 `setUser` 변수에 할당
  const setUser = useUserStore((store) => store.setUser);

  const location = useLocation();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    // 테스트를 위해 기본값 세팅
    defaultValues: {
      email: "guri@guri.com",
      password: "guriguri",
    },
  });

  const axios = useAxiosInstance();

  const login = useMutation({
    mutationFn: (formData) => axios.post("/users/login", formData),
    onSuccess: (res) => {
      console.log(res);

      // 회원 정보 저장 (zustand)
      const user = res.data.item;

      setUser({
        _id: user._id,
        name: user.name,
        image: user.image?.path,
        accessToken: user.token.accessToken,
        refreshToken: user.token.refreshToken,
      });

      alert(`${res.data.item.name}님, 반갑습니다.`);
      navigate(location.state?.from || "/");
    },
    onError: (err) => {
      console.error(err);
      if (err.response?.data.errors) {
        err.response?.data.errors.forEach((error) =>
          setError(error.path, { message: error.msg })
        );
      } else {
        alert(err.response?.data.message || "잠시 후 다시 요청해주세요.");
      }
    },
  });

  return (
    <>
      <Helmet>
        <title>로그인 - 멋사컴</title>

        <meta
          name="description"
          content="다양한 주제의 커뮤니티와 활발한 소통을 위한 플랫폼입니다. 관심사에 따라 참여하고, 의견을 나누세요."
        />
        <meta
          name="keywords"
          content="커뮤니티, 소통, 포럼, 관심사, 온라인 모임, 커뮤니티 서비스"
        />
        <meta name="author" content="Front End Boot Camp" />

        <meta property="og:title" content="로그인" />
        <meta property="og:description" content="로그인 페이지" />
        <meta property="og:image" content="/images/febc.png" />
        <meta property="og:url" content="https://11.fesp.shop" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="멋사컴" />
      </Helmet>
      <main className="min-w-80 flex-grow flex items-center justify-center">
        <div className="p-8 border border-gray-200 rounded-lg w-full max-w-md dark:bg-gray-600 dark:border-0">
          <div className="text-center py-4">
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
              로그인
            </h2>
          </div>

          <form onSubmit={handleSubmit(login.mutate)}>
            <div className="mb-4">
              <label
                className="block text-gray-700 dark:text-gray-200 mb-2"
                htmlFor="email"
              >
                이메일
              </label>
              <input
                id="email"
                type="email"
                placeholder="이메일을 입력하세요"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
                {...register("email", { required: "이메일은 필수입니다." })}
              />
              <InputError target={errors.email} />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 dark:text-gray-200 mb-2"
                htmlFor="password"
              >
                비밀번호
              </label>
              <input
                id="password"
                type="password"
                placeholder="비밀번호를 입력하세요"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
                {...register("password", {
                  required: "비밀번호는 필수입니다.",
                })}
              />
              <InputError target={errors.password} />
              <Link
                to="#"
                className="block mt-6 ml-auto text-gray-500 text-sm dark:text-gray-300 hover:underline"
              >
                비밀번호를 잊으셨나요?
              </Link>
            </div>
            <div className="mt-10 flex justify-center items-center">
              <button
                type="submit"
                className="bg-orange-500 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded"
              >
                로그인
              </button>
              <Link
                to="/users/signup"
                className="ml-8 text-gray-800 hover:underline"
              >
                회원가입
              </Link>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
