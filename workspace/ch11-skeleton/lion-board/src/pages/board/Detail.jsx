import useAxiosInstance from "@hooks/useAxiosInstance";
import CommentList from "@pages/board/\bCommentList";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useUserStore from "@zustand/userStore";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function Detail() {
  const { user } = useUserStore();

  const navigate = useNavigate();

  const axios = useAxiosInstance();

  const { type, _id } = useParams();

  const { data } = useQuery({
    queryKey: ["posts", _id],
    queryFn: () => axios.get(`/posts/${_id}`),
    select: (res) => res.data,
    staleTime: 1000 * 10,
  });

  const queryClient = useQueryClient();

  const removeItem = useMutation({
    // mutationFn: (formData) => {
    //   formData.type = type;
    //   return axios.post(`/posts`, formData);
    // },

    mutationFn: (_id) => axios.delete(`/posts/${_id}`),

    onSuccess: () => {
      alert("게시물이 삭제되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["posts", type] });
      navigate(`/${type}`);
    },
  });

  const onSubmit = (event) => {
    event.preventDefault();
    removeItem.mutate(_id);
  };

  console.log("article data: ", data);

  if (!data) {
    return <div>로딩 중...</div>;
  }

  return (
    <>
      <Helmet>
        <title>{data.item.title} - 멋사컴</title>

        <meta
          name="description"
          content="다양한 주제의 커뮤니티와 활발한 소통을 위한 플랫폼입니다. 관심사에 따라 참여하고, 의견을 나누세요."
        />
        <meta
          name="keywords"
          content="커뮤니티, 소통, 포럼, 관심사, 온라인 모임, 커뮤니티 서비스"
        />
        <meta name="author" content="Front End Boot Camp" />

        <meta property="og:title" content={data?.item.title || "로딩 중..."} />
        <meta property="og:description" content={data.item.content} />
        <meta property="og:image" content="/images/febc.png" />
        <meta property="og:url" content="https://11.fesp.shop" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="멋사컴" />
      </Helmet>

      <main className="container mx-auto mt-4 px-4">
        <section className="mb-8 p-4">
          <div className="font-semibold text-xl">{data.item.title}</div>
          <div className="text-right text-gray-400">{data.item.user.name}</div>
          <div className="mb-4">
            <div>
              <pre className="font-roboto w-full p-2 whitespace-pre-wrap">
                {data.item.content}
              </pre>
            </div>
            <hr />
          </div>
          <div className="flex justify-end my-4">
            <Link
              to={`/${type}`}
              className="bg-orange-500 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded"
            >
              목록
            </Link>

            {user?._id === data.item.user._id && (
              <>
                <Link
                  to={`/${type}/${_id}/edit`}
                  className="bg-gray-900 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded"
                >
                  수정
                </Link>
                <button
                  type="submit"
                  onClick={onSubmit}
                  className="bg-red-500 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded"
                >
                  삭제
                </button>
              </>
            )}
          </div>
        </section>

        <CommentList />
      </main>
    </>
  );
}
