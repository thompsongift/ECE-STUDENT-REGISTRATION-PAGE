import { useState, useEffect } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import classes from "../component_css/sign_in_page.module.css";
import myImage from "../assets/Picture5.png";
import ButtonType3 from "./button_type_3";

export default function Registration({ savedData }) {
  function convertDate(dateStr) {
    const date = new Date(dateStr); // input is already in ISO format

    const options = { day: "numeric", month: "long", year: "numeric" };
    return date.toLocaleDateString("en-GB", options); // e.g., "20 January 2020"
  }
  // const sample = {
  //   last_name: "Gift",
  //   first_name: "Thompson",
  //   middle_name: "Eno",
  //   reg_number: "2020/247100",
  //   level: "100",
  //   date_of_birth: "2001-06-10",
  //   gender: "Female",
  //   email: "thompsongift936@gmail.com",
  //   phone_number: "8100956635",
  //   permanent_address: "Elite Lodge, Odim, UNN, Enugu State",
  //   nationality: "Nigeria",
  //   state_of_origin: "Gombe",
  //   lga_of_origin: "Kwami",
  //   accommodation: "Off-Campus",
  //   residential_address: "Elite Lodge, Odim, UNN, Enugu State",
  //   religion: "Christianity",
  //   state_of_residence: "Delta",
  //   lga_of_residence: "Ika North East",
  //   guardian_name: "James Akpan",
  //   guardian_phone_number: "7052027765",
  //   guardian_email: "thompsongift936@gmail.com",
  //   feedback: " jaonsosnsk ",
  //   passport_image:
  //     "https://res.cloudinary.com/dw0bfxebl/image/upload/v1709382812/ece23unn/students/wd4hoymjucebnfabxykg.jpg",
  // };
  // const {
  //   last_name,
  //   first_name,
  //   middle_name,
  //   reg_number,
  //   level,
  //   date_of_birth,
  //   gender,
  //   email,
  //   phone_number,
  //   permanent_address,
  //   nationality,
  //   state_of_origin,
  //   lga_of_origin,
  //   accommodation,
  //   residential_address,
  //   religion,
  //   state_of_residence,
  //   lga_of_residence,
  //   guardian_name,
  //   guardian_phone_number,
  //   guardian_email,
  //   passport_url,
  //   // The file URL
  //  } = sample;
  const {
    last_name,
    first_name,
    middle_name,
    reg_number,
    level,
    date_of_birth,
    gender,
    email,
    phone_number,
    permanent_address,
    nationality,
    state_of_origin,
    lga_of_origin,
    accommodation,
    residential_address,
    religion,
    state_of_residence,
    lga_of_residence,
    guardian_name,
    guardian_phone_number,
    guardian_email,
    passport_url,
    //The file URL
  } = savedData;

  return (
    <>
      <div className={`row mx-2 gy-3 px-5 mx-md-5 ${classes.box}`}>
        <div
          className={`col-md-12 text-center pb-4 pt-4 ${classes.btnLinkCon}`}
        >
          <img
            src={!passport_url ? myImage : passport_url}
            className={`rounded-circle ${classes.imgBorder}`}
            alt="Uploaded Preview"
            style={{ width: "170px", height: "170px", objectFit: "cover" }}
          />
        </div>
        <div className={`col-md-12 ${classes.fontSize1}`}>
          <b>Surname:</b> {last_name}
        </div>
        <hr className={`my-2 ${classes.lineColor}`} />
        <div className={`col-md-12 ${classes.fontSize1}`}>
          <b>First Name:</b> {first_name}
        </div>
        <hr className={`my-2 ${classes.lineColor}`} />
        <div className={`col-md-12 ${classes.fontSize1}`}>
          <b>Middle Name:</b> {middle_name}
        </div>
        <hr className={`my-2 ${classes.lineColor}`} />
        <div className={`col-md-12 ${classes.fontSize1}`}>
          <b>Level:</b> {level}
        </div>
        <hr className={`my-2 ${classes.lineColor}`} />
        <div className={`col-md-12 ${classes.fontSize1}`}>
          <b>Matric Number:</b> {reg_number}
        </div>
        <hr className={`my-2 ${classes.lineColor}`} />
        <div className={`col-md-12 ${classes.fontSize1}`}>
          <b>Date of Birth:</b> {convertDate(date_of_birth.slice(0, 10))}
        </div>
        <hr className={`my-2 ${classes.lineColor}`} />
        <div className={`col-md-12 ${classes.fontSize1}`}>
          <b>Gender:</b> {gender}
        </div>
        <hr className={`my-2 ${classes.lineColor}`} />
        <div className={`col-md-12 ${classes.fontSize1}`}>
          <b>Phone Number:</b> {"0" + String(phone_number)}
        </div>
        <hr className={`my-2 ${classes.lineColor}`} />
        <div className={`col-md-12 ${classes.fontSize1}`}>
          <b>Religion:</b> {religion}
        </div>
        <hr className={`my-2 ${classes.lineColor}`} />
        <div className={`col-md-12 ${classes.fontSize1}`}>
          <b>Email:</b> {email}
        </div>
        <hr className={`my-2 ${classes.lineColor}`} />
        <div className={`col-md-12 ${classes.fontSize1}`}>
          <b>Permanent Address:</b> {permanent_address}
        </div>
        <hr className={`my-2 ${classes.lineColor}`} />
        <div className={`col-md-12 ${classes.fontSize1}`}>
          <b>Nationality:</b> {nationality}
        </div>
        <hr className={`my-2 ${classes.lineColor}`} />
        <div className={`col-md-12 ${classes.fontSize1}`}>
          <b>State of Origin:</b> {state_of_origin}
        </div>
        <hr className={`my-2 ${classes.lineColor}`} />
        <div className={`col-md-12 ${classes.fontSize1}`}>
          <b>LGA of Origin:</b> {lga_of_origin}
        </div>
        <hr className={`my-2 ${classes.lineColor}`} />
        <div className={`col-md-12 ${classes.fontSize1}`}>
          <b>Residential Address:</b> {residential_address}
        </div>
        <hr className={`my-2 ${classes.lineColor}`} />
        <div className={`col-md-12 ${classes.fontSize1}`}>
          <b>Accommodation:</b> {accommodation}
        </div>
        <hr className={`my-2 ${classes.lineColor}`} />
        <div className={`col-md-12 ${classes.fontSize1}`}>
          <b>State of Residence:</b> {state_of_residence}
        </div>
        <hr className={`my-2 ${classes.lineColor}`} />
        <div className={`col-md-12 ${classes.fontSize1}`}>
          <b>LGA of Residence:</b> {lga_of_residence}
        </div>
        <hr className={`my-2 ${classes.lineColor}`} />
        <div className={`col-md-12 ${classes.fontSize1}`}>
          <b>Guardian Name:</b> {guardian_name}
        </div>
        <hr className={`my-2 ${classes.lineColor}`} />
        <div className={`col-md-12 ${classes.fontSize1}`}>
          <b>Guardian Phone Number:</b> {"0" + String(guardian_phone_number)}
        </div>
        <hr className={`my-2 ${classes.lineColor}`} />
        <div className={`col-md-12 mb-3 ${classes.fontSize1}`}>
          <b>Guardian Email:</b> {guardian_email}
        </div>
      </div>
    </>
  );
}
