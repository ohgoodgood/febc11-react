import useAxiosInstance from "@hooks/useAxiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";

CommentListItem.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.number.isRequired,
    user: PropTypes.shape({
      _id: PropTypes.number,
      name: PropTypes.string,
      image: PropTypes.string,
    }).isRequired,
    content: PropTypes.string.isRequired,
    like: PropTypes.number,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string,
  }).isRequired,
};

export default function CommentListItem({ item }) {
  const queryClient = useQueryClient();

  const axios = useAxiosInstance();

  const { _id } = useParams();

  const removeItem = useMutation({
    mutationFn: (_id) => axios.delete(`/posts/${_id}/replies/${item._id}`),

    onSuccess: () => {
      alert("댓글이 삭제되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["replies", _id] });
    },
  });

  return (
    <div className="shadow-md rounded-lg p-4 mb-4">
      <div className="flex justify-between items-center mb-2">
        <img
          src={`https://11.fesp.shop/${item.user.image}`}
          className="w-8 h-8 rounded-full mr-2"
        />
        <Link to="" className="text-orange-400">
          {item.user.name || "익명"}
        </Link>
        <time
          className="ml-auto text-gray-500"
          dateTime={item.updatedAt || item.createdAt}
        >
          {item.updatedAt || item.createdAt}
        </time>
      </div>
      <div className="flex justify-between items-center mb-2">
        <pre className="whitespace-pre-wrap text-sm">{item.content}</pre>
        <button
          type="submit"
          onClick={() => removeItem.mutate(_id)}
          className="bg-red-500 py-1 px-2 text-sm text-white font-semibold ml-2 hover:bg-amber-400 rounded"
        >
          삭제
        </button>
      </div>
    </div>
  );
}
