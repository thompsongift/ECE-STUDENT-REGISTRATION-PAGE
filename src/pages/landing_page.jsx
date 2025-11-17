import { useLocation, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import pageSetup from "../component_css/page_setup.module.css";
import classes from "../component_css/landing_main.module.css";
import Navbar from "../component/nav";
import LandingMain from "../component/landing_main";
import Footer from "../component/footer";
export default function Landing({ style, handle, setHandle }) {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const token = params.get("token");

  if (token) {
    return <Navigate to={`/register/?token=${token}`} />;
  }
  return (
    <>
      <div
        className={`d-flex flex-column position-fixed top-0 start-0 vw-100 vh-100 p-0 m-0`}
      >
        <div className={`${pageSetup.mainCont}`} style={style}>
          <Navbar />
          <LandingMain handle={handle} setHandle={setHandle} />
          <div
            className={`w-100 mt-3 mb-0 mb-md-3 row ${classes.announceContainer}`}
          ></div>
          <Footer />
        </div>
      </div>
    </>
  );
}
