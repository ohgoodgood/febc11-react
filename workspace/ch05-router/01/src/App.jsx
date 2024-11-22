import { useEffect, useState } from "react";
import Home from "./Home";
import Page1 from "./Page1";
import Page2 from "./Page2";

function App() {
  const [path, setPath] = useState(window.location.pathname);
  console.log("현재 페이지", path);

  useEffect(() => {
    const handleNavigate = (e) => {
      setPath(e.destination.url.split(location.host).pop());
    };

    window.navigation.addEventListener("navigate", handleNavigate);

    return () => {
      window.navigation.removeEventListener("navigate", handleNavigate);
    };
  }, []);

  return (
    <>
      {(path === "/" || path === "/home.html") && <Home />}
      {path === "/page1.html" && <Page1 />}
      {path === "/page2.html" && <Page2 />}
    </>
  );
}

export default App;
