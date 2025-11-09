import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import classes from "../component_css/footer.module.css";

export default function Footer() {
  return (
    <div className={`position-fixed p-0 m-0 ${classes.footerSection}`}></div>
  );
}
