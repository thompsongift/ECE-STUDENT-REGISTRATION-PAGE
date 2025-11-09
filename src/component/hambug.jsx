import "bootstrap/dist/css/bootstrap.min.css";
import classes from "../component_css/hambug.module.css";

export default function Ham({ isToggled, toggle }) {
  return (
    <>
      <button
        type="button"
        className={`${classes.hambug} navbar-btn ${
          isToggled ? classes.active : ""
        }`}
        onClick={toggle}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </>
  );
}
