import Yong from "../yong.js";
import Counter from "./Counter.js";
import Header from "./Header.js";

function App() {
  return Yong.createElement("div", { id: "app" }, Header, Counter);
}

export default App;
