import React, { useEffect, useRef, useState } from "react";  
import Autocomplete from "react-google-autocomplete";  
import PhoneInput from "react-phone-input-2";
import { FaLock } from "react-icons/fa6";  
import { IoLocationOutline } from "react-icons/io5";  
import { Link } from "react-router-dom";  

const center = {  
  lat: 0,  
  lng: 0,  
};  
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

const Slide1 = ({ onNext }) => {  
  const [selectedLocation, setSelectedLocation] = useState(center);  
  const [inputValue, setInputValue] = useState("");  
  const [inputZipCodeValue, setInputZipCodeValue] = useState("");  
  const [isValidAddress, setIsValidAddress] = useState(true);  
  const [errors, setErrors] = useState({});  
  const [isFormValid, setIsFormValid] = useState(false);  
  const [formData, setFormData] = useState({ personName: "", personPhone: "" });  
  const [serviceAreaMessage, setServiceAreaMessage] = useState("We'll confirm you're in our service area");  

  const mapRef = useRef(null);  
  const inputRef = useRef(null);  
  const nameInputRef = useRef(null);  
  const phoneInputRef = useRef(null);  

  useEffect(() => {  
    const { personName, personPhone, locationData } = formData;  
    const isNameValid = !personName || /^[a-zA-Z\s'-]{2,}$/.test(personName);  
    const isPhoneValid = !personPhone || /^(\+?\d{1,3}[\s.-]?)?(\(?\d{3}\)?[\s.-]?)?\d{3}[\s.-]?\d{4}$/.test(personPhone);  
    const islocationDataValid = locationData;  

    setIsFormValid(personName && personPhone && isNameValid && isPhoneValid && islocationDataValid);  

    setErrors({  
      personName: personName && !isNameValid ? "Invalid name format" : "",  
      locationData: !islocationDataValid ? "Invalid name format" : "",  
      personPhone: personPhone && !isPhoneValid ? "Invalid phone format" : "",  
    });  
  }, [formData]);  

  useEffect(() => {  
    if (!window.google) {  
      return;  
    }  

    const mapElement = document.getElementById("map");  
    if (!mapElement) {  
      console.error("Map element with id 'map' not found.");  
      return;  
    }  
    const map = new window.google.maps.Map(mapElement, {  
      center: selectedLocation,  
      zoom: 15,  
      mapTypeId: "roadmap",  
      fullscreenControl: false,  
      gestureHandling: "none",  
      zoomControl: false,  
      keyboardShortcuts: false,  
      styles: [  
        {  
          featureType: "all",  
          elementType: "all",  
          stylers: [{ saturation: -100 }, { visibility: "simplified" }],  
        },  
        {  
          featureType: "poi",  
          elementType: "labels",  
          stylers: [{ visibility: "off" }],  
        },  
      ],  
    });  

    const marker = new window.google.maps.Marker({  
      position: selectedLocation,  
      map: map,  
      icon: {  
        url: "/images/pin_icon.svg",  
      },  
    });  

    
  }, [selectedLocation]);  

  useEffect(() => {
    window.contact_id = '';
    if (inputRef.current) {  
      inputRef.current.focus();  
    }  
  }, []);  

  // Update service area message based on inputValue  
  useEffect(() => {  
    if (inputValue.includes("San Diego")) {  
      setServiceAreaMessage("Great, you're in our service area. Let's get you a quote.");  
    }
  }, [inputValue]);  

  const handleButtonClick = (e) => {  
    const { personName, personPhone } = formData;  

    const isNameValid = personName && /^[a-zA-Z\s'-]{2,}$/.test(personName);  
    const isPhoneValid = personPhone && /^(\+?\d{1,3}[\s.-]?)?(\(?\d{3}\)?[\s.-]?)?\d{3}[\s.-]?\d{4}$/.test(personPhone);  

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

  const handlePlaceSelected = (place) => { 
    if (place?.geometry && place?.geometry?.location) {  
      setInputValue(place?.formatted_address);  
      setInputZipCodeValue(place.address_components.find(x => x.types.find(y => y === 'postal_code'))?.long_name);  
      setSelectedLocation({  
        lat: place.geometry.location.lat(),  
        lng: place.geometry.location.lng(),  
      });  
      setIsValidAddress(true);
    } else {  
      setInputValue("");  
      setInputZipCodeValue("");  
      setIsValidAddress(false);  
    }  
  };  

  const handleInputChange = (e) => {  
    const { name, value } = e.target;  

    let updatedValue = value;  
    if (name === "personPhone") {  
      updatedValue = formatPhoneNumber(value);  
    }  
    if (name && value) {  
      if (name === "locationData") {  
        setInputValue(updatedValue);  
        setSelectedLocation(center);  
        setIsValidAddress(false);  
      }  
    } 
    setFormData({  
      ...formData,  
      [name]: updatedValue,  
    });  
  };  

  const isValidLocation =  
    selectedLocation.lat !== 0 && selectedLocation.lng !== 0;  

  return (  
    <div className="form-container">  
      <form  
        onSubmit={ (e) => {  
          e.preventDefault();  
          document.getElementById('loadButton').classList.add('loading');
          document.getElementById('loadButton').disabled = true;
          if (isFormValid) {  
            var firstName = formData.personName.split(' ').slice(0, -1).join(' ');  
            var lastName = formData.personName.split(' ').slice(-1).join(' ');
            const payload = JSON.stringify({
                contact_id: window.contact_id,
                personName: formData.personName,
                phone: formData.personPhone,
                address: inputValue
            });
            fetch("https://cabanapools.com//wp-json/pool/v1/create-contact-request", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: payload,
            })
            .then((response) => {
              if (!response.ok) {
                throw new Error("Network response was not ok");
              }
              return response.json();
            })
            .then((data) => {
              if (data.status === "success") {
                window.contact_id = data.contactId;
                document.getElementById("loadButton").classList.remove("loading");
                setTimeout(() => {
                  document.getElementById("loadButton").disabled = false;
                }, 3000);
              } else {
                document.getElementById("loadButton").classList.remove("loading");
                setTimeout(() => {
                  document.getElementById("loadButton").disabled = false;
                }, 3000);
                throw new Error(data.message || "Failed to create contact");
              }
            })
            .catch((error) => {
              console.error("There was an error:", error);
            });
            const selectedAddress = {  
              address: inputValue,  
              location: selectedLocation,  
              personName: formData.personName,  
              phone: formData.personPhone,  
              zipCode: inputZipCodeValue
            };  
    
            window.scrollTo(0, 0);  
            onNext(true, selectedAddress);
          }  
        }}  
      >  
        <div className="step-section">  
          <h1>Let’s start with your address</h1>  
          <p className="service area">{serviceAreaMessage}</p>  
        </div>  
        {isValidAddress && inputValue.length > 10 && isValidLocation && (  
          <div className="row">  
            <div className="map-container-parent col-md-12">  
              <div  
                className="map_container"  
                id="map"  
                ref={mapRef}  
                style={{ height: "150px", width: "100%" }}  
              ></div>  
            </div>  
          </div>  
        )}  

        <div className="field-mini-wrap">  
          <div className="row">  
            <div className="col-md-12">  
              <div className="input-container form-floating mt-5 position-relative">  
                <IoLocationOutline className="icon" />  
                <Autocomplete  
                  ref={inputRef}  
                  className={`form-control input-field street-field  ${  
                    inputValue ? "has-content" : ""  
                  } ${  
                    !isValidAddress && inputValue !== "" && !isValidLocation  
                      ? "i-cant-found"  
                      : ""    
                  }`}  
                  apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}  
                  options={{  
                    types: ["address"],  
                    componentRestrictions: { country: "us" },  
                  }}  
                  onPlaceSelected={handlePlaceSelected}  
                  onChange={handleInputChange}  
                  aria-invalid={!!errors.locationData}  
                  name="locationData"  
                />  
                <label  
                  htmlFor="form-name"  
                  className={`address ${inputValue ? `street-address` : ""}`}  
                >  
                  Street address  
                </label>  
                {!isValidAddress && inputValue !== "" && !isValidLocation && (
                  <div className="address-no-results">
                    <Link to="/step/2">I can't find my address</Link>
                  </div>
                )}
              </div>  
            </div>  
          </div>  
          {isValidAddress && isValidLocation && inputValue && (  
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
                    aria-invalid={!!errors.personName}  
                    onChange={handleInputChange}  
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
          )}  
        </div>  
        {<div className="lock-bg">  
          <FaLock className="lock-color" />  
          <span className="from-lock">Your information is fully secure.</span>  
        </div>}
        <button  
          type="submit"  
          className={`btn ${  
            !isValidAddress && inputValue !== "" && !isValidLocation  
              ? "next-btn"  
              : "setp-next-btn"  
          }  
          ${  
            !isFormValid  
              ? "button-disabled"  
              : ""  
          }  
          `}  
          onClick={handleButtonClick}  
          id="loadButton"
        >  
          Next  
        </button>  
        <input type="hidden" id="progress_slide_1" data-width="0%"/>  
        <input type="hidden" id="contact_id"/>  
        <div className="under-button-text">By continuing, you are agreeing to receive text messages from Cabanapools.<div></div>Message and data rates may apply, and the frequency of messages may vary.<br />You may opt out at any time.</div>  
      </form>  
    </div>  
  );  
};  

export default Slide1;
