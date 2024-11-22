import { Outlet } from "react-router-dom";
import Footer from "../../../01-container/src/components/Footer";
import Header from "./Header";

function Layout() {
  return (
    <div className="todoapp">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;
