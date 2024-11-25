import { createBrowserRouter, Navigate } from "react-router-dom";
import { lazy } from "react";

// import Layout from "@components/Layout";
// import Home from "@pages/Home";
// import About from "@pages/About";
// import TodoList from "@pages/TodoList";
// import TodoAdd from "@pages/TodoAdd";
// import TodoDetail from "@pages/TodoDetail";
// import TodoEdit from "@pages/TodoEdit";
// import ErrorPage from "@pages/ErrorPage";

const Layout = lazy(() => import("@components/Layout"));
const Home = lazy(() => import("@pages/Home"));
const About = lazy(() => import("@pages/About"));
const TodoList = lazy(() => import("@pages/TodoList"));
const TodoAdd = lazy(() => import("@pages/TodoAdd"));
const TodoDetail = lazy(() => import("@pages/TodoDetail"));
const TodoEdit = lazy(() => import("@pages/TodoEdit"));
const ErrorPage = lazy(() => import("@pages/ErrorPage"));

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <Navigate to="/home" /> },
        { path: "home", element: <Home /> },
        { path: "about", element: <About /> },
        { path: "todolist", element: <TodoList /> },
        { path: "todolist/todoadd", element: <TodoAdd /> },
        {
          path: "todolist/:_id", // 동적 세그먼트, 중첩
          element: <TodoDetail />,
          children: [{ path: "todoedit", element: <TodoEdit /> }],
        },
      ],
    },
  ],
  {
    future: {
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_relativeSplatPath: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);

export default router;
