import axios from "axios";
import { useEffect, useState } from "react";

// 게시글 상세정보 데이터 API
function fetchPost() {
  return axios.get("https://11.fesp.shop/posts/1?delay=3000", {
    headers: {
      "client-id": "00-brunch",
    },
  });
}

// 댓글 목록 데이터 API
function fetchReplies() {
  return axios.get("https://11.fesp.shop/posts/1/replies?delay=2000", {
    headers: {
      "client-id": "00-brunch",
    },
  });
}

// 게시글 상세정보와 댓글 목록 데이터를 동시에 호출하는 함수
function fetchData() {
  return Promise.all([fetchPost(), fetchReplies()]).then(([post, replies]) => ({
    post: post.data,
    replies: replies.data,
  }));
}

// data fetching 시작 (부모 컴포넌트에서 현재 컴포넌트를 import하는 시점에)
const promise = fetchData();

// 전체(게시글 상세 + 댓글) 페이지 컴포넌트
function FetchThenRender() {
  const [post, setPost] = useState();
  const [replies, setReplies] = useState();

  useEffect(() => {
    promise.then((res) => {
      setPost(res.post);
      setReplies(res.replies);
    });
  }, []);

  if (!post) {
    return <div>게시물 로딩중...</div>;
  }

  return (
    <>
      <h4>{post.item.title}</h4>
      <Replies replies={replies} />
    </>
  );
}

// 댓글 목록 페이지 컴포넌트
function Replies({ replies }) {
  if (!replies) {
    return <div>댓글 로딩중...</div>;
  }

  const list = replies.item.map((item) => (
    <li key={item._id}>{item.content}</li>
  ));

  return (
    <>
      <ul>{list}</ul>
    </>
  );
}

export default FetchThenRender;
