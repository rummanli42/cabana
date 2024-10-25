import React, { useEffect, useState } from "react";

const Slide5 = ({ onNext, onBack, onCommercialClick }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [somethingElseSelected, setSomethingElseSelected] = useState(false);
  const [somethingElseValue, setSomethingElseValue] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [errors, setErrors] = useState({});
  useEffect(() => {
    const isselectedOptionsValid = selectedOptions;
    if(isselectedOptionsValid){
      setErrors({
        regular_pool_spa_service: selectedOptions ? "" : "Invalid name format"
      });
    }
  }, [selectedOptions]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      window.scrollTo(0, 0);
      onNext(selectedOptions, {
        service: selectedOptions,
        serviceSomethingElse: somethingElseValue,
      });
    }
  };
  const handleButtonClick = (e) => {
  
    if (!isFormValid) {
      e.preventDefault();
      setErrors((prevErrors) => ({
        ...prevErrors,
        regular_pool_spa_service: "Invalid name format",
      }));
    }
  };
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (value === "something_else") {
      setSomethingElseSelected(e.target.checked);
    }
    let updatedOptions;
    if (checked) {
      if (selectedOptions === null || selectedOptions.length === 0) {
        updatedOptions = [value];
      } else {
        updatedOptions = [...selectedOptions, value];
      }
    } else {
      updatedOptions = selectedOptions.filter((option) => option !== value);
    }
    setSelectedOptions(updatedOptions);
    setIsFormValid(updatedOptions.length > 0 );
  };

  const handleSomethingElseChange = (e) => {
    setSomethingElseValue(e.target.value);
    setIsFormValid(e.target.value.trim() !== "");
  };

  const handleCommercialClick = () => {  
    onCommercialClick();  
  };  
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="step-section">
          <h1>What can we help you with?</h1>
          <div className="subtitle">
            <span>Cleaning, chemicals, repairs. We do it all.</span>
          </div>
        </div>
        <div className="checkbox-section-mini">
        <div className="row slide-left">
          <div className="col-md-12">
            <div className={`border-slide5 ${
              errors.regular_pool_spa_service ? 'invalid-field' : ''
            }`}>
              <div className="form-check p-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="regular_pool_spa_service"
                  value="regular_pool_spa_service"
                  name="service"
                  onChange={handleCheckboxChange}
                />
                <label
                  className="form-check-label checkbox"
                  htmlFor="regular_pool_spa_service"
                >
                  Regular pool or spa service
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="row slide-left">
          <div className="col-md-12">
            <div className={`border-slide5 ${
              errors.regular_pool_spa_service ? 'invalid-field' : ''
            }`}>
              <div className="form-check p-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="equipment_repair"
                  value="equipment_repair"
                  name="service"
                  onChange={handleCheckboxChange}
                />
                <label
                  className="form-check-label checkbox"
                  htmlFor="equipment_repair"
                >
                  Equipment upgrade or repair
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="row slide-left">
          <div className="col-md-12">
            <div className={`border-slide5 ${
              errors.regular_pool_spa_service ? 'invalid-field' : ''
            }`}>
              <div className="form-check p-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="filter_or_salt_cell_cleaning"
                  value="filter_or_salt_cell_cleaning"
                  name="service"
                  onChange={handleCheckboxChange}
                />
                <label
                  className="form-check-label checkbox"
                  htmlFor="filter_or_salt_cell_cleaning"
                >
                  Filter or salt cell cleaning
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="row slide-left">
          <div className="col-md-12">
            <div className={`border-slide5 ${
              errors.regular_pool_spa_service ? 'invalid-field' : ''
            }`}>
              <div className="form-check p-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="greentoclean"
                  value="greentoclean"
                  name="service"
                  onChange={handleCheckboxChange}
                />
                <label
                  className="form-check-label checkbox"
                  htmlFor="greentoclean"
                >
                  "Green to clean" pool rescue
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="row slide-left">
          <div className="col-md-12">
            <div className={`border-slide-empty ${
              errors.regular_pool_spa_service ? 'invalid-field' : ''
            }`}>
              <div className="form-check p-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="something_else"
                  value="something_else"
                  onChange={handleCheckboxChange}
                  name="service"
                />
                <label
                  className="form-check-label checkbox"
                  htmlFor="something_else"
                >
                  Something else
                </label>
              </div>
            </div>
          </div>
        </div>
        {somethingElseSelected && (
          <div className="row slide-left">
            <div className="col-md-12">
              <div className="border-slide5-empty ${
              errors.regular_pool_spa_service ? 'invalid-field' : ''
            }`">
                <div className="empty-box input-box">
                  <input
                    className={`form-control pac-target-input`}
                    placeholder="How can we help?"
                    name="help"
                    id="help"
                    value={somethingElseValue}
                    onChange={handleSomethingElseChange}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        </div>
        <button type="submit" className={`btn btn-next ${
            !isFormValid
              ? "button-disabled"
              : ""
          }`} onClick={handleButtonClick}>
          Next
        </button>
        {/* <div className="optional-text">  
          <span>Isn't Residential? </span>
          <button  
            type="button"  
            className="residential-button"  
            onClick={handleCommercialClick}  
          >  
            Go to commercial
          </button>  
        </div>   */}
        <input type="hidden" id="progress_slide_1" data-width="45%"/>
      </form>
      <style jsx>{`  
        .optional-text {  
          margin-top: 20px;  
          font-size: 16px;  
          color: #555;  
          text-align: center;  
        }  
        
        .residential-button {  
          background: none;  
          border: none;  
          color: #007bff;  
          text-decoration: underline;  
          cursor: pointer;  
          font-size: 16px;  
          font-family: "Poppins", sans-serif;
        }  

        .residential-button:hover {  
          color: #0056b3;  
        }  
      `}</style>  
    </div>
  );
};

export default Slide5;
