import React, { useEffect, useRef, useState } from "react";
import { FaLock } from "react-icons/fa6";

const Slide2 = ({ onNext, onBack }) => {
  const [formData, setFormData] = useState({
    street: "",
    unit: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const [errors, setErrors] = useState({});
  const streetInputRef = useRef(null);
  const unitInputRef = useRef(null);
  const cityInputRef = useRef(null);
  const zipcodeInputRef = useRef(null);
  const stateInputRef = useRef(null);

  useEffect(() => {
    const { street, city, state, zipCode } = formData;
    const isStreetValid = !street || /^[a-zA-Z0-9\s,.'-]{3,}$/.test(street);
    const isCityValid = !city || /^[a-zA-Z\s,.'-]{2,}$/.test(city);
    const isStateValid = !state || /^[a-zA-Z\s,.'-]{2,}$/.test(state);
    const isZipCodeValid = zipCode.trim() !== "";

    setIsFormValid(
      street &&
        city &&
        state &&
        zipCode &&
        isStreetValid &&
        isCityValid &&
        isStateValid &&
        isZipCodeValid
    );

    setErrors({
      street: street && !isStreetValid ? "Invalid street format" : "",
      city: city && !isCityValid ? "Invalid city format" : "",
      state: state && !isStateValid ? "Invalid state format" : "",
      zipCode: zipCode && !isZipCodeValid ? "Required zip code" : "",
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
    const { street, city, state, zipCode } = formData;
  
    const isStreetValid = street;
    const isCityValid = city;
    const isStateValid = state;
    const isZipCodeValid = zipCode.trim() !== "";
  
    if (!isStreetValid) {
      e.preventDefault();
      setErrors((prevErrors) => ({
        ...prevErrors,
        street: "Invalid street format",
      }));
      // streetInputRef.current.classList.add("invalid-field");
    }
  
    if (!isCityValid) {
      e.preventDefault();
      setErrors((prevErrors) => ({
        ...prevErrors,
        city: "Invalid city format",
      }));
    }
    if (!isStateValid) {
      e.preventDefault();
      setErrors((prevErrors) => ({
        ...prevErrors,
        state: "Invalid state format",
      }));
    }
    if (!isZipCodeValid) {
      e.preventDefault();
      setErrors((prevErrors) => ({
        ...prevErrors,
        zipCode: "Required zip code",
      }));
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      window.scrollTo(0, 0);
      onNext("manualAddress", formData);
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
          <h1>No worries. Let's try it this way</h1>
        </div>
        <div className="field-mini-wrap">
          <div className="row">
            <div className="col-md-7">
              <div className="input-container form-floating position-relative input-box">
                <input
                  className={`form-control input-field pac-target-input ${
                    errors.street ? "invalid-field" : ""
                  }`}
                  placeholder="Enter a street"
                  name="street"
                  value={formData.street}
                  ref={streetInputRef}
                  id="street"
                  pattern="^[a-zA-Z0-9\s,.'-]{3,}$"
                  onChange={handleInputChange}
                  aria-invalid={!!errors.street}
                />
                <label htmlFor="street">Street</label>
              </div>
            </div>
            <div className="col-md-5">
              <div className="input-container form-floating position-relative input-box">
                <input
                  className={`form-control input-field pac-target-input`}
                  placeholder="Enter a Apt/Unit"
                  name="unit"
                  value={formData.unit}
                  ref={unitInputRef}
                  id="unit"
                  onChange={handleInputChange}
                />
                <label htmlFor="unit">Apt/Unit</label>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="input-container form-floating position-relative input-box">
                <input
                  className={`form-control input-field pac-target-input ${
                    errors.city ? "invalid-field" : ""
                  }`}
                  placeholder="Enter a city"
                  name="city"
                  value={formData.city}
                  ref={cityInputRef}
                  id="city"
                  pattern="^[a-zA-Z\s,.'-]{2,}$"
                  onChange={handleInputChange}
                  aria-invalid={!!errors.city}
                />
                <label htmlFor="city">City</label>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-5">
              <div className="input-container form-floating position-relative input-box">
                <input
                  className={`form-control input-field pac-target-input ${
                    errors.state ? "invalid-field" : ""
                  }`}
                  placeholder="Enter a state"
                  name="state"
                  value={formData.state}
                  ref={stateInputRef}
                  id="state"
                  pattern="^[a-zA-Z\s,.'-]{2,}$"
                  onChange={handleInputChange}
                  aria-invalid={!!errors.state}
                />
                <label htmlFor="state">State</label>
              </div>
            </div>
            <div className="col-md-7">
              <div className="input-container form-floating position-relative input-box">
                <input
                  className={`form-control input-field pac-target-input ${
                    errors.zipCode ? "invalid-field" : ""
                  }`}
                  type="text"
                  placeholder="Enter a zip code"
                  name="zipCode"
                  value={formData.zipCode}
                  id="zipCode"
                  ref={zipcodeInputRef}
                  aria-invalid={!!errors.zipCode}
                  onChange={handleInputChange}
                  inputMode="numeric"
                  required
                />
                <label htmlFor="zipCode">Zip code</label>
              </div>
            </div>
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
        <input type="hidden" id="progress_slide_1" data-width="15%"/>
      </form>
    </div>
  );
};

export default Slide2;
