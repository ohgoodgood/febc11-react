import PropTypes from "prop-types";

Link.propTypes = {
  children: PropTypes.node,
  to: PropTypes.string.isRequired,
};

function Link({ children, to }) {
  const handleClick = (e) => {
    // a태그의 기본 동작 방지
    e.preventDefault();

    window.history.pushState(null, "", e.target.pathname);
    // (state, title, url)
    // pathname: 도메인 이후의 주소
  };

  return (
    <a href={to} onClick={handleClick}>
      {children}
    </a>
  );
}

export default Link;
