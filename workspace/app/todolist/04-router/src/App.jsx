import { RouterProvider } from "react-router-dom";
// import router from "./routes";
import router from "./routes-lazy";

function App() {
  return (
    <>
      <RouterProvider router={router} future={{ v7_startTransition: true }} />
    </>
  );
}

export default App;
