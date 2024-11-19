import Header from "@components/Header";
import TodoContainer from "./pages/TodoContainer";
import Footer from "@components/Footer";

function App() {
  return (
    <div id="todo">
      <Header />
      <TodoContainer />
      <Footer />
    </div>
  );
}

export default App;
