import { Link } from "react-router-dom";
import { useRouteError } from "react-router-dom";

function ErrorPage() {
  const err = useRouteError();
  const message =
    err.status === 404
      ? "존재하지 않는 페이지입니다."
      : "예상하지 못한 에러가 발생했습니다.";
  return (
    <>
      <nav>
        <div>
          <ul>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/todolist">TodoList</Link>
            </li>
          </ul>
        </div>
      </nav>
      <div id="main">
        <div className="todo">
          <h2>에러 발생</h2>
          <p>{message}</p>
        </div>
      </div>
    </>
  );
}

export default ErrorPage;
