import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import Home from "./Home";
import Page1 from "./Page1";
import Page2 from "./Page2";
import Layout from "./Layout";

const router = createBrowserRouter(
  [
    // {
    //   path: "/",
    //   element: <Home />,
    // },
    // {
    //   path: "/page1",
    //   element: <Page1 />,
    // },
    // {
    //   path: "/page2",
    //   element: <Page2 />,
    // },
    {
      // URL에 따른 조건부 렌더링 관리. 중간경로(path에 정의)를 기준으로 하위 페이지들을 묶어 관리하기 좋다.
      path: "/",
      element: <Layout />,
      children: [
        // Layout 컴포넌트에서 Outlet에 들어갈 요소들
        { index: true, element: <Navigate to="/home" /> },
        { path: "home", element: <Home /> },
        { path: "page1", element: <Page1 /> },
        { path: "page2", element: <Page2 /> },
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
