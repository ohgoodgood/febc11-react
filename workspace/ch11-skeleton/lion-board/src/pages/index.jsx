import { Helmet } from "react-helmet-async";

export default function MainPage() {
  return (
    <>
      <Helmet>
        <title>멋쟁이 사자처럼 커뮤니티 - 멋사컴</title>

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
      </Helmet>
      <main className="container mx-auto mt-10 p-4 transition-color">
        <section className="text-center">
          <h1 className="text-4xl font-bold mb-4">
            멋사컴에 오신 것을 환영합니다!
          </h1>
          <p className="text-xl mb-6">
            다양한 주제의 커뮤니티와 활발한 소통을 위한 플랫폼입니다. 관심사에
            따라 참여하고, 의견을 나누세요.
          </p>
          <a
            href="/"
            className="bg-orange-500 text-white px-6 py-3 rounded hover:bg-orange-600"
          >
            커뮤니티 참여하기
          </a>
        </section>

        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-4 text-center">주요 기능</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded shadow dark:bg-gray-800">
              <h3 className="text-xl font-bold mb-2">정보 공유</h3>
              <p className="mb-4">다양한 정보와 지식을 공유하세요.</p>
              <a href="/info" className="text-orange-500 hover:underline">
                바로가기
              </a>
            </div>
            <div className="bg-white p-6 rounded shadow dark:bg-gray-800">
              <h3 className="text-xl font-bold mb-2">자유 게시판</h3>
              <p className="mb-4">자유롭게 이야기를 나누세요.</p>
              <a href="/free" className="text-orange-500 hover:underline">
                바로가기
              </a>
            </div>
            <div className="bg-white p-6 rounded shadow dark:bg-gray-800">
              <h3 className="text-xl font-bold mb-2">질문 게시판</h3>
              <p className="mb-4">궁금한 점을 질문하고 답변을 받아보세요.</p>
              <a href="/qna" className="text-orange-500 hover:underline">
                바로가기
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
