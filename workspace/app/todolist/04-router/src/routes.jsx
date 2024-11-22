import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import TodoList from "./pages/TodoList";
import TodoAdd from "./pages/TodoAdd";
import TodoDetail from "./pages/TodoDetail";
import TodoEdit from "./pages/TodoEdit";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "home", element: <Home /> },
      { path: "about", element: <About /> },
      { path: "todolist", element: <TodoList /> },
      { path: "todoadd", element: <TodoAdd /> },
      { path: "tododetail", element: <TodoDetail /> },
      { path: "todoedit", element: <TodoEdit /> },
    ],
  },
]);

export default router;
