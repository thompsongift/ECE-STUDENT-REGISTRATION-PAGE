import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import classes from "../component_css/navbar.module.css";

export default function NavButtons({
  titleName,
  fill,
  extra,
  isHamToggled,
  active,
  dynNav,
  setIndex,
  href,
  onClick,
}) {
  return (
    <li className={`nav-item`}>
      <a
        href={href}
        className={`nav-link ${
          !fill
            ? dynNav
              ? "p-0 my-0 mx-0"
              : "p-0 my-0 ms-0 me-3 me-lg-4"
            : "ms-0 ms-sm-1 ms-md-3 py-1 m-0"
        } ${extra} ${
          fill && !isHamToggled ? classes.greenFill : classes.navButtons
        }`}
        // Temporary
        onClick={onClick}
      >
        <p
          className={`my-0 mx-1 ${classes.navFont} ${
            active ? classes.active : ""
          } `}
        >
          {titleName}
        </p>
        {active && dynNav && (
          <div className={`mt-1 ${classes.underline}`}></div>
        )}
        {!active && dynNav && (
          <div className={`mt-1 ${classes.notUnderline}`}></div>
        )}
      </a>
    </li>
  );
}
