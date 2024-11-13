import "./Button.css";

export default function Button({ children, type = "button", onClick, color }) {
  return (
    <button
      className="rounded-button"
      type={type}
      onClick={onClick}
      style={{ backgroundColor: color }}
    >
      {children}
    </button>
  );
}
