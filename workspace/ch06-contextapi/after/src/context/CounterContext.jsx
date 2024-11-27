import PropTypes from "prop-types";
import { createContext, useState } from "react";

// Context 객체 생성
const CounterContext = createContext();

CounterProvider.propTypes = {
  children: PropTypes.node,
};

// Provider 컴포넌트를 작성해서 export
export function CounterProvider({ children }) {
  // 데이터, 상태, 상태를 관리하는 함수 정의
  // Left3에 전달되어야 함
  const [count, setCount] = useState(10);

  // Right3에 전달되어야 함
  const countDown = function (step) {
    setCount(count - step);
  };
  const reset = function () {
    setCount(0);
  };
  const countUp = function (step) {
    setCount(count + step);
  };

  const values = {
    state: { count },
    actions: { countDown, reset, countUp },
    hello: "counter",
  };

  // Context 객체의 Provider로 자식 컴포넌트를 감싸서 반환
  // 전달할 context 값을 value 속성에 지정
  return (
    <CounterContext.Provider value={values}>{children}</CounterContext.Provider>
  );
}

// 사용 방법
{
  /* <CounterProvider>
        <App />
     </CounterProvider> */
}

// Context 객체 export
export default CounterContext;
