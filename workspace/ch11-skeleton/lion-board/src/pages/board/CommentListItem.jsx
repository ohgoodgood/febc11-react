import PropTypes from "prop-types";
import { Link } from "react-router-dom";

CommentListItem.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.number.isRequired,
    user: PropTypes.shape({
      _id: PropTypes.number.isRequired,
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
        <form action="#">
          <pre className="whitespace-pre-wrap text-sm">{item.content}</pre>
          <button
            type="submit"
            className="bg-red-500 py-1 px-2 text-sm text-white font-semibold ml-2 hover:bg-amber-400 rounded"
          >
            삭제
          </button>
        </form>
      </div>
    </div>
  );
}
