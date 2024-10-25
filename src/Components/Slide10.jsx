import React, { useEffect, useRef, useState } from "react";

const Slide10 = ({ onNext, onBack }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [errors, setErrors] = useState({});
  const firstNameInputRef = useRef(null);
  const lastNameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const phoneInputRef = useRef(null);

  useEffect(() => {
    const { firstName, lastName, email, phone } = formData;
    const isFirstNameValid = !firstName || /^[a-zA-Z\s'-]{2,}$/.test(firstName);
    const isLastNameValid = !lastName || /^[a-zA-Z\s'-]{2,}$/.test(lastName);
    const isEmailValid = !email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isPhoneValid = phone;

    setIsFormValid(
      // firstName &&
      //   lastName &&
        email &&
        // phone &&
        // isFirstNameValid &&
        // isLastNameValid &&
        isEmailValid 
        // &&
        // isPhoneValid
    );

    setErrors({
      // firstName:
      //   firstName && !isFirstNameValid ? "Invalid first name format" : "",
      // lastName: lastName && !isLastNameValid ? "Invalid last name format" : "",
      email: email && !isEmailValid ? "Invalid email format" : "",
      // phone: phone && !isPhoneValid ? "Invalid phone format" : "",
    });
  }, [formData]);

  const handleButtonClick = (e) => {
    
  
    const { firstName, lastName, email, phone } = formData;
  
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  
    if (!isEmailValid) {
      e.preventDefault();
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Invalid name format",
      }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
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
          <h1>We don't clean above ground pools</h1>
          <div className="subtitle">
            <span>
              <div className="user-name"></div>However, we'd be happy to provide a regular chemical
              <div className="text-br p-0" />
              service to keep your water clear year-round.
            </span>
          </div>
          <div className="subtitle-text">
            <span>Where can we send your quote?</span>
          </div>
        </div>
        <div className="field-mini-wrap">
          {/* <div className="row">
            <div className="col-md-6">
              <div className="input-container form-floating position-relative input-box">
                <input
                  className={`form-control input-field pac-target-input ${
                    errors.firstName ? "invalid-field" : ""
                  }`}
                  placeholder="First name"
                  name="firstName"
                  id="firstName"
                  value={formData.firstName}
                  ref={firstNameInputRef}
                  onChange={handleInputChange}
                  aria-invalid={!!errors.firstName}
                  pattern="[a-zA-Z\s'-]{2,}"
                  title="First name should be at least 2 characters long and contain only letters, spaces, apostrophes, or hyphens."
                  required
                />
                <label htmlFor="firstName">First name</label>
              </div>
            </div>
            <div className="col-md-6">
              <div className="input-container form-floating position-relative input-box">
                <input
                  className={`form-control input-field pac-target-input ${
                    errors.lastName ? "invalid-field" : ""
                  }`}
                  placeholder="Last name"
                  name="lastName"
                  id="lastName"
                  value={formData.lastName}
                  ref={lastNameInputRef}
                  onChange={handleInputChange}
                  aria-invalid={!!errors.lastName}
                  pattern="[a-zA-Z\s'-]{2,}"
                  title="Last name should be at least 2 characters long and contain only letters, spaces, apostrophes, or hyphens."
                  required
                />
                <label htmlFor="lastName">Last name</label>
              </div>
            </div>
          </div> */}
          <div className="row">
            <div className="col-md-12">
              <div className="input-container form-floating position-relative input-box">
                <input
                  className={`form-control input-field pac-target-input ${
                    errors.email ? "invalid-field" : ""
                  }`}
                  placeholder="Enter an email"
                  name="email"
                  id="email"
                  type="email"
                  value={formData.email}
                  ref={emailInputRef}
                  onChange={handleInputChange}
                  aria-invalid={!!errors.email}
                  pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
                  title="Email should be in the format: example@example.com."
                />
                <label htmlFor="email">Email</label>
              </div>
            </div>
            {/* <div className="col-md-6">
              <div className="input-container form-floating position-relative input-box">
                <input
                  className={`form-control input-field pac-target-input ${
                    errors.phone ? "invalid-field" : ""
                  }`}
                  placeholder="Phone"
                  name="phone"
                  id="phone"
                  type="text"
                  value={formData.phone}
                  ref={phoneInputRef}
                  onChange={handleInputChange}
                  aria-invalid={!!errors.phone}
                  required
                />
                <label htmlFor="phone">Phone</label>
              </div>
            </div> */}
          </div>
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

export default Slide10;
