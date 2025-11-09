import { useLocation, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import pageSetup from "../component_css/page_setup.module.css";

import Navbar from "../component/nav";
import LandingMain from "../component/landing_main";
import Footer from "../component/footer";
export default function Landing({ style }) {
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
          <LandingMain />
          <Footer />
        </div>
      </div>
    </>
  );
}
