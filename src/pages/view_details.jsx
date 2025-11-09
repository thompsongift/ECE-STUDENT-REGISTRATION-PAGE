import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import pageSetup from "../component_css/page_setup.module.css";
import Navbar from "../component/nav";
import Footer from "../component/footer";
import SignIn from "../component/student_request";
export default function ViewViaMatNum({ style }) {
  return (
    <>
      <div
        className={`d-flex flex-column position-fixed top-0 start-0 vw-100 vh-100 p-0 m-0`}
      >
        <div className={`${pageSetup.mainCont}`} style={style}>
          <Navbar />
          <SignIn title={"View"} purpose={"view"} />
          <Footer />
        </div>
      </div>
    </>
  );
}
