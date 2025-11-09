import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import classes from "../component_css/landing_main.module.css";
import pageSetup from "../component_css/page_setup.module.css";
import ButtonType1 from "./button_type_1";
import { useNavigate } from "react-router-dom";

export default function LandingMain() {
  const navigate = useNavigate();

  return (
    <>
      <div
        className={`px-0 py-5 m-0 d-flex align-items-center ${pageSetup.midSection}`}
      >
        <div
          className={`container-fluid m-0 w-100 h-75 bg-dark bg-opacity-50 ${pageSetup.mainBox}`}
        >
          <h1 className={`${classes.heading1} my-3 w-100 fw-bold`}>
            Manage Student Information Seamlessly
          </h1>
          <h1 className={`${classes.heading2} my-3 w-100 w-md-75 fw-bold`}>
            Department of Electronic and Computer Engineering
          </h1>
          <h1 className={`${classes.heading3} my-3 w-100 w-md-50 fw-bold`}>
            Collect, manage and secure students' information seamlessly for the
            department of <b>Electronic and Computer Engineering</b>
          </h1>
          <ul className={`nav d-flex align-items-center px-0 py-1 m-0`}>
            <ButtonType1
              titleName="Register"
              fill={true}
              onClick={() => {
                navigate("/register");
              }}
            />
          </ul>
          <h1
            className={`${classes.heading4} ms-2 ms-md-0 mb-0 mt-2 w-100 w-md-50`}
          >
            <i>Click on the above for student registration</i>
          </h1>
          {/* <div
            className={`w-100 mt-3 mb-0 mb-md-3 d-flex justify-content-center align-items-center ${classes.announceContainer}`}
          >
            <i>No Announcement</i>
          </div> */}
          <ul
            className={`nav d-flex align-items-center px-0 py-1 m-0 ${classes.fixed}`}
          >
            {/* <ButtonType1
              titleName="Quick Scan"
              fill={true}
              icon={"bi bi-camera-fill"}
              fixed={true}
            /> */}
          </ul>
        </div>
      </div>
    </>
  );
}
