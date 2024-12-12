import InputError from "@components/InputError";
import useAxiosInstance from "@hooks/useAxiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError, // 서버로부터 받은 에러 메시지를 특정 필드에 매핑
  } = useForm();

  const axios = useAxiosInstance();

  const addUser = useMutation({
    mutationFn: async (userInfo) => {
      // 파일 업로드 (여기서는 프로필 이미지 업로드. 회원가입 시에 사용자가 이미지를 첨부했다면)
      if (userInfo.attach.length > 0) {
        // 파일을 `FormData` 객체로 감싸고, API에 POST 요청을 통해 업로드
        const imageFormData = new FormData();
        imageFormData.append("attach", userInfo.attach[0]);

        const fileRes = await axios("/files", {
          method: "post",
          headers: {
            // 텍스트가 아니라 파일 업로드이므로 헤더에서 설정 변경
            "Content-type": "multipart/form-data",
          },
          data: imageFormData,
        });

        // 클라이언트가 파일 데이터를 서버로 전송하면, 서버는 지정된 경로(클라우드 스토리지, 서버의 파일 시스템 등)에 파일을 저장하고, 저장된 파일에 접근 가능한 URL을 생성하여 클라이언트에게 반환한다.

        // 그렇게 받은 이미지 URL을 `userInfo.image`에 저장하고, 더 이상 필요 없는 `userInfo.attach`는 삭제
        userInfo.image = fileRes.data.item[0]; // 반환된 데이터에서 첫번째 url
        delete userInfo.attach; // 업로드했던 로컬 파일 객체 삭제
      }

      // `userInfo` 객체에 `type: "user"`를 추가
      userInfo.type = "user";

      console.log(userInfo);
      // API에 POST 요청을 보내 최종적으로 회원가입 데이터 전송
      return axios.post(`/users`, userInfo);
    },
    onSuccess: () => {
      alert("회원가입이 완료되었습니다.");
      navigate(`/`);
    },
    onError: (err) => {
      console.error(err);
      if (err.response?.data.errors) {
        // forEach 구문과 setError 구문으로 각각의 필드에 에러 메시지 출력
        // 여기서 error.path는 에러가 발생한 필드를 지칭
        // 서버로부터 전송된 error.msg를 해당 필드의 error 객체 안의 message로 지정
        err.response?.data.errors.forEach((error) =>
          setError(error.path, { message: error.msg })
        );
      } else {
        alert(err.response?.data.message || "잠시 후 다시 요청해주세요.");
      }
    },
  });

  return (
    <main className="min-w-80 flex-grow flex items-center justify-center">
      <div className="p-8 border border-gray-200 rounded-lg w-full max-w-md dark:bg-gray-600 dark:border-0">
        <div className="text-center py-4">
          <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200">
            회원 가입
          </h2>
        </div>

        <form onSubmit={handleSubmit(addUser.mutate)}>
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-200 mb-2"
              htmlFor="name"
            >
              이름
            </label>
            <input
              type="text"
              id="name"
              placeholder="이름을 입력하세요"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
              {...register("name", { required: "이름은 필수입니다." })}
            />
            <InputError target={errors.name} />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-200 mb-2"
              htmlFor="email"
            >
              이메일
            </label>
            <input
              type="email"
              id="email"
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
              type="password"
              id="password"
              placeholder="비밀번호를 입력하세요"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
              {...register("password", { required: "비밀번호는 필수입니다." })}
            />
            <InputError target={errors.password} />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-200 mb-2"
              htmlFor="attach"
            >
              프로필 이미지
            </label>
            <input
              type="file"
              id="attach"
              accept="image/*"
              placeholder="이미지를 선택하세요"
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700"
              {...register("attach")}
            />
          </div>

          <div className="mt-10 flex justify-center items-center">
            <button
              type="submit"
              className="bg-orange-500 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded"
            >
              회원가입
            </button>
            <Link
              to="/"
              className="bg-gray-900 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded"
            >
              취소
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
