import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import pageSetup from "../component_css/page_setup.module.css";
import { useState, useEffect } from "react";

export default function ButtonType3({ titleName, extra, onClick }) {
  return (
    <>
      <button className={`${pageSetup.smallBut} ${extra}`} onClick={onClick}>
        {`${titleName}`}
      </button>
    </>
  );
}
