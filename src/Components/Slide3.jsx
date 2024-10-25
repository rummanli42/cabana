import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';

const Slide3 = ({ onNext, onBack }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const isselectedOptionValid = selectedOption;
    console.log(selectedOption);
    if(isselectedOptionValid){
      setErrors({
        residential: selectedOption == 'residential' || selectedOption == 'commercial' ? "" : "Invalid name format"
      });
    }
  }, [selectedOption]);
  const handleSubmit = (e) => {
    e.preventDefault();
    window.parent.postMessage(
          {
            type: "gtag_event",
            pooltype: selectedOption,
          },
          '*'
        );
    window.scrollTo(0, 0);
    onNext(selectedOption, { poolType: selectedOption });
  };
  const handleButtonClick = (e) => {
  
    if (!selectedOption) {
      e.preventDefault();
      setErrors((prevErrors) => ({
        ...prevErrors,
        residential: "Invalid street format",
      }));
    }
  };
  const handleChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <>
      <div className="form-container">
        <div className="step-section">
          <h1>Is this a residential or commercial pool?</h1>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="box-container 3slide">
          <div className={`box ${
              errors.residential ? 'invalid-field' : ''
            }`}>
            {selectedOption === "residential" ? (
              <img
                src="/images/R3_Pool Icon_Residential_Colored.svg"
                alt="C1"
                width="119"
              />
            ) : (
              <img src="/images/R3_Pool Icon_Residential_Gray.svg" alt="G1" width="119" />
            )}
            <p className="subtile-box">Residential</p>
            <label htmlFor="residential"></label>
            <input
              type="radio"
              name="pool-type"
              value="residential"
              onChange={handleChange}
              id="residential"
            />
            <label htmlFor="residential"></label>
          </div>
          <div className={`box ${
              errors.residential ? 'invalid-field' : ''
            }`}>
            {selectedOption === "commercial" ? (
              <img src="/images/R2_Pool Icons_03.svg" alt="C2" width="119" />
            ) : (
              <img src="/images/R2_Pool Icons_04.svg" alt="G2" width="119" />
            )}
            <p className="subtile-box">Commercial</p>
            <label htmlFor="commercial"></label>
            <input
              type="radio"
              name="pool-type"
              value="commercial"
              onChange={handleChange}
              id="commercial"
            />
          </div>
        </div>
        <div className="form-container">
          <button
            type="submit"
            className={`btn btn-next ${
            !selectedOption
              ? "button-disabled"
              : ""
          }`}
            onClick={handleButtonClick}
          >
            Next
          </button>
          <input type="hidden" id="progress_slide_1" data-width="30%"/>
        </div>
      </form>
    </>
  );
};

export default Slide3;
