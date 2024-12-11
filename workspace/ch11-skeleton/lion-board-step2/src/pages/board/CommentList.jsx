import useAxiosInstance from "@hooks/useAxiosInstance";
import CommentListItem from "@pages/board/CommentListItem";
import CommentNew from "@pages/board/CommentNew";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export default function CommentList() {
  const axios = useAxiosInstance();

  const { _id } = useParams();

  const { data } = useQuery({
    queryKey: ["replies", _id],
    queryFn: () => axios.get(`/posts/${_id}/replies`),
    select: (res) => res.data,
    staleTime: 1000 * 10,
  });

  console.log("replies data: ", data);

  if (!data) {
    return <div>댓글 로드 중...</div>;
  }

  const commentList = data.item.map((item) => (
    <CommentListItem key={item._id} item={item} />
  ));

  return (
    <section className="mb-8">
      <h4 className="mt-8 mb-4 ml-2">댓글 {data.item.length}개</h4>

      {commentList}

      <CommentNew />
    </section>
  );
}
