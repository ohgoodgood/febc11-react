import { useState } from "react";

// 모듈 스코프 변수: 함수가 여러 번 사용될 경우 변수값을 공유해버려서 안됨!
// let count = 0;

export default function Message() {
  // 지역 변수: 함수가 호출될때마다 초기화되므로 안됨!
  // let count = 0;

  // state 사용 (바람직)
  const [count, setCount] = useState(0);
  const [msg, setMsg] = useState("");

  const handleChange = (event) => {
    const inputMsg = event.target.value;
    setMsg(inputMsg);
    setCount(count + 1);
  };

  return (
    <div>
      <input type="text" onChange={handleChange} />
      <br />
      <span>입력 메세지: {msg}</span>
      <br />
      <span>입력 횟수: {count}</span>
    </div>
  );
}
