import React, { useEffect, useRef, useState } from "react";
import { FaLock } from "react-icons/fa6";

const Slide12 = ({ onNext, onBack }) => {
  const [formData, setFormData] = useState({
    //estimateFirstName: "",
    //estimateLastName: "",
    estimateEmail: "",
    //estimatePhone: "",
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [errors, setErrors] = useState({});
  // const firstNameInputRef = useRef(null);
  // const lastNameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  // const phoneInputRef = useRef(null);

  useEffect(() => {
    const {
      // estimateFirstName,
      // estimateLastName,
      estimateEmail,
      // estimatePhone,
    } = formData;
    // const isFirstNameValid =
    //   !estimateFirstName || /^[a-zA-Z\s'-]{2,}$/.test(estimateFirstName);
    // const isLastNameValid =
    //   !estimateLastName || /^[a-zA-Z\s'-]{2,}$/.test(estimateLastName);
    const isEmailValid =
      !estimateEmail || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(estimateEmail);
    // const isPhoneValid = estimatePhone;

    setIsFormValid(
      // estimateFirstName &&
      //   estimateLastName &&
      //   isPhoneValid &&
      //   estimateEmail &&
      //   estimatePhone &&
      //   isFirstNameValid &&
      //   isLastNameValid &&
      isEmailValid && estimateEmail
    );

    setErrors({
      // estimateFirstName:
      //   estimateFirstName && !isFirstNameValid
      //     ? "Invalid first name format"
      //     : "",
      // estimateLastName:
      //   estimateLastName && !isLastNameValid ? "Invalid last name format" : "",
      estimateEmail:
        estimateEmail && !isEmailValid ? "Invalid email format" : "",
      // estimatePhone:
      //   estimatePhone && !isPhoneValid ? "Invalid phone format" : "",
    });
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleButtonClick = (e) => {
    
  
    const { firstName, lastName, estimateEmail, phone } = formData;
  
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(estimateEmail);
  
    if (!isEmailValid) {
      e.preventDefault();
      setErrors((prevErrors) => ({
        ...prevErrors,
        estimateEmail: "Invalid name format",
      }));
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      window.scrollTo(0, 0);
      onNext("thankYou", formData);
    } else {
      const firstInvalidField = Object.keys(errors).find((key) => errors[key]);
      if (firstInvalidField) {
        document.getElementById(firstInvalidField).focus();
      }
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="step-section">
          <h1>Where can we send your estimate?</h1>
        </div>
        <div className="field-mini-wrap">
          {/* <div className="row">
            <div className="col-md-6">
              <div className="input-container form-floating position-relative input-box">
                <input
                  className={`form-control input-field pac-target-input ${
                    errors.estimateFirstName ? "invalid-field" : ""
                  }`}
                  placeholder="First name"
                  name="estimateFirstName"
                  id="estimateFirstName"
                  value={formData.estimateFirstName}
                  ref={firstNameInputRef}
                  onChange={handleInputChange}
                  aria-invalid={!!errors.estimateFirstName}
                  pattern="[a-zA-Z\s'-]{2,}"
                  title="First name should be at least 2 characters long and contain only letters, spaces, apostrophes, or hyphens."
                  required
                />
                <label htmlFor="estimateFirstName">First name</label>
              </div>
            </div>
            <div className="col-md-6">
              <div className="input-container form-floating position-relative input-box">
                <input
                  className={`form-control input-field pac-target-input ${
                    errors.estimateLastName ? "invalid-field" : ""
                  }`}
                  placeholder="Last name"
                  name="estimateLastName"
                  id="estimateLastName"
                  value={formData.estimateLastName}
                  ref={lastNameInputRef}
                  onChange={handleInputChange}
                  aria-invalid={!!errors.estimateLastName}
                  pattern="[a-zA-Z\s'-]{2,}"
                  title="Last name should be at least 2 characters long and contain only letters, spaces, apostrophes, or hyphens."
                  required
                />
                <label htmlFor="estimateLastName">Last name</label>
              </div>
            </div>
          </div> */}
          <div className="row">
            <div className="col-md-12">
              <div className="input-container form-floating position-relative input-box">
                <input
                  className={`form-control input-field pac-target-input ${
                    errors.estimateEmail ? "invalid-field" : ""
                  }`}
                  placeholder="Email"
                  name="estimateEmail"
                  id="estimateEmail"
                  type="email"
                  value={formData.estimateEmail}
                  ref={emailInputRef}
                  onChange={handleInputChange}
                  aria-invalid={!!errors.estimateEmail}
                  pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
                  title="Email should be in the format: example@example.com."
                />
                <label htmlFor="estimateEmail">Email</label>
              </div>
            </div>
            {/* <div className="col-md-6">
              <div className="input-container form-floating position-relative input-box">
                <input
                  className={`form-control input-field pac-target-input ${
                    errors.estimatePhone ? "invalid-field" : ""
                  }`}
                  placeholder="Phone"
                  name="estimatePhone"
                  id="estimatePhone"
                  type="text"
                  value={formData.estimatePhone}
                  ref={phoneInputRef}
                  onChange={handleInputChange}
                  aria-invalid={!!errors.estimatePhone}
                  required
                />
                <label htmlFor="estimatePhone">Phone</label>
              </div>
            </div> */}
          </div>
        </div>
        <div className="lock-bg">
          <FaLock className="lock-color" />
          <span className="from-lock">Your information is fully secure.</span>
        </div>
        <button type="submit" className={`btn btn-next
          ${
            !isFormValid
              ? "button-disabled"
              : ""
          }
          `}
          onClick={handleButtonClick}>
          Next
        </button>
        <input type="hidden" id="progress_slide_1" data-width="85%"/>
      </form>
    </div>
  );
};

export default Slide12;
