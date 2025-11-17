import { useLocation, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import pageSetup from "../component_css/page_setup.module.css";
import classes from "../component_css/landing_main.module.css";
import Navbar from "../component/nav";
import FeedbackListDummy from "../component/display_feedback";
import Footer from "../component/footer";
export default function FeedbackPage({ style }) {
  return (
    <>
      <div
        className={`d-flex flex-column position-fixed top-0 start-0 vw-100 vh-100 p-0 m-0`}
      >
        <div className={`${pageSetup.mainCont}`} style={style}>
          <Navbar />
          <div
            className={`px-0 py-5 m-0 d-flex align-items-center ${pageSetup.midSection}`}
          >
            <div
              className={`container-fluid m-0 w-100 bg-dark bg-opacity-50 ${pageSetup.mainBox}`}
            >
              <h1
                className={`${classes.heading2} my-3 w-100 w-md-50 fw-bold text-center`}
              >
                Feedback from Students <i className="bi bi-chat"></i>
              </h1>
              <div
                className={`w-100 mt-3 mb-0 mb-md-3 ${pageSetup.scrollThin} d-block
                 ${classes.announceContainer}`}
              >
                <FeedbackListDummy />
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}
