import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import classes from "../component_css/sign_in_page.module.css";
import country from "../assets/countries.json";
import state from "../assets/states.json";
import lga from "../assets/lgas.json";

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default function Form1({
  submisssion,
  getData,
  getErrorMes,
  getError,
  setMessage,
}) {
  function normalizePhoneNumber(number) {
    // Remove spaces or dashes
    if (!number) return "";
    number = number.replace(/\s|-/g, "");

    // If it starts with +234, convert to local format
    if (number.startsWith("+234")) {
      number = "0" + number.slice(4);
    }

    // If it doesn't start with 0, add one
    if (!number.startsWith("0")) {
      number = "0" + number;
    }

    return number;
  }
  const mergeFormFields = (prev, newData) => {
    const allowedKeys = Object.keys(prev);
    const filtered = Object.fromEntries(
      Object.entries(newData).filter(([k]) => allowedKeys.includes(k))
    );
    return {
      ...prev,
      ...filtered,
      date_of_birth: filtered.date_of_birth
        ? filtered.date_of_birth.split("T")[0]
        : "",
      phone_number: normalizePhoneNumber(filtered.phone_number),
      guardian_phone_number: normalizePhoneNumber(
        filtered.guardian_phone_number
      ),
    };
  };

  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const token = params.get("token");
  const isToken = !!token;
  const [disMessage, setDisMessage] = useState(
    "You have successfully completed your registration."
  );
  const [roll, setRoll] = useState(isToken);
  const [listOfState, setListOfState] = useState([]);
  const [listOfStateOrigin, setListOfStateOrigin] = useState([]);
  const [listOfLocalGovtOrigin, setListOfLocalGovtOrigin] = useState([]);
  const [listOfLocalGovtResi, setListOfLocalGovtResi] = useState([]);
  const [listOfCountry, setListOfCountry] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [buttonColor, setButtonColor] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [submitErrorMes, setSubmitErrorMes] = useState([]);
  const [formData, setFormData] = useState({
    last_name: "",
    first_name: "",
    middle_name: "",
    reg_number: "",
    level: "",
    date_of_birth: "",
    gender: "",
    email: "",
    phone_number: "",
    permanent_address: "",
    nationality: "",
    state_of_origin: "",
    lga_of_origin: "",
    accommodation: "",
    residential_address: "",
    religion: "",
    state_of_residence: "",
    lga_of_residence: "",
    guardian_name: "",
    guardian_phone_number: "",
    guardian_email: "",
    feedback: "",
    passport_image: null,
  });

  const [validation, setValidation] = useState({
    last_name: false,
    first_name: false,
    middle_name: false,
    reg_number: false,
    level: false,
    date_of_birth: false,
    gender: false,
    email: false,
    phone_number: false,
    permanent_address: false,
    nationality: false,
    state_of_origin: false,
    lga_of_origin: false,
    accommodation: false,
    residential_address: false,
    religion: false,
    state_of_residence: false,
    lga_of_residence: false,
    guardian_name: false,
    guardian_phone_number: false,
    guardian_email: false,
    feedback: false,
    passport_image: false,
  });

  useEffect(() => {
    if (Object.values(validation).every((isValid) => isValid)) {
      if (!submitted) {
        setButtonColor(true);
      }
    } else {
      setButtonColor(false);
    }
  }, [validation]);

  function validateImage(file) {
    //Validate if the file is selected
    if (!formData.passport_image) {
      setErrorMessage("Please select an image!");
      return false;
    }
    //Validate File Type (JPG/JPEG)
    const validTypes = ["image/jpeg", "image/jpg"];
    try {
      if (!validTypes.includes(file.type)) {
        setErrorMessage(
          `Only JPG and JPEG images are allowed. '${file.type.replace(
            "image/",
            ""
          )}' isnt allowed`
        );
        return false;
      }

      //Validate File Size (<2MB)
      if (file.size > 2 * 1024 * 1024) {
        setErrorMessage("File size must be less than 2MB.");
        return false;
      }

      //Validate Image Dimensions (200x200)
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        if (
          (img.width < 100 && img.width > 1000) ||
          (img.height < 100 && img.height > 1000)
        ) {
          setErrorMessage("Image must be exactly 200x200 pixels.");
          return false;
        }
      };
      //setImageURL(img.src);
      return true;
    } catch (error) {
      console.error("Error validating image:", error);
      setErrorMessage("An error occurred. Please try again.");
      return false;
    }
  }

  // Handle Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const image = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      passport_image: image,
    }));
  };

  // Validation

  useEffect(() => {
    setValidation({
      last_name: /^[A-Za-z\s'-]{2,50}$/.test(formData.last_name),
      first_name: /^[A-Za-z\s'-]{2,50}$/.test(formData.first_name),
      middle_name: /^[A-Za-z\s'-]{2,50}$/.test(formData.middle_name),
      reg_number: /^\d{4}\/\d{6}$/.test(formData.reg_number),
      level: /^[0-5]{3}$/.test(formData.level),
      date_of_birth: (() => {
        const dobDate = new Date(formData.date_of_birth);
        const minDate = new Date("1900-01-01"); // Oldest allowed DOB
        const maxDate = new Date("2010-01-01"); // Today's date (ensuring no future date)
        return dobDate >= minDate && dobDate <= maxDate;
      })(),
      gender: formData.gender === "Male" || formData.gender === "Female",
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email),
      phone_number:
        /^[0-9]{11,15}$/.test(formData.phone_number) ||
        /^[+]+[0-9]{11,15}$/.test(formData.phone_number),
      permanent_address:
        formData.permanent_address.trim().length >= 5 &&
        formData.permanent_address.trim().length <= 100,
      nationality: formData.nationality !== "",
      state_of_origin: formData.state_of_origin !== "",
      lga_of_origin: formData.lga_of_origin !== "",
      accommodation:
        formData.accommodation === "Hostel" ||
        formData.accommodation === "Off-Campus",
      residential_address:
        formData.residential_address.trim().length >= 5 &&
        formData.residential_address.trim().length <= 100,
      religion: formData.religion !== "",
      state_of_residence: formData.state_of_residence !== "",
      lga_of_residence: formData.lga_of_residence !== "",
      guardian_name: /^[A-Za-z\s'-]{2,50}$/.test(formData.guardian_name),
      guardian_phone_number:
        /^[0-9]{10,15}$/.test(formData.guardian_phone_number) ||
        /^[+]+[0-9]{10,15}$/.test(formData.guardian_phone_number),
      guardian_email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.guardian_email
      ),
      feedback:
        formData.feedback.trim().length >= 5 &&
        formData.feedback.trim().length <= 1000,
      passport_image: validateImage(formData.passport_image) || isToken,
    });
  }, [formData]);

  // Fetch Existing Data if Token is Present

  useEffect(() => {
    const controller = new AbortController();
    if (isToken) {
      (async () => {
        try {
          const response = await fetch(
            `https://api.eceunn.com/api/student/data?token=${token}`,
            {
              signal: controller.signal,
            }
          );
          if (!response.ok) {
            const errs = await response.json();
            if (errs.message) {
              throw new Error(errs.message);
            } else if (errs.error) {
              throw new Error(errs.error);
            }
          }
          const { data, message } = await response.json();
          if (data.purpose == "view") {
            getData(data.data);
            setMessage(message);
            window.history.replaceState({}, document.title, "/");
            submisssion(true);
          } else {
            setRoll(false);
            setFormData((prev) => mergeFormFields(prev, data.data));
            setDisMessage(message);
          }
        } catch (error) {
          setSubmitted(false);
          setSubmitError(true);
          setSubmitErrorMes([error.message]);
          setButtonColor(true);
          await wait(4000);
          navigate("/");
        }
      })();
    }

    return () => controller.abort();
  }, []);

  useEffect(() => {
    setListOfCountry(country);
  }, []);

  useEffect(() => {
    if (formData.nationality === "Nigeria") {
      try {
        setListOfStateOrigin(state);
      } catch (err) {
        setListOfStateOrigin([]);
      }
    } else if (formData.nationality) {
      setListOfStateOrigin(["Foreigner"]);
    }
  }, [formData.nationality]);

  useEffect(() => {
    if (!formData.state_of_origin || formData.nationality !== "Nigeria") {
      setListOfLocalGovtOrigin(["Foreigner"]);
      return;
    }
    const result = lga[formData.state_of_origin];
    setListOfLocalGovtOrigin(result);
  }, [formData.state_of_origin, formData.nationality]);

  useEffect(() => {
    setListOfState(state);
  }, []);

  useEffect(() => {
    const result = lga[formData.state_of_residence];
    setListOfLocalGovtResi(result);
  }, [formData.state_of_residence]);

  //Handle Error Message
  useEffect(() => {
    getErrorMes(submitErrorMes);
    getError(submitError);
  }, [submitErrorMes, submitError]);

  // Handle Submission Logic
  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonColor(false);
    setSubmitted(true);
    setSubmitError(false);
    setSubmitErrorMes([]);

    // Validation logic
    const newValidation = {
      last_name: /^[A-Za-z\s'-]{2,50}$/.test(formData.last_name),
      first_name: /^[A-Za-z\s'-]{2,50}$/.test(formData.first_name),
      middle_name: /^[A-Za-z\s'-]{2,50}$/.test(formData.middle_name),
      reg_number: /^\d{4}\/\d{6}$/.test(formData.reg_number),
      level: /^[0-5]{3}$/.test(formData.level),
      date_of_birth: (() => {
        const dobDate = new Date(formData.date_of_birth);
        const minDate = new Date("1900-01-01");
        const maxDate = new Date("2010-01-01");
        return dobDate >= minDate && dobDate <= maxDate;
      })(),
      gender: formData.gender === "Male" || formData.gender === "Female",
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email),
      phone_number:
        /^[0-9]{10,15}$/.test(formData.phone_number) ||
        /^[+]+[0-9]{10,15}$/.test(formData.phone_number),
      permanent_address:
        formData.permanent_address.trim().length >= 5 &&
        formData.permanent_address.trim().length <= 100,
      nationality: formData.nationality !== "",
      state_of_origin: formData.state_of_origin !== "",
      lga_of_origin: formData.lga_of_origin !== "",
      accommodation:
        formData.accommodation === "Hostel" ||
        formData.accommodation === "Off-Campus",
      residential_address:
        formData.residential_address.trim().length >= 5 &&
        formData.residential_address.trim().length <= 100,
      religion: formData.religion !== "",
      state_of_residence: formData.state_of_residence !== "",
      lga_of_residence: formData.lga_of_residence !== "",
      guardian_name: /^[A-Za-z\s'-]{2,50}$/.test(formData.guardian_name),
      guardian_phone_number:
        /^[0-9]{10,15}$/.test(formData.guardian_phone_number) ||
        /^[+]+[0-9]{10,15}$/.test(formData.guardian_phone_number),
      guardian_email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.guardian_email
      ),
      feedback:
        formData.feedback.trim().length >= 5 &&
        formData.feedback.trim().length <= 1000,
      passport_image: validateImage(formData.passport_image) || isToken,
    };

    setValidation(newValidation);

    // Format phone numbers
    const updatedForm = {
      ...formData,
      ["phone_number"]: formData.phone_number.startsWith("+")
        ? Number("0" + formData.phone_number.slice(4))
        : Number(formData.phone_number),
      ["guardian_phone_number"]: formData.guardian_phone_number.startsWith("+")
        ? Number("0" + formData.guardian_phone_number.slice(4))
        : Number(formData.guardian_phone_number),
    };

    // ✅ Prepare request body dynamically
    let bodyData;
    let endpoint;

    if (isToken) {
      // If updating via token
      bodyData = new FormData();
      for (const key in updatedForm) {
        // if (key != "passport_image") {
        //   bodyData.append(key, updatedForm[key]);
        // }
        bodyData.append(key, updatedForm[key]);
      }

      bodyData.append("token", token);

      endpoint = `https://api.eceunn.com/api/student/data/edit`;
    } else {
      // Normal registration (with file)
      bodyData = new FormData();
      for (const key in updatedForm) {
        bodyData.append(key, updatedForm[key]);
      }
      endpoint = "https://api.eceunn.com/api/create/student";
    }

    try {
      if (Object.values(newValidation).every((isValid) => isValid)) {
        const controller = new AbortController();
        const timeout = setTimeout(() => {
          controller.abort();
          setSubmitted(false);
          setSubmitError(true);
          setSubmitErrorMes(["Unable to submit data. Please try again."]);
          setButtonColor(true);
        }, 15000);

        if (!navigator.onLine) {
          setSubmitted(false);
          setSubmitError(true);
          setSubmitErrorMes(["Can't connect to the server."]);
          clearTimeout(timeout);
          setButtonColor(true);
          return;
        }
        //console.log(Object.fromEntries(bodyData.entries()));

        //✅ Fetch to appropriate endpoint
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {},
          body: bodyData,
          signal: controller.signal,
        });
        console.log(response);
        if (!response) {
          clearTimeout(timeout);
          setSubmitted(false);
          setSubmitError(true);
          setSubmitErrorMes(["No response from server"]);
          setButtonColor(true);
          return;
        }

        const ServerRes = await response.json();

        if (ServerRes.status === "failed") {
          clearTimeout(timeout);
          setSubmitted(false);
          setSubmitError(true);
          setSubmitErrorMes([ServerRes.message]);
          setButtonColor(true);
          return;
        }

        if (ServerRes.errors) {
          const list = Object.values(ServerRes.errors).map((e) => e[0]);
          clearTimeout(timeout);
          setSubmitted(false);
          setSubmitError(true);
          setSubmitErrorMes(list);
          setButtonColor(true);
          return;
        }

        clearTimeout(timeout);
        const { student } = ServerRes;
        getData(student);
        setMessage(disMessage);
        submisssion(true);
      }
    } catch (error) {
      //console.error("Error submitting data:", error);
    }
  };
  if (roll) {
    return <></>;
  }
  // Components
  return (
    <>
      <div className="fs-5 mt-2 mb-4">Student Information</div>
      {/* FORM FIELDS */}
      <form className={`row g-3 mb-5`} onSubmit={handleSubmit}>
        {/* Surname */}
        <div className="col-md-4">
          <label htmlFor="validationSurname" className="form-label">
            Surname
          </label>
          <input
            name="last_name"
            type="text"
            value={formData.last_name}
            className={`form-control ${
              validation.last_name ? "is-valid" : "is-invalid"
            }`}
            id="validationSurname"
            onChange={handleChange}
            required
          />
          <div className="valid-feedback">Good!</div>
          <div className="invalid-feedback">Invalid surname!</div>
        </div>

        {/* Firstname */}
        <div className="col-md-4">
          <label htmlFor="validationFirstname" className="form-label">
            First Name
          </label>
          <input
            name="first_name"
            type="text"
            value={formData.first_name}
            className={`form-control ${
              validation.first_name ? "is-valid" : "is-invalid"
            }`}
            id="validationFirstname"
            onChange={handleChange}
            required
          />
          <div className="valid-feedback">Good!</div>
          <div className="invalid-feedback">Invalid first name!</div>
        </div>

        {/* Middlename */}
        <div className="col-md-4">
          <label htmlFor="validationMiddlename" className="form-label">
            Middle Name
          </label>
          <input
            name="middle_name"
            type="text"
            value={formData.middle_name}
            className={`form-control ${
              validation.middle_name ? "is-valid" : "is-invalid"
            }`}
            id="validationMiddlename"
            onChange={handleChange}
          />
          <div className="valid-feedback">Good!</div>
          <div className="invalid-feedback">Invalid middle name!</div>
        </div>

        {/* Matric Number */}
        <div className="col-md-4">
          <label htmlFor="validationRegNumber" className="form-label">
            Matric Number
          </label>
          <input
            name="reg_number"
            type="text"
            value={formData.reg_number}
            disabled={isToken}
            className={`form-control ${
              validation.reg_number ? "is-valid" : "is-invalid"
            }`}
            id="validationRegNumber"
            onChange={handleChange}
            required
          />
          <div className="valid-feedback">Good!</div>
          <div className="invalid-feedback">Invalid matric number!</div>
        </div>

        {/* Level */}
        <div className="col-md-4">
          <label htmlFor="validationCountry" className="form-label">
            Level
          </label>
          <select
            name="level"
            value={formData.level}
            className={`form-select ${
              validation.level ? "is-valid" : "is-invalid"
            }`}
            id="validationLevel"
            onChange={handleChange}
            required
          >
            <option selected disabled value="">
              Select...
            </option>
            {[100, 200, 300, 400, 500].map((level, index) => {
              return <option key={index}>{level}</option>;
            })}
          </select>
          <div className="valid-feedback">Good!</div>
          <div className="invalid-feedback">Please select a level.</div>
        </div>

        {/* Date of Birth */}
        <div className="col-md-4">
          <label htmlFor="validationDob" className="form-label">
            Date of Birth
          </label>
          <input
            name="date_of_birth"
            type="date"
            value={formData.date_of_birth}
            className={`form-control ${
              validation.date_of_birth ? "is-valid" : "is-invalid"
            }`}
            id="validationDob"
            onChange={handleChange}
            required
          />
          <div className="valid-feedback">Good!</div>
          <div className="invalid-feedback">Please select a valid date.</div>
        </div>

        {/* Gender Selection */}
        <div className="col-md-12">
          <label className="form-label d-block">Sex</label>

          <div className="d-flex gap-3">
            <div className="form-check">
              <input
                className={`form-check-input ${
                  validation.gender ? "is-valid" : "is-invalid"
                }`}
                type="radio"
                name="gender"
                id="genderMale"
                value="Male"
                checked={formData.gender === "Male"}
                onChange={handleChange}
                required
              />
              <label className="form-check-label" htmlFor="genderMale">
                Male
              </label>
            </div>
            <div className="form-check">
              <input
                className={`form-check-input ${
                  validation.gender ? "is-valid" : "is-invalid"
                }`}
                type="radio"
                name="gender"
                id="genderFemale"
                value="Female"
                checked={formData.gender === "Female"}
                onChange={handleChange}
                required
              />
              <label className="form-check-label" htmlFor="genderFemale">
                Female
              </label>
            </div>
          </div>

          {!validation.gender && (
            <div className="invalid-feedback d-block">
              Please select a gender.
            </div>
          )}
          {validation.gender && (
            <div className="valid-feedback d-block">Good!</div>
          )}
        </div>

        {/* Email */}
        <div className="col-md-8">
          <label htmlFor="validationEmail" className="form-label">
            Email
          </label>
          <input
            name="email"
            type="email"
            disabled={isToken}
            value={formData.email}
            className={`form-control ${
              validation.email ? "is-valid" : "is-invalid"
            }`}
            id="validationEmail"
            onChange={handleChange}
            required
          />
          <div className="valid-feedback">Good!</div>
          <div className="invalid-feedback">Invalid email!</div>
        </div>

        {/* Phone Number */}
        <div className="col-md-4">
          <label htmlFor="validationPhone" className="form-label">
            Phone Number
          </label>
          <input
            name="phone_number"
            type="tel"
            value={formData.phone_number}
            className={`form-control ${
              validation.phone_number ? "is-valid" : "is-invalid"
            }`}
            id="validationPhoneNumber"
            onChange={handleChange}
            required
          />
          <div className="valid-feedback">Good!</div>
          <div className="invalid-feedback">Invalid Phone Number!</div>
        </div>

        {/* Permanent Address */}
        <div className="col-md-12 ">
          <label htmlFor="validationAddress" className="form-label">
            Permanent Address
          </label>
          <input
            name="permanent_address"
            type="text"
            value={formData.permanent_address}
            className={`form-control ${
              validation.permanent_address ? "is-valid" : "is-invalid"
            }`}
            id="validationPermanentAddress"
            onChange={handleChange}
            required
          />
          <div className="valid-feedback">Good!</div>
          <div className="invalid-feedback">Invalid Address!</div>
        </div>

        {/* Nationality */}
        <div className="col-md-4">
          <label htmlFor="validationCountry" className="form-label">
            Nationality
          </label>
          <select
            name="nationality"
            value={formData.nationality}
            className={`form-select ${
              validation.nationality ? "is-valid" : "is-invalid"
            }`}
            id="validationCountry"
            onChange={handleChange}
            required
          >
            <option disabled value="">
              Select...
            </option>
            {listOfCountry ? (
              listOfCountry.map((country, index) => (
                <option key={index} value={country}>
                  {country}
                </option>
              ))
            ) : (
              <></>
            )}
          </select>
          <div className="valid-feedback">Good!</div>
          <div className="invalid-feedback">Please select a country!</div>
        </div>

        {/* State of Origin */}
        <div className="col-md-4">
          <label htmlFor="validationState" className="form-label">
            State of Origin
          </label>
          <select
            name="state_of_origin"
            value={formData.state_of_origin}
            className={`form-select ${
              validation.state_of_origin ? "is-valid" : "is-invalid"
            }`}
            id="validationStateOrigin"
            onChange={handleChange}
            required
          >
            <option disabled value="">
              Select...
            </option>
            {listOfStateOrigin ? (
              listOfStateOrigin.map((state, index) => (
                <option key={index} value={state}>
                  {state}
                </option>
              ))
            ) : (
              <></>
            )}
          </select>
          <div className="valid-feedback">Good!</div>
          <div className="invalid-feedback">Please select a state!</div>
        </div>

        {/* Local Government of Origin */}
        <div className="col-md-4">
          <label htmlFor="validationCountry" className="form-label">
            Local Government of Origin
          </label>
          <select
            name="lga_of_origin"
            value={formData.lga_of_origin}
            className={`form-select ${
              validation.lga_of_origin ? "is-valid" : "is-invalid"
            }`}
            id="validationLGAOrigin"
            onChange={handleChange}
            required
          >
            <option disabled value="">
              Select...
            </option>
            {listOfLocalGovtOrigin ? (
              listOfLocalGovtOrigin.map((lga, index) => (
                <option key={index} value={lga}>
                  {lga}
                </option>
              ))
            ) : (
              <></>
            )}
          </select>
          <div className="valid-feedback">Good!</div>
          <div className="invalid-feedback">
            Please select a local government!
          </div>
        </div>

        {/* Accommodation */}
        <div className="col-md-12">
          <label className="form-label d-block">Accommodation</label>

          <div className="d-flex gap-3">
            <div className="form-check">
              <input
                className={`form-check-input ${
                  validation.accommodation ? "is-valid" : "is-invalid"
                }`}
                type="radio"
                name="accommodation"
                id="hostel"
                value="Hostel"
                checked={formData.accommodation === "Hostel"}
                onChange={handleChange}
                required
              />
              <label className="form-check-label" htmlFor="genderMale">
                Hostel
              </label>
            </div>
            <div className="form-check">
              <input
                className={`form-check-input ${
                  validation.accommodation ? "is-valid" : "is-invalid"
                }`}
                type="radio"
                name="accommodation"
                id="off-Campus"
                value="Off-Campus"
                checked={formData.accommodation === "Off-Campus"}
                onChange={handleChange}
                required
              />
              <label className="form-check-label" htmlFor="genderFemale">
                Off-Campus
              </label>
            </div>
          </div>
          {!validation.accommodation && (
            <div className="invalid-feedback d-block">
              Please select an accommodation.
            </div>
          )}
          {validation.accommodation && (
            <div className="valid-feedback d-block">Good!</div>
          )}
        </div>

        {/*Residential Address */}
        <div className="col-md-12">
          <label htmlFor="validationAddress" className="form-label">
            Residential Address
          </label>
          <input
            name="residential_address"
            type="text"
            value={formData.residential_address}
            className={`form-control ${
              validation.residential_address ? "is-valid" : "is-invalid"
            }`}
            id="validationResidentialAddress"
            onChange={handleChange}
            required
          />
          <div className="valid-feedback">Good!</div>
          <div className="invalid-feedback">Invalid Address!</div>
        </div>

        {/* Religion */}
        <div className="col-md-4">
          <label htmlFor="validationReligion" className="form-label">
            Religion
          </label>
          <select
            name="religion"
            value={formData.religion}
            className={`form-select ${
              validation.religion ? "is-valid" : "is-invalid"
            }`}
            id="validationReligion"
            onChange={handleChange}
            required
          >
            <option disabled value="">
              Select...
            </option>
            {["Christianity", "Islam", "Traditional Religion", "Other"].map(
              (religion, index) => {
                return (
                  <option key={index} value={religion}>
                    {religion}
                  </option>
                );
              }
            )}
          </select>
          <div className="valid-feedback">Good!</div>
          <div className="invalid-feedback">Please select a religion!</div>
        </div>

        {/* State of Residence */}
        <div className="col-md-4">
          <label htmlFor="validationCountry" className="form-label">
            State of Residence
          </label>
          <select
            name="state_of_residence"
            value={formData.state_of_residence}
            className={`form-select ${
              validation.state_of_residence ? "is-valid" : "is-invalid"
            }`}
            id="validationStateResidence"
            onChange={handleChange}
            required
          >
            <option disabled value="">
              Select...
            </option>
            {listOfState ? (
              listOfState.map((state, index) => (
                <option key={index} value={state}>
                  {state}
                </option>
              ))
            ) : (
              <></>
            )}
          </select>
          <div className="valid-feedback">Good!</div>
          <div className="invalid-feedback">Please select a state!</div>
        </div>

        {/* Local Government of Residence */}
        <div className="col-md-4">
          <label htmlFor="validationCountry" className="form-label">
            Local Government of Residence
          </label>
          <select
            name="lga_of_residence"
            value={formData.lga_of_residence}
            className={`form-select ${
              validation.lga_of_residence ? "is-valid" : "is-invalid"
            }`}
            id="validationLGAResidence"
            onChange={handleChange}
            required
          >
            <option disabled value="">
              Select...
            </option>
            {listOfLocalGovtResi ? (
              listOfLocalGovtResi.map((lga, index) => (
                <option key={index} value={lga}>
                  {lga}
                </option>
              ))
            ) : (
              <></>
            )}
          </select>
          <div className="valid-feedback">Good!</div>
          <div className="invalid-feedback">
            Please select a local government!
          </div>
        </div>

        {/* Guardian Name */}
        <div className="col-md-4">
          <label htmlFor="validationGuardianname" className="form-label">
            Guardian Name
          </label>
          <input
            name="guardian_name"
            type="text"
            value={formData.guardian_name}
            className={`form-control ${
              validation.guardian_name ? "is-valid" : "is-invalid"
            }`}
            id="validationGuardianname"
            onChange={handleChange}
            required
          />
          <div className="valid-feedback">Good!</div>
          <div className="invalid-feedback">Invalid guardian name!</div>
        </div>

        {/* Guardian Phone Number */}
        <div className="col-md-4">
          <label htmlFor="validationGuardianPhone" className="form-label">
            Guardian Phone Number
          </label>
          <input
            name="guardian_phone_number"
            type="tel"
            value={formData.guardian_phone_number}
            className={`form-control ${
              validation.guardian_phone_number ? "is-valid" : "is-invalid"
            }`}
            id="validationGuardianPhone"
            onChange={handleChange}
            required
          />
          <div className="valid-feedback">Good!</div>
          <div className="invalid-feedback">Invalid guardian phone Number!</div>
        </div>

        {/* Guardian Email */}
        <div className="col-md-4">
          <label htmlFor="validationGuardianEmail" className="form-label">
            Guardian Email
          </label>
          <input
            name="guardian_email"
            type="email"
            value={formData.guardian_email}
            className={`form-control ${
              validation.guardian_email ? "is-valid" : "is-invalid"
            }`}
            id="validationGuardianEmail"
            onChange={handleChange}
            required
          />
          <div className="valid-feedback">Good!</div>
          <div className="invalid-feedback">Invalid guardian email!</div>
        </div>

        {/* Image Upload */}

        {!isToken && (
          <div className="col-md-12">
            <label htmlFor="imageUpload" className="form-label">
              Upload Passport Image (Max 2MB)
            </label>
            <input
              name="passport_image"
              type="file"
              className={`form-control ${
                validation.passport_image ? "is-valid" : "is-invalid"
              }`}
              id="imageUpload"
              accept="image/*"
              onChange={handleFileChange}
              disabled={isToken}
            />
            {!validation.file && (
              <div className="invalid-feedback">{errorMessage}</div>
            )}

            {validation.file && <div className="valid-feedback">Good!</div>}
          </div>
        )}

        {/* Suggestions */}
        <div className={`col-md-12`}>
          <label htmlFor="validationSuggestion" className="form-label">
            {"Suggestions for the Department (Anonymous Feedback)"}
          </label>
          <textarea
            rows={6}
            name="feedback"
            type="text"
            value={formData.feedback}
            className={`form-control ${classes.height} ${
              validation.feedback ? "is-valid" : "is-invalid"
            }`}
            id="validationSuggestion"
            onChange={handleChange}
            required
          />

          {validation.feedback && (
            <div className="valid-feedback d-flex">
              Good!
              <div className="ms-auto">{formData.feedback.length}/1000</div>
            </div>
          )}

          {!validation.feedback && (
            <div className="invalid-feedback d-flex">
              Write a feedback or suggestion for the Department!
              <div className="ms-auto">{formData.feedback.length}/1000</div>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="col-12 col-md-4 mt-4 mb-0 text-center">
          <button
            className={`btn ${
              buttonColor ? classes.greenButton : classes.greyButton
            }  w-100`}
            type="submit"
          >
            {!submitted ? (
              "Submit"
            ) : (
              <div
                className={`spinner-border text-secondary ${classes.smallSpinner}`}
                role="status"
              ></div>
            )}
          </button>
        </div>
      </form>
    </>
  );
}

/*
LIST OF FIELDS
last_name (String)
first_name (String)
middle_name (String)
reg_number (String)
level (String)
date_of_birth (String)
gender (String)
email (String)
phone_number (Number)
permanent_address (String)
nationality (String)
state_of_origin (String)
lga_of_origin (String)
accommodation (String)
residential_address (String)
religion (String)
state_of_residence (String)
lga_of_residence (String)
guardian_name (String)
guardian_phone_number (Number)
guardian_email (String)
suggestion (String)
file (Image)
*/
