import React, { useEffect, useRef, useState } from "react";  

const Slide4 = ({ onNext, onBack, onResidentialClick }) => {  
  const [formData, setFormData] = useState({  
    commercialFirstName: "",  
    commercialLastName: "",  
    commercialEmail: "",  
    // commercialZipCode: "",  
    commercialCompanyName: "",  
    commercialHelp: "",  
  });  
  const [isFormValid, setIsFormValid] = useState(false);  
  const [errors, setErrors] = useState({});  
  const emailInputRef = useRef(null);  
  const zipCodeInputRef = useRef(null);  
  const companyNameInputRef = useRef(null);  
  const helpInputRef = useRef(null);  

  useEffect(() => {  
    const {  
      commercialEmail,  
      // commercialZipCode,  
      commercialCompanyName,  
      commercialHelp,  
    } = formData;  

    const isEmailValid =  
      !commercialEmail || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(commercialEmail);  
    const isCompanyNameValid = commercialCompanyName;  
    const isHelpValid = commercialHelp;  
    // const isCommercialZipCodeValid = commercialZipCode;  

    setIsFormValid(  
      commercialEmail &&  
        // commercialZipCode &&  
        commercialCompanyName &&  
        commercialHelp &&  
        isEmailValid &&  
        isCompanyNameValid &&  
        isHelpValid
        // && isCommercialZipCodeValid  
    );  

    setErrors({  
      commercialEmail:  
        commercialEmail && !isEmailValid ? "Invalid email format" : "",  
      commercialCompanyName:  
        commercialCompanyName && !isCompanyNameValid  
          ? "Invalid company name format"  
          : "",  
      commercialHelp:  
        commercialHelp && !isHelpValid ? "Invalid help format" : "",  
      // commercialZipCode:  
      //   commercialZipCode && !isCommercialZipCodeValid  
      //     ? "Required zip code"  
      //     : "",  
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
    const { commercialEmail, commercialCompanyName, commercialHelp, commercialZipCode } = formData;  

    const isEmailValid = commercialEmail;  
    const isCompanyNameValid = commercialCompanyName;  
    const isHelpValid = commercialHelp;  
    // const isCommercialZipCodeValid = commercialZipCode;  

    if (!isEmailValid) {  
      e.preventDefault();  
      setErrors((prevErrors) => ({  
        ...prevErrors,  
        commercialEmail: "Invalid email format",  
      }));  
    }  

    if (!isCompanyNameValid) {  
      e.preventDefault();  
      setErrors((prevErrors) => ({  
        ...prevErrors,  
        commercialCompanyName: "Invalid company name format",  
      }));  
    }  

    if (!isHelpValid) {  
      e.preventDefault();  
      setErrors((prevErrors) => ({  
        ...prevErrors,  
        commercialHelp: "Invalid help format",  
      }));  
    }  

    // if (!isCommercialZipCodeValid) {  
    //   e.preventDefault();  
    //   setErrors((prevErrors) => ({  
    //     ...prevErrors,  
    //     commercialZipCode: "Invalid zip code format",  
    //   }));  
    // }  
  };  

  const handleResidentialClick = () => {  
    onResidentialClick();  
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
          <h1>It looks like this is a commercial pool.</h1>  
          <div className="subtitle">  
            <span>  
              Let's schedule a time to come on site to  
              <br className="text-br" />  
              provide you with a service estimate.  
            </span>  
          </div>  
        </div>  
        <div className="field-mini-wrap">  
          <div className="row">  
            <div className="col-md-12">  
              <div className="input-container form-floating position-relative input-box">  
                <input  
                  className={`form-control input-field pac-target-input ${  
                    errors.commercialEmail ? "invalid-field" : ""  
                  }`}  
                  placeholder="Enter an email"  
                  name="commercialEmail"  
                  id="commercialEmail"  
                  type="email"  
                  value={formData.commercialEmail}  
                  ref={emailInputRef}  
                  onChange={handleInputChange}  
                  aria-invalid={!!errors.commercialEmail}  
                  pattern="[^\s@]+@[^\s@]+\.[^\s@]+"  
                  title="Email should be in the format: example@example.com."  
                />  
                <label htmlFor="commercialEmail">Email</label>  
              </div>  
            </div>  
            {/* <div className="col-md-6">  
              <div className="input-container form-floating position-relative input-box">  
                <input  
                  className={`form-control input-field pac-target-input ${  
                    errors.commercialZipCode ? "invalid-field" : ""  
                  }`}  
                  placeholder="Enter a zip code"  
                  name="commercialZipCode"  
                  id="commercialZipCode"  
                  type="text"  
                  value={formData.commercialZipCode}  
                  ref={zipCodeInputRef}  
                  aria-invalid={!!errors.commercialZipCode}  
                  inputMode="numeric"  
                  onChange={handleInputChange}  
                />  
                <label htmlFor="commercialZipCode">Zip code</label>  
              </div>  
            </div>   */}
          </div>  
          <div className="row">  
            <div className="col-md-12">  
              <div className="input-container form-floating position-relative input-box">  
                <input  
                  className={`form-control input-field pac-target-input ${  
                    errors.commercialCompanyName ? "invalid-field" : ""  
                  }`}  
                  placeholder="Your company name"  
                  name="commercialCompanyName"  
                  id="commercialCompanyName"  
                  value={formData.commercialCompanyName}  
                  ref={companyNameInputRef}  
                  onChange={handleInputChange}  
                  aria-invalid={!!errors.commercialCompanyName}  
                  title="Company name should be at least 2 characters long and contain only letters, numbers, spaces, commas, periods, apostrophes, or hyphens."  
                />  
                <label htmlFor="commercialCompanyName">Your company name</label>  
              </div>  
            </div>  
          </div>  
          <div className="row">  
            <div className="col-md-12">  
              <div className="input-container form-floating position-relative input-box">  
                <textarea  
                  className={`form-control input-field pac-target-input ${  
                    errors.commercialHelp ? "invalid-field" : ""  
                  }`}  
                  placeholder="What can we help you with?"  
                  name="commercialHelp"  
                  id="commercialHelp"  
                  value={formData.commercialHelp}  
                  ref={helpInputRef}  
                  onChange={handleInputChange}  
                  aria-invalid={!!errors.commercialHelp}  
                  title="Help description should be at least 2 characters long and contain only letters, spaces, commas, periods, apostrophes, or hyphens."  
                />  
                <label htmlFor="commercialHelp">What can we help you with?</label>  
              </div>  
            </div>  
          </div>  
        </div>  
        <button  
          type="submit"  
          className={`btn btn-next ${!isFormValid ? "button-disabled" : ""}`}  
          onClick={handleButtonClick}  
        >  
          Next  
        </button>  

        {/* <div className="optional-text">  
          <span>Isn't Commercial? </span>
          <button  
            type="button"  
            className="residential-button"  
            onClick={handleResidentialClick}  
          >  
            Go to residential
          </button>  
        </div>   */}

        <input type="hidden" id="progress_slide_1" data-width="75%" />  
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

export default Slide4;