"use server";
// 기본적으로 별도의 언급이 없으면 서버컴포넌트이고, 'use client'를 작성해주면 클라이언트컴포넌트가 되지만,
// 서버액션을 정의할 때는 특별히 'use server'를 작성해서 서버컴포넌트임을 명시해줘야 한다

// 게시물 추가
export async function addPost(formData) {
  console.log("서버 액션", formData);
  const data = {
    type: formData.get("type"),
    title: formData.get("title"),
    content: formData.get("content"),
  };

  const res = await fetch("https://11.fesp.shop/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "client-id": "00-board",
    },
    body: JSON.stringify(data),
  });

  return res.json();
}
