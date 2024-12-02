import PropTypes from "prop-types";
import styles from "./Button.module.css";
import classNames from "classnames";

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
  // const colorStyle = `${styles.button} ${styles[`color-${bg}-${color}`]}`;
  const colorStyle = classNames(styles.button, styles[`color-${bg}-${color}`]);
  return (
    <button className={colorStyle} type={type} onClick={clickHandler}>
      {children}
    </button>
  );
}
