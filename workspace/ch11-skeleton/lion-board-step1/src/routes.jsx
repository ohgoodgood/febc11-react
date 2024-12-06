import { createBrowserRouter } from "react-router-dom";
import Layout from "@components/layout";
import MainPage from "@pages/index";
import List from "@pages/board/List";
import New from "@pages/board/New";
import Detail from "@pages/board/Detail";
import Edit from "@pages/board/Edit";
import Signup from "@pages/user/Signup";
import Login from "@pages/user/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <MainPage /> },
      { path: ":type", element: <List /> },
      { path: ":type/new", element: <New /> },
      { path: ":type/:_id", element: <Detail /> },
      { path: ":type/:_id/edit", element: <Edit /> },
      { path: "users/signup", element: <Signup /> },
      { path: "users/login", element: <Login /> },
    ],
  },
]);

export default router;
