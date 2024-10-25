import React, { useEffect, useRef, useState } from "react";
import { FaLock } from "react-icons/fa6";

const countryCodes = {
  "+1": "United States/Canada","+7": "Russia/Kazakhstan","+20": "Egypt","+27": "South Africa","+30": "Greece","+31": "Netherlands","+32": "Belgium","+33": "France","+34": "Spain","+36": "Hungary","+39": "Italy","+40": "Romania","+41": "Switzerland","+43": "Austria","+44": "United Kingdom","+45": "Denmark","+46": "Sweden","+47": "Norway","+48": "Poland","+49": "Germany","+51": "Peru","+52": "Mexico","+53": "Cuba","+54": "Argentina","+55": "Brazil","+56": "Chile","+57": "Colombia","+58": "Venezuela","+60": "Malaysia","+61": "Australia","+62": "Indonesia","+63": "Philippines","+64": "New Zealand","+65": "Singapore","+66": "Thailand","+81": "Japan","+82": "South Korea","+84": "Vietnam","+86": "China","+90": "Turkey","+91": "India","+92": "Pakistan","+93": "Afghanistan","+94": "Sri Lanka","+95": "Myanmar","+98": "Iran","+211": "South Sudan","+212": "Morocco","+213": "Algeria","+216": "Tunisia","+218": "Libya","+220": "Gambia","+221": "Senegal","+222": "Mauritania","+223": "Mali","+224": "Guinea","+225": "Ivory Coast","+226": "Burkina Faso","+227": "Niger","+228": "Togo","+229": "Benin","+230": "Mauritius","+231": "Liberia","+232": "Sierra Leone","+233": "Ghana","+234": "Nigeria","+235": "Chad","+236": "Central African Republic","+237": "Cameroon","+238": "Cape Verde","+239": "São Tomé and Príncipe","+240": "Equatorial Guinea","+241": "Gabon","+242": "Congo","+243": "Democratic Republic of the Congo","+244": "Angola","+245": "Guinea-Bissau","+246": "British Indian Ocean Territory","+248": "Seychelles","+249": "Sudan","+250": "Rwanda","+251": "Ethiopia","+252": "Somalia","+253": "Djibouti","+254": "Kenya","+255": "Tanzania","+256": "Uganda","+257": "Burundi","+258": "Mozambique","+260": "Zambia","+261": "Madagascar","+262": "Réunion","+263": "Zimbabwe","+264": "Namibia","+265": "Malawi","+266": "Lesotho","+267": "Botswana","+268": "Eswatini","+269": "Comoros","+290": "Saint Helena","+291": "Eritrea","+297": "Aruba","+298": "Faroe Islands","+299": "Greenland","+350": "Gibraltar","+351": "Portugal","+352": "Luxembourg","+353": "Ireland","+354": "Iceland","+355": "Albania","+356": "Malta","+357": "Cyprus","+358": "Finland","+359": "Bulgaria","+370": "Lithuania","+371": "Latvia","+372": "Estonia","+373": "Moldova","+374": "Armenia","+375": "Belarus","+376": "Andorra","+377": "Monaco","+378": "San Marino","+380": "Ukraine","+381": "Serbia","+382": "Montenegro","+383": "Kosovo","+385": "Croatia","+386": "Slovenia","+387": "Bosnia and Herzegovina","+389": "North Macedonia","+420": "Czech Republic","+421": "Slovakia","+423": "Liechtenstein","+500": "Falkland Islands","+501": "Belize","+502": "Guatemala","+503": "El Salvador","+504": "Honduras","+505": "Nicaragua","+506": "Costa Rica","+507": "Panama","+508": "Saint Pierre and Miquelon","+509": "Haiti","+590": "Guadeloupe","+591": "Bolivia","+592": "Guyana","+593": "Ecuador","+594": "French Guiana","+595": "Paraguay","+596": "Martinique","+597": "Suriname","+598": "Uruguay","+599": "Curaçao/Bonaire","+670": "East Timor","+672": "Norfolk Island","+673": "Brunei","+674": "Nauru","+675": "Papua New Guinea","+676": "Tonga","+677": "Solomon Islands","+678": "Vanuatu","+679": "Fiji","+680": "Palau","+681": "Wallis and Futuna","+682": "Cook Islands","+683": "Niue","+685": "Samoa","+686": "Kiribati","+687": "New Caledonia","+688": "Tuvalu","+689": "French Polynesia","+690": "Tokelau","+691": "Micronesia","+692": "Marshall Islands","+850": "North Korea","+852": "Hong Kong","+853": "Macau","+855": "Cambodia","+856": "Laos","+880": "Bangladesh","+886": "Taiwan","+960": "Maldives","+961": "Lebanon","+962": "Jordan","+963": "Syria","+964": "Iraq","+965": "Kuwait","+966": "Saudi Arabia","+967": "Yemen","+968": "Oman","+971": "United Arab Emirates","+972": "Israel","+973": "Bahrain","+974": "Qatar","+975": "Bhutan","+976": "Mongolia","+977": "Nepal","+992": "Tajikistan","+993": "Turkmenistan","+994": "Azerbaijan","+995": "Georgia","+996": "Kyrgyzstan","+998": "Uzbekistan"
};

const detectCountryCode = (phoneNumber) => {
  for (const code in countryCodes) {
    const regex = new RegExp(`^\\${code}`);
    if (regex.test(phoneNumber)) {
      return code; // Return the country code
    }
  }
};

const formatPhoneNumber = (value) => {  
  if (!value) return value;  

  // Remove all non-digit characters
  const phoneNumber = value.replace(/[^\d+]/g, ''); 

  // Detect the country code
  const country = detectCountryCode(phoneNumber);
  
  // No country code detected, format without it
  const phoneNumberLength = phoneNumber.length;
  if (phoneNumberLength < 4) return phoneNumber;
  if (phoneNumberLength < 7) {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
  }
  return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;  
};  

const Slide21 = ({ onNext, onBack }) => {
  const [formData, setFormData] = useState({
    personName: "",
    personPhone: "",
    contactId: ""
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const [errors, setErrors] = useState({});
  const nameInputRef = useRef(null);
  const phoneInputRef = useRef(null);

  useEffect(() => {
    const { personName, personPhone } = formData;
    const isNameValid = !personName || /^[a-zA-Z\s'-]{2,}$/.test(personName);
    const isPhoneValid = !personPhone || /^(\+0?1\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/.test(personPhone);;

    setIsFormValid(personName && personPhone && isNameValid && isPhoneValid);

    setErrors({
      personName: personName && !isNameValid ? "Invalid name format" : "",
      personPhone: personPhone && !isPhoneValid ? "Invalid phone format" : "",
    });
  }, [formData]);
  const handleButtonClick = (e) => {
    
  
  const { personName, personPhone } = formData;

  const isNameValid = personName && /^[a-zA-Z\s'-]{2,}$/.test(personName);
  const isPhoneValid = personPhone && /^(\+0?1\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/.test(personPhone);

  if (!isNameValid) {
    e.preventDefault();
    setErrors((prevErrors) => ({
      ...prevErrors,
      personName: "Invalid name format",
    }));
  }

  if (!isPhoneValid) {
    e.preventDefault();
    setErrors((prevErrors) => ({
      ...prevErrors,
      personPhone: "Invalid phone format",
    }));
  }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let updatedValue = value;
    if(name === "personPhone"){
      updatedValue = formatPhoneNumber(value);
    }
    setFormData({
      ...formData,
      [name]: updatedValue,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    document.getElementById('loadButtonsecond').classList.add('loading');
    document.getElementById('loadButtonsecond').disabled = true;
    console.log('true');
    if (isFormValid) {
        fetch(
          "https://cabanapools.com//wp-json/pool/v1/create-contact-request",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              contact_id: window.contact_id,
              personName: formData.personName,
              phone: formData.personPhone,
              address: document.getElementById("street").value+", "+document.getElementById("city").value+", "+document.getElementById("state").value+", "+document.getElementById("zipCode").value
            }),
          }
        ).then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          if (data.status === "success") {
            window.contact_id = data.contactId;
            document.getElementById("loadButtonsecond").classList.remove("loading");
            setTimeout(() => {
              document.getElementById("loadButtonsecond").disabled = false;
            }, 3000);
          } else {
            document.getElementById("loadButtonsecond").classList.remove("loading");
            setTimeout(() => {
              document.getElementById("loadButtonsecond").disabled = false;
            }, 3000);
            throw new Error(data.message || "Failed to create contact");
          }
        })
        .catch((error) => {
          console.error("There was an error:", error);
        });
        const selectedAddress = {  
          personName: formData.personName,  
          phone: formData.personPhone
        };
  
        window.scrollTo(0, 0);
        onNext("manualAddress1", selectedAddress);
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
          <h1>How can we contact you?</h1>
        </div>
        <div className="field-mini-wrap">
          <div className="row">
            <div className="col-md-6">
              <div className="input-container form-floating position-relative input-box">
                <input
                  className={`form-control input-field pac-target-input ${
                    errors.street ? "invalid-field" : ""
                  }`}
                  placeholder="Enter a name"
                  name="personName"
                  value={formData.personName}
                  ref={nameInputRef}
                  id="personName"
                  pattern="[a-zA-Z\s'-]{2,}"
                  onChange={handleInputChange}
                  aria-invalid={!!errors.personName}
                />
                <label htmlFor="personName">First and last name</label>
              </div>
            </div>
            <div className="col-md-6">
              <div className="input-container form-floating position-relative input-box">
                <input
                  className={`form-control input-field pac-target-input ${
                    errors.phone ? "invalid-field" : ""
                  }`}
                  placeholder="Phone (123-123-1234)"
                  name="personPhone"
                  id="personPhone"
                  type="text"
                  value={formData.personPhone}
                  ref={phoneInputRef}
                  onChange={handleInputChange}
                  aria-invalid={!!errors.personPhone}
                  inputMode="numeric"
                  required
                />
                <label htmlFor="personPhone">Phone number</label>
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
          id="loadButtonsecond"
          onClick={handleButtonClick}>
          Next
        </button>
        <input type="hidden" id="progress_slide_1" data-width="30%"/>
      </form>
    </div>
  );
};

export default Slide21;
