import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import classes from "../component_css/navbar.module.css";
import { useState, useEffect } from "react";

export default function ButtonType1({
  titleName,
  fill,
  extra,
  icon,
  fixed,
  onClick,
}) {
  const [screenSize, setScreenSize] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 655) {
        setScreenSize(false);
      } else {
        setScreenSize(true);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {fixed && screenSize ? (
        <li className={`nav-item`} onClick={onClick}>
          <a
            href=""
            className={`nav-link ${
              !fill ? "p-0 my-0" : "px-4 px-md-3 px-lg-4 py-md-0 py-lg-1"
            } ${extra ? extra : ""} ${
              fill ? classes.greenFill : classes.navButtons
            }`}
            // Temporary
          >
            <p
              className={`${classes.fixed} mx-2 my-0 ${classes.butFont} d-flex align-items-center justify-content-center`}
            ></p>
          </a>
        </li>
      ) : (
        <li className={`nav-item`} onClick={onClick}>
          <a
            href="#"
            className={`nav-link ${
              !fill ? "p-0 my-0" : "px-4 px-md-3 px-lg-4 py-md-2 py-lg-1"
            } ${extra ? extra : ""} ${
              fill ? classes.greenFill : classes.navButtons
            }`}
            // Temporary
          >
            <p
              className={`mx-3 my-1 m-md-0 ${classes.butFont} d-flex align-items-center justify-content-center`}
            >
              {titleName} {icon ? <i className={`${icon} ms-2 fs-4`}></i> : ""}
            </p>
          </a>
        </li>
      )}
    </>
  );
}
