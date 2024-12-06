import axios from "axios";
import { useEffect, useState } from "react";

// 게시글 API 데이터 호출
function fetchPost() {
  // Promise를 반환. 상태관리는 이 함수를 호출하는 함수에서 별도로 정의/호출해야 함.
  return axios.get("https://11.fesp.shop/posts/1?delay=3000", {
    headers: {
      "client-id": "00-brunch",
    },
  });
}

// 게시글 상세 조회 페이지: fetch-on-render 방식
function FetchOnRender() {
  const [data, setData] = useState();

  useEffect(() => {
    // 반환된 Promise를 받아서 then으로 사용
    fetchPost().then((res) => {
      setData(res.data);
    });
  }, []);

  // 마운트 시점(data가 없는(undefined) 시점)에 일단 렌더링될 요소
  if (!data) {
    return <div>게시글 로딩 중...</div>;
  }

  return (
    <>
      <h4>{data.item.title}</h4>
      <Replies />
    </>
  );
}

////////////////////////////////////////////////////////////////////////

// 댓글 목록 API 데이터 호출
function fetchReplies() {
  // Promise를 반환. 상태관리는 이 함수를 호출하는 함수에서 별도로 정의/호출해야 함.
  return axios.get("https://11.fesp.shop/posts/1/replies?delay=2000", {
    headers: {
      "client-id": "00-brunch",
    },
  });
}

// 댓글 목록 페이지
function Replies() {
  const [data, setData] = useState();

  useEffect(() => {
    // 반환된 Promise를 받아서 then으로 사용
    fetchReplies().then((res) => {
      setData(res.data);
    });
  }, []);

  // 마운트 시점(data가 없는(undefined) 시점)에 일단 렌더링될 요소
  if (!data) {
    return <div>댓글 로딩 중...</div>;
  }

  const list = data.item.map((item) => <li key={item._id}>{item.content}</li>);

  return <ul>{list}</ul>;
}

export default FetchOnRender;
