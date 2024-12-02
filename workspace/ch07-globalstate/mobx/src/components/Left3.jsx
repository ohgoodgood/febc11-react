import counterStore from "@mobx/counterStore";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";

// store의 상태 변경 시 리렌더링 되도록, observer() 사용
const Left3 = observer(function Left3() {
  useEffect(() => {
    console.log("      # Left3 렌더링.");
  });
  return (
    <div>
      <h3>Left3</h3>
      <span>{counterStore.count}</span>
    </div>
  );
});

export default Left3;
