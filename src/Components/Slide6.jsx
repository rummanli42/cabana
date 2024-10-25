import React, { useEffect, useRef, useState } from "react";

const Slide6 = ({ onNext, onBack }) => {
  const [formData, setFormData] = useState({
    personFirstName: "",
    personLastName: "",
    personEmail: "",
    personPhone: "",
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [errors, setErrors] = useState({});
  const firstNameInputRef = useRef(null);
  const lastNameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const phoneInputRef = useRef(null);

  useEffect(() => {
    const { personFirstName, personLastName, personEmail, personPhone } =
      formData;
    const isFirstNameValid =
      !personFirstName || /^[a-zA-Z\s'-]{2,}$/.test(personFirstName);
    const isLastNameValid =
      !personLastName || /^[a-zA-Z\s'-]{2,}$/.test(personLastName);
    const isEmailValid =
      !personEmail || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personEmail);
    const isPhoneValid = personPhone;

    setIsFormValid(
      // personFirstName &&
      //   personLastName &&
        personEmail &&
        // personPhone &&
        // isFirstNameValid &&
        // isLastNameValid &&
        isEmailValid 
        // &&
        // isPhoneValid
    );

    setErrors({
      // personFirstName:
      //   personFirstName && !isFirstNameValid ? "Invalid first name format" : "",
      // personLastName:
      //   personLastName && !isLastNameValid ? "Invalid last name format" : "",
      personEmail: personEmail && !isEmailValid ? "Invalid email format" : "",
      // personPhone: personPhone && !isPhoneValid ? "Invalid phone format" : "",
    });
  }, [formData]);

  const handleButtonClick = (e) => {
  
    if (!isFormValid) {
      e.preventDefault();
      setErrors((prevErrors) => ({
        ...prevErrors,
        personEmail: "Invalid name format",
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
          <h1>We'll need to see your pool in person</h1>
          <div className="subtitle">
            <span>
              We'll reach out to schedule a time to come by, conduct some
              <div className="text-br p-0" />
              tests, and help get you back to clear in no time!
            </span>
          </div>
        </div>
        <div className="field-mini-wrap">
          {/* <div className="row">
            <div className="col-md-6">
              <div className="input-container form-floating position-relative input-box">
                <input
                  className={`form-control input-field pac-target-input ${
                    errors.personFirstName ? "invalid-field" : ""
                  }`}
                  placeholder="First name"
                  name="personFirstName"
                  id="personFirstName"
                  value={formData.personFirstName}
                  ref={firstNameInputRef}
                  onChange={handleInputChange}
                  aria-invalid={!!errors.personFirstName}
                  pattern="[a-zA-Z\s'-]{2,}"
                  title="First name should be at least 2 characters long and contain only letters, spaces, apostrophes, or hyphens."
                  required
                />
                <label htmlFor="personFirstName">First name</label>
              </div>
            </div>
            <div className="col-md-6">
              <div className="input-container form-floating position-relative input-box">
                <input
                  className={`form-control input-field pac-target-input ${
                    errors.personLastName ? "invalid-field" : ""
                  }`}
                  placeholder="Last name"
                  name="personLastName"
                  id="personLastName"
                  value={formData.personLastName}
                  ref={lastNameInputRef}
                  onChange={handleInputChange}
                  aria-invalid={!!errors.personLastName}
                  pattern="[a-zA-Z\s'-]{2,}"
                  title="Last name should be at least 2 characters long and contain only letters, spaces, apostrophes, or hyphens."
                  required
                />
                <label htmlFor="personLastName">Last name</label>
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
                  name="personEmail"
                  id="personEmail"
                  type="email"
                  value={formData.personEmail}
                  ref={emailInputRef}
                  onChange={handleInputChange}
                  aria-invalid={!!errors.personEmail}
                  pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
                  title="Email should be in the format: example@example.com."
                  required
                />
                <label htmlFor="personEmail">Email</label>
              </div>
            </div>
            {/* <div className="col-md-6">
              <div className="input-container form-floating position-relative input-box">
                <input
                  className={`form-control input-field pac-target-input ${
                    errors.phone ? "invalid-field" : ""
                  }`}
                  placeholder="Phone"
                  name="personPhone"
                  id="personPhone"
                  type="text"
                  value={formData.personPhone}
                  ref={phoneInputRef}
                  onChange={handleInputChange}
                  aria-invalid={!!errors.personPhone}
                  required
                />
                <label htmlFor="personPhone">Phone</label>
              </div>
            </div> */}
          </div>
        </div>
        <button type="submit" className={`btn btn-next ${
            !isFormValid
              ? "button-disabled"
              : ""
          }`} onClick={handleButtonClick} >
          Next
        </button>
        <input type="hidden" id="progress_slide_1" data-width="75%"/>
      </form>
    </div>
  );
};

export default Slide6;
