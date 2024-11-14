import { useState } from "react";

function App() {
  const [number, setNumber] = useState(0); // 여기서 선언되는 상태값은 이번 렌더링 동안에는 변하지 않음. 이벤트 핸들러에서 상태값을 바꾸는 동작이 있는 경우, 그 정보가 다음 번 렌더링의 초기 상태값에 반영될 뿐임!
  return (
    <>
      <h2>02 이벤트 핸들러에서 state 값을 여러 번 변경했을 때의 문제점</h2>
      <p>{number}</p>
      <button
        onClick={() => {
          console.log("클릭 처리 시작", number);

          // setter 함수가 호출되는 즉시 리렌더링이 되는 것이 아님. 다 모아 두었다가 함수가 종료될 때 한 번에 전달됨(batch 방식)
          // setNumber(number + 1); // 0 + 1
          // setNumber(number + 1); // 0 + 1
          // setNumber(number + 1); // 0 + 1

          // number는 이 함수 내에서 상수로 선언되어 있음. 즉 여기서 바로 number 값이 바뀌는 게 아님!
          // 결국 셋 다 setNumber(1)임

          // 콜백함수의 리턴값을 저장해 두었다가 다음에 호출되는 콜백함수에 인자값으로 전달
          setNumber((num) => num + 1); // 0 + 1
          setNumber((num) => num + 1); // 1 + 1
          setNumber((num) => num + 1); // 2 + 1

          console.log("클릭 처리 종료", number);
        }}
      >
        +3
      </button>
    </>
  );
}

export default App;
