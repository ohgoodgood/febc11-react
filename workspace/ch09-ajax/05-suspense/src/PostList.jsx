import FetchThenRender from "./02-FetchThenRender";
import FetchOnRender from "./03-FetchAsYouRender";
import axios from "axios";
import { useEffect, useState } from "react";

// 게시글 목록조회 API 호출
function fetchPostList() {
  // Promise를 반환. 상태관리는 이 함수를 호출하는 함수에서 별도로 호출해야 함.
  return axios.get("https://11.fesp.shop/posts?type=brunch", {
    headers: {
      "client-id": "00-brunch",
    },
  });
}

// 게시글 목록 조회 페이지
function PostList() {
  const [data, setData] = useState();

  useEffect(() => {
    // 반환된 Promise를 받아서 then으로 사용
    fetchPostList().then((res) => {
      setData(res.data);
    });
  }, []);

  // 1) 마운트 시점(data가 없는 시점)에 일단 렌더링될 요소
  if (!data) {
    return <div>게시물 목록 로딩 중...</div>;
  }

  return (
    <>
      <h2>게시물 {data.item.length}건이 있습니다.</h2>

      <h3>Fetch-on-render 방식</h3>
      <FetchOnRender />

      <h3>Fetch-then-render 방식</h3>
      <FetchThenRender />
    </>
  );
}

export default PostList;
