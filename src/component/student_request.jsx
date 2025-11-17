import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import pageSetup from "../component_css/page_setup.module.css";
import classes from "../component_css/staff_sign_in.module.css";

export default function SignIn({ title, purpose }) {
  const [reg_number, setRegNumber] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const validation = /^\d{4}\/\d{6}$/.test(reg_number);
  // Function to validate and submit
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    setError(""); // clear old errors

    // Validate matric number using regex

    if (!validation) {
      setError("Invalid matric number format (e.g., 2020/123456)");
      return;
    }

    try {
      setLoading(true);
      const controller = new AbortController();
      const timeout = setTimeout(() => {
        controller.abort();
      }, 20000);

      const response = await fetch(
        `https://api.eceunn.com/api/student/magic-link`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reg_number: reg_number, purpose: purpose }),
          signal: controller.signal,
        }
      );
      if (!response) {
        clearTimeout(timeout);
        throw new Error("No response from server. Please try again.");
      }
      if (!response.ok) {
        clearTimeout(timeout);
        const errs = await response.json();
        if (errs.errors) {
          throw new Error(errs.errors.reg_number[0]);
        } else if (errs.message) {
          throw new Error(errs.message);
        } else if (errs.error) {
          throw new Error(errs.error);
        }
      }
      const { message } = await response.json();
      clearTimeout(timeout);
      setSuccess(true);
      setSuccessMessage(message);
      setLoading(false);
    } catch (err) {
      if (err.name === "AbortError") {
        setError("Request timed out. Please try again.");
        setLoading(false);
      } else {
        setError(err.message);
        setLoading(false);
      }
    }
  };
  return (
    <div
      className={`px-0 py-5 m-0 d-flex align-items-center ${pageSetup.midSection}`}
    >
      <div
        className={`container-fluid m-0 w-100 h-75 bg-dark bg-opacity-50 ${pageSetup.mainBox} align-items-center`}
      >
        {!success && (
          <form
            className={`${classes.formCon} px-4 py-5 `}
            onSubmit={handleSubmit}
          >
            <h1 className="mb-3 text-center fs-6">{title} your details!</h1>
            <div className="my-3 p-0 mx-0"></div>
            <div className="mb-3">
              <label htmlFor="text" className="form-label">
                Matric Number
              </label>
              <input
                type="text"
                className="form-control"
                id="text"
                value={reg_number}
                placeholder="Enter Your Matric Number"
                onChange={(e) => {
                  setRegNumber(e.target.value);
                  setError("");
                }}
                required
              />

              {validation && error.length == 0 && (
                <div
                  className={`mt-3 text-success d-flex align-items-center justfy-content-center w-100 ${pageSetup.fontLine2}`}
                >
                  <i className="bi bi-emoji-smile me-2"></i>
                  Good!
                </div>
              )}

              {(!validation || error.length > 0) && (
                <div
                  className={`mt-3 text-danger text-start w-100 ${pageSetup.fontLine2}`}
                >
                  <i className="bi bi-emoji-frown me-2"></i>
                  {error ? error : "Invalid matric number!"}
                </div>
              )}
            </div>
            <button type="submit" className=" mt-3 btn w-100">
              {loading ? (
                <div className="spinner-border text-light" role="status"></div>
              ) : (
                "Submit"
              )}
            </button>
          </form>
        )}
        {success && (
          <div className={`${classes.formCon} px-4 py-5 fs-6 text-center`}>
            {successMessage}
          </div>
        )}
      </div>
    </div>
  );
}
