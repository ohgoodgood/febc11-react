import { Helmet } from "react-helmet-async";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  const errorStatus = error?.status || "알 수 없음";
  const errorMessage =
    errorStatus === 404
      ? "존재하지 않는 페이지입니다."
      : "예상치 못한 오류가 발생했습니다.";

  return (
    <>
      <Helmet>
        <title>멋쟁이 사자처럼 게시판 - 멋사컴</title>

        <meta
          name="description"
          content="다양한 주제의 커뮤니티와 활발한 소통을 위한 플랫폼입니다. 관심사에 따라 참여하고, 의견을 나누세요."
        />
        <meta
          name="keywords"
          content="커뮤니티, 소통, 포럼, 관심사, 온라인 모임, 커뮤니티 서비스"
        />
        <meta name="author" content="Front End Boot Camp" />

        <meta property="og:title" content="멋사컴에 오신걸 환영합니다." />
        <meta
          property="og:description"
          content="유용한 정보를 나누고 공유하세요."
        />
        <meta property="og:image" content="/images/febc.png" />
        <meta property="og:url" content="https://board.fesp.shop" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="멋사컴" />

        <script src="https://cdn.tailwindcss.com"></script>
      </Helmet>
      <div className="py-20 bg-red-100 border border-red-400 text-red-700 p-4 rounded-lg flex flex-col items-center space-y-2">
        <h2 className="text-xl font-semibold mb-2 text-center">
          🚧 앗, 무언가 잘못됐네요!
        </h2>
        <h3 className="text-md font-semibold mb-2 text-center">
          {errorMessage}
        </h3>
        <p className="pt-12 text-center">
          이 오류는 더 나은 서비스를 위한 첫걸음이에요. 조금만 기다려 주세요!
        </p>
        <button className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600">
          ⚙️ 다시 시도
        </button>
      </div>
    </>
  );
}
