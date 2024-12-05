import axios from "axios";
import { useEffect, useState } from "react";

// 게시글과 댓글 목록 데이터 동시에 호출
function fetchData() {
  return Promise.all([fetchPost(), fetchReplies()]).then(([post, replies]) => ({
    post: post.data,
    replies: replies.data,
  }));
}

// data fetching 시작 (부모 컴포넌트가 현재 컴포넌트를 import하는 시점에)
const promise = fetchData();

// 게시글 조회 API 호출
function fetchPost() {
  // Promise를 반환. 상태관리는 이 함수를 호출하는 함수에서 별도로 정의/호출해야 함.
  return axios.get("https://11.fesp.shop/posts/1", {
    headers: {
      "client-id": "00-brunch",
    },
  });
}

// 게시글 상세 조회 페이지: fetch-then-render 방식
function FetchThenRender() {
  const [post, setPost] = useState();
  const [replies, setReplies] = useState();

  useEffect(() => {
    // 반환된 Promise를 받아서 then으로 사용
    promise.then((res) => {
      setPost(res.post);
      setReplies(res.replies);
    });
  }, []);

  // 1) 마운트 시점(data가 없는(undefined) 시점)에 일단 렌더링될 요소
  if (!post) {
    return <div>게시글 로딩 중...</div>;
  }

  return (
    <>
      <h4>{post.item.title}</h4>
      <Replies replies={replies} />
    </>
  );
}

// 댓글 목록 조회 API 호출
function fetchReplies() {
  // Promise를 반환. 상태관리는 이 함수를 호출하는 함수에서 별도로 정의/호출해야 함.
  return axios.get("https://11.fesp.shop/posts/1/replies", {
    headers: {
      "client-id": "00-brunch",
    },
  });
}

// 댓글 목록 페이지
function Replies({ replies }) {
  // 마운트 시점(data가 없는(undefined) 시점)에 일단 렌더링될 요소
  if (!replies) {
    return <div>댓글 로딩 중...</div>;
  }

  const list = replies.item.map((item) => (
    <li key={item._id}>{item.content}</li>
  ));

  return <ul>{list}</ul>;
}

export default FetchThenRender;
