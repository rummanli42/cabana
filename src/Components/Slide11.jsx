import React, { useEffect, useState } from "react";

const Slide11 = ({ onNext, onBack }) => {
  const [selectedOptions, setselectedOptions] = useState(null);
  const [errors, setErrors] = useState({});
  useEffect(() => {
    const isselectedOptionValid = selectedOptions;
    if(isselectedOptionValid){
      setErrors({
        pool_only: selectedOptions == 'small' || selectedOptions == 'medium' || selectedOptions == 'large' ? "" : "Invalid name format"
      });
    }
  }, [selectedOptions]);
  const handleButtonClick = (e) => {
  
    if (!selectedOptions) {
      e.preventDefault();
      setErrors((prevErrors) => ({
        ...prevErrors,
        pool_only: "Invalid street format",
      }));
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    window.scrollTo(0, 0);
    console.log(selectedOptions);
    onNext(selectedOptions, { poolSize2: selectedOptions });
  };

  const handleChange = (e) => {
    setselectedOptions(e.target.value);
  };

  return (
    <>
      <div className="form-container">
        <div className="step-section">
          <h1>How big is your pool?</h1>
          <div className="subtitle">Just your best guess.</div>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="box-container pool-size-section-box">
          <div className={`box  ${
              errors.pool_only ? 'invalid-field' : ''
            }`}>
            {selectedOptions === "small" ? (
              <img src="/images/R2_Pool Icons-17_Small Pool_Colored.svg" alt="C1"  width="119"/>
            ) : (
              <img src="/images/R2_Pool Icons-18_Small Pool_Gray.svg" alt="G1"  width="119"/>
            )}
            <p className="subtile-box">Small<div></div>(roughly 10'x20')</p>
            <label htmlFor="small"></label>
            <input
              id="small"
              type="radio"
              name="pool_size"
              value="small"
              onChange={handleChange}
            />
          </div>
          <div className={`box  ${
              errors.pool_only ? 'invalid-field' : ''
            }`}>
            {selectedOptions === "medium" ? (
              <img src="/images/R2_Pool Icons-19_Medium Pool_Colored.svg" alt="C1"  width="119"/>
            ) : (
              <img src="/images/R2_Pool Icons-20_Medium Pool_Gray.svg" alt="G1"  width="119"/>
            )}
            <p className="subtile-box">Medium<div></div>(roughly 15'x25')</p>
            <label htmlFor="medium"></label>
            <input
              id="medium"
              type="radio"
              name="pool_size"
              value="medium"
              onChange={handleChange}
            />
          </div>
          <div className={`box  ${
              errors.pool_only ? 'invalid-field' : ''
            }`}>
            {selectedOptions === "large" ? (
              <img src="/images/R2_Pool Icons-21_Large Pool_Colored.svg" alt="C1"  width="119"/>
            ) : (
              <img src="/images/R2_Pool Icons-22_Large Pool_Gray.svg" alt="G1"  width="119"/>
            )}
            <p className="subtile-box">Large<div></div>(roughly 20'x 35')</p>
            <label htmlFor="large"></label>
            <input
              id="large"
              type="radio"
              name="pool_size"
              value="large"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-container">
          <button
            type="submit"
            className={`btn btn-next ${
              !selectedOptions
                ? "button-disabled"
                : ""
            }`}
              onClick={handleButtonClick}
          >
            Next
          </button>
          <input type="hidden" id="progress_slide_1" data-width="85%"/>
        </div>
      </form>
    </>
  );
};

export default Slide11;
