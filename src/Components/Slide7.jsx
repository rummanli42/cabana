import React, { useEffect, useState } from "react";

const Slide7 = ({ onNext, onBack }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [somethingElseSelected, setSomethingElseSelected] = useState(false);
  const [somethingElseValue, setSomethingElseValue] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [errors, setErrors] = useState({});
  useEffect(() => {
    const isselectedOptionsValid = selectedOptions;
    if(isselectedOptionsValid){
      setErrors({
        pool_pump: selectedOptions ? "" : "Invalid name format"
      });
    }
  }, [selectedOptions]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      window.scrollTo(0, 0);
      onNext(selectedOptions, {
        poolHelp: selectedOptions,
        poolHelpNotSure: somethingElseValue,
      });
    }
  };
  const handleButtonClick = (e) => {
  
    if (!isFormValid) {
      e.preventDefault();
      setErrors((prevErrors) => ({
        ...prevErrors,
        pool_pump: "Invalid name format",
      }));
    }
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (value === "i_m_not_sure") {
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
    setIsFormValid(updatedOptions.length > 0 || somethingElseSelected);
  };

  const handleSomethingElseChange = (e) => {
    setSomethingElseValue(e.target.value);
    setIsFormValid(e.target.value.trim() !== "");
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="step-section">
          <h1>What equipment do you need help with?</h1>
        </div>
        <div className="checkbox-section-mini">
        <div className="row slide-left">
          <div className="col-md-12">
            <div className={`border-slide5 ${
                    errors.pool_pump ? "invalid-field" : ""
                  }`}>
              <div className="form-check p-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="pool_pump"
                  value="pool_pump"
                  name="pool_help"
                  onChange={handleCheckboxChange}
                />
                <label
                  className="form-check-label checkbox"
                  htmlFor="pool_pump"
                >
                  Pool pump
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="row slide-left">
          <div className="col-md-12">
            <div className={`border-slide5 ${
                    errors.pool_pump ? "invalid-field" : ""
                  }`}>
              <div className="form-check p-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="pool_filter"
                  value="pool_filter"
                  name="pool_help"
                  onChange={handleCheckboxChange}
                />
                <label
                  className="form-check-label checkbox"
                  htmlFor="pool_filter"
                >
                  Pool filter
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="row slide-left">
          <div className="col-md-12">
            <div className={`border-slide5 ${
                    errors.pool_pump ? "invalid-field" : ""
                  }`}>
              <div className="form-check p-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="pool_heater"
                  value="pool_heater"
                  name="pool_help"
                  onChange={handleCheckboxChange}
                />
                <label
                  className="form-check-label checkbox"
                  htmlFor="pool_heater"
                >
                  Pool heater
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="row slide-left">
          <div className="col-md-12">
            <div className={`border-slide5 ${
                    errors.pool_pump ? "invalid-field" : ""
                  }`}>
              <div className="form-check p-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="salt_system"
                  value="salt_system"
                  name="pool_help"
                  onChange={handleCheckboxChange}
                />
                <label
                  className="form-check-label checkbox"
                  htmlFor="salt_system"
                >
                  Salt system
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="row slide-left">
          <div className="col-md-12">
            <div className={`border-slide5 ${
                    errors.pool_pump ? "invalid-field" : ""
                  }`}>
              <div className="form-check p-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="automaion_system"
                  value="automaion_system"
                  name="pool_help"
                  onChange={handleCheckboxChange}
                />
                <label
                  className="form-check-label checkbox"
                  htmlFor="automaion_system"
                >
                  Automation system
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="row slide-left">
          <div className="col-md-12">
            <div className={`border-slide-empty ${
                    errors.pool_pump ? "invalid-field" : ""
                  }`}>
              <div className="form-check p-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="i_m_not_sure"
                  value="i_m_not_sure"
                  onChange={handleCheckboxChange}
                  name="pool_help"
                />
                <label
                  className="form-check-label checkbox"
                  htmlFor="i_m_not_sure"
                >
                  I'm not sure / something else
                </label>
              </div>
            </div>
          </div>
        </div>
        {somethingElseSelected && (
          <div className="row slide-left">
            <div className="col-md-12">
              <div className="border-slide5-empty">
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
          }`}
            onClick={handleButtonClick}>
          Next
        </button>
        <input type="hidden" id="progress_slide_1" data-width="52%"/>
      </form>
    </div>
  );
};

export default Slide7;
