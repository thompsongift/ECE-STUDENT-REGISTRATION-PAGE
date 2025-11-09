import "bootstrap/dist/css/bootstrap.min.css";
import classes from "../component_css/navbar.module.css";
import Ham from "./hambug";
import defaultImage from "../assets/Picture1.png";
import "bootstrap-icons/font/bootstrap-icons.css";
import NavButtons from "./nav_button";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "./use_context";
import { useNavigate } from "react-router-dom";

export default function Navbar({}) {
  const [navMain, setNavMain] = useState([
    {
      titleName: "Home",
      fill: false,
    },
    {
      titleName: "Update details",
      fill: false,
    },
    {
      titleName: "View details",
      fill: false,
    },
    { titleName: "Staff portal", fill: false },
    { titleName: "Register", fill: true },
  ]);
  const navigate = useNavigate();
  const { setPage } = useContext(UserContext);
  const [isHamToggled, setIsHamToggled] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 255) {
        setIsHamToggled(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <nav
        className={`mx-0 navbar navbar-light ${classes.navBar} ${
          isHamToggled ? classes.darkBG : ""
        }`}
      >
        <div className={`container-fluid ${classes.navCon}`}>
          <div
            className={`mx-0 my-0 d-flex align-items-center ${classes.topNav}`}
          >
            <img
              className={`${classes.logo1} `}
              src={defaultImage}
              alt="Cropped Image"
            />
            <div className={`fw-bold ms-2 ${classes.logo2}`}>
              University of Nigeria Nsukka
            </div>
            {true && (
              <div className={`${classes.showHam}`}>
                <Ham
                  isToggled={isHamToggled}
                  toggle={() => {
                    setIsHamToggled(!isHamToggled);
                  }}
                ></Ham>
              </div>
            )}
          </div>

          <div
            className={`d-flex align-items-center ${classes.topPadding} ${
              !isHamToggled ? classes.navDrop : ""
            }`}
          >
            <ul className={`nav d-flex align-items-center ${classes.blockNav}`}>
              {/* NAV ITEMS ARRAY */}

              {navMain.map(({ titleName, fill, onClick }, index) => {
                return (
                  <NavButtons
                    titleName={titleName}
                    fill={fill}
                    extra={""}
                    isHamToggled={isHamToggled}
                    key={index}
                    href={
                      titleName == "Staff portal"
                        ? "https://admin.eceunn.com"
                        : ""
                    }
                    onClick={() => {
                      if (titleName == "Register") {
                        navigate("/register");
                      } else if (titleName == "Update details") {
                        navigate("/updatedetails");
                      } else if (titleName == "View details") {
                        navigate("/viewdetails");
                      } else if (titleName == "Home") {
                        navigate("/");
                      }
                    }}
                  />
                );
              })}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
