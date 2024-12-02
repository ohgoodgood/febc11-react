import PropTypes from "prop-types";
import "./Button.css";

Button.propTypes = {
  children: PropTypes.string.isRequired,
  type: PropTypes.string,
  color: PropTypes.oneOf(["blue", "red", "yellow", "white"]),
  bg: PropTypes.oneOf(["blue", "red", "yellow", "white", "gray"]),
  onClick: PropTypes.func,
};

export default function Button({
  children,
  type = "button",
  bg,
  color,
  onClick: clickHandler,
}) {
  return (
    <button
      className={`button color-${bg}-${color}`}
      type={type}
      onClick={clickHandler}
    >
      {children}
    </button>
  );
}
