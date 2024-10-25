import React, { useState, useEffect } from "react";

const Slide9 = ({ onNext, onBack }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    const groundPoolCheckbox = document.getElementById("ground_pool");
    const saltwaterPoolCheckbox = document.getElementById("saltwater_pool");

    const handleGroundPoolChange = (e) => {
      if (!e.target.checked) {
        setSelectedOptions((prev) => prev.filter((option) => option !== "ground_pool"));
      }
    };

    if (groundPoolCheckbox) {
      groundPoolCheckbox.addEventListener("change", handleGroundPoolChange);
    }
    
  }, []);
  const handleChange = (e) => {
    const value = e.target.value;
    setSelectedOptions((prev) =>
      prev.includes(value)
        ? prev.filter((option) => option !== value)
        : [...prev, value]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    window.scrollTo(0, 0);
    onNext(selectedOptions, { poolOption1: selectedOptions, isPoolSizePage: 1 });
  };

  return (
    <>
      <div className="form-container">
        <div className="step-section">
          <h1>Do any of these apply to your pool?</h1>
          <div className="subtitle">If not, simply click “None of these apply”</div>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="box-container text-same-redio-button-2">
          <div className="box">
            {selectedOptions.includes("ground_pool") ? (
              <img
                src="/images/R3_Pool Icon_Above the Ground_Colored.svg"
                alt="C1"
              />
            ) : (
              <img
                src="/images/R3_Pool Icon_Above the Ground_Gray.svg"
                alt="G1"
              />
            )}
            <label htmlFor="ground_pool"></label>
            <p className="subtile-box">I have an above ground pool</p>
            <input
              type="checkbox"
              className="form-check-input"
              name="pool-option1"
              value="ground_pool"
              id="ground_pool"
              checked={selectedOptions.includes("ground_pool")}
              onChange={handleChange}
            />
          </div>
          <div className="box">
            {selectedOptions.includes("saltwater_pool") ? (
              <img src="/images/R3_Pool Icon_Saltwater_Colored.svg" alt="C2" width="119"/>
            ) : (
              <img src="/images/R3_Pool Icon_Saltwater_Gray.svg" alt="G2" width="119"/>
            )}
            <label htmlFor="saltwater_pool"></label>
            <p className="subtile-box">I have a saltwater pool</p>
            <input
              type="checkbox"
              className="form-check-input"
              name="pool-option1"
              value="saltwater_pool"
              id="saltwater_pool"
              checked={selectedOptions.includes("saltwater_pool")}
              onChange={handleChange}
            />
          </div>
          <div className="box">
            {selectedOptions.includes("trees_over_pool") ? (
              <img src="/images/R3_Pool Icon_With Tree_Colored.svg" alt="G3" width="119"/>
            ) : (
              <img src="/images/R3_Pool Icon_With Tree_Gray.svg" alt="G3" width="119"/>
            )}
            <label htmlFor="trees_over_pool"></label>
            <p className="subtile-box">I have trees over the pool</p>
            <input
              type="checkbox"
              className="form-check-input"
              name="pool-option1"
              value="trees_over_pool"
              id="trees_over_pool"
              checked={selectedOptions.includes("trees_over_pool")}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-container">
          {selectedOptions.length === 0 ? (
            <button type="submit" className="btn btn-next text-capitalize">
              None of these apply
            </button>
          ) : (
            <button type="submit" className="btn btn-next">
              Next
            </button>
          )}
          <input type="hidden" id="progress_slide_1" data-width="75%"/>
        </div>
      </form>
    </>
  );
};

export default Slide9;
