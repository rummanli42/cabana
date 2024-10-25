import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import Slide1 from "./Slide1";
import Slide2 from "./Slide2";
import Slide3 from "./Slide3";
import Slide4 from "./Slide4";
import Slide5 from "./Slide5";
import Slide6 from "./Slide6";
import Slide7 from "./Slide7";
import Slide8 from "./Slide8";
import Slide9 from "./Slide9";
import Slide10 from "./Slide10";
import Slide11 from "./Slide11";
import Slide12 from "./Slide12";
import Slide13 from "./Slide13";
import Slide21 from "./Slide21";
import { VscArchive } from "react-icons/vsc";
import { getPoolSize } from "../Api/Pool";
import { getZipcode, getCounty } from "../Api/ExtractZipcode"
import { FaAddressBook } from "react-icons/fa6";
const Step = () => {
  const swiperRef = useRef(null);
  const navigate = useNavigate();
  const { index } = useParams();
  const stepIndex = parseInt(index, 10) - 1;
  const [isButtonClick, setIsButtonClick] = useState(false);
  const [slide1Response, setSlide1Response] = useState(null);
  const [poolTypeResponse, setPoolTypeResponse] = useState(null);
  const [serviceResponse, setServiceResponse] = useState([]);
  const [poolOptionResponse, setPoolOptionResponse] = useState(null);
  const [poolOption1Response, setPoolOption1Response] = useState(null);
  const [thankYouResponse, setThankYouResponse] = useState(null);
  const [manualText, setManualText] = useState("");
  const [previousShow, setPreviousShow] = useState(true);
  const [zipCode, setZipCode] = useState(null);
  const [countyName, setCountyName] = useState(null);
  const [formData, setFormData] = useState({});
  const slideNames = [
    "Slide1",
    "Slide2",
    "Slide21",
    "Slide3",
    "Slide4",
    "Slide5",
    "Slide6",
    "Slide7",
    "Slide8",
    "Slide9",
    "Slide10",
    "Slide11",
    "Slide12",
    "Slide13",
  ];
  const handleNext = async (response, data) => {
    if (swiperRef.current && swiperRef.current.swiper) {
      let newIndex = stepIndex + 1;
      let updatedFormData = { ...formData };
      console.log(stepIndex)
      console.log(response)
      if (stepIndex === 0) {
        window.dataLayer.push({
          'event': 'formStepCompleted',
          'formStep': 'Step 1',
          'formData': data
        });
        setSlide1Response(response);
        setFormData({});
        setFormData(data);
        newIndex = response ? 1 : 0;
        let zipcode = await getZipcode(data.address);
        setZipCode(zipcode);
        let countyName = await getCounty(data.address);
        // if (countyName === "San Diego County")
        //   alert("Great, you're in our service area. Let's get you a quote.");
        setCountyName(countyName);
      } else if (response === "manualAddress") {
        window.dataLayer.push({
          'event': 'formStepCompleted',
          'formStep': 'Manual Address',
          'formData': data
        });
        setFormData({});
        setFormData(data);
        newIndex = stepIndex + 1;
      } else if (response === "manualAddress1") {
        window.dataLayer.push({
          'event': 'formStepCompleted',
          'formStep': 'Manual Address Personalized',
          'formData': data
        });
        updatedFormData = { ...updatedFormData, ...data };
        setManualText("We've received your quote request, and will be in touch with a personalized estimate for your service (typically within a couple hours.)");
        updatedFormData = { ...updatedFormData, ...{ poolURL: "/images/thank-you.svg" } };
        setFormData(updatedFormData);
        newIndex = stepIndex + 1;
      } else if (response === "residential" || response === "commercial") {
        window.dataLayer.push({
          'event': 'formStepCompleted',
          'formStep': 'Pool Type',
          'formData': data
        });
        setPoolTypeResponse(response);
        updatedFormData = { ...updatedFormData, ...data };
        setFormData(updatedFormData);
        newIndex = stepIndex + 1;
      } else if (
        response?.includes("greentoclean") ||
        response?.includes("equipment_repair") ||
        response?.includes("regular_pool_spa_service") ||
        response?.includes("filter_or_salt_cell_cleaning") ||
        response?.includes("something_else")
      ) {
        window.dataLayer.push({
          'event': 'formStepCompleted',
          'formStep': 'What can we help?',
          'formData': data
        });
        setServiceResponse(response);
        updatedFormData = { ...updatedFormData, ...data };
        setFormData(updatedFormData);
        newIndex = stepIndex + 1;
      } else if (
        response === "pool_only" ||
        response === "pool_spa" ||
        response === "hot_tub" ||
        response === "something_else"
      ) {
        window.dataLayer.push({
          'event': 'formStepCompleted',
          'formStep': 'Tell us about your pool',
          'formData': data
        });
        setPoolOptionResponse(response);
        updatedFormData = { ...updatedFormData, ...data };
        setFormData(updatedFormData);
        newIndex = stepIndex + 1;
      } else if (
        response?.includes("pool_pump") ||
        response?.includes("pool_filter") ||
        response?.includes("pool_heater") ||
        response?.includes("salt_system") ||
        response?.includes("automaion_system") ||
        response?.includes("i_m_not_sure")
      ) {
        window.dataLayer.push({
          'event': 'formStepCompleted',
          'formStep': 'What equipment do you need help with?',
          'formData': data
        });
        updatedFormData = { ...updatedFormData, ...data };
        setFormData(updatedFormData);
        newIndex = stepIndex + 1;
      } else if (
        response?.includes("ground_pool") ||
        response?.includes("saltwater_pool") ||
        response?.includes("trees_over_pool") ||
        data.isPoolSizePage == 1
      ) {
        window.dataLayer.push({
          'event': 'formStepCompleted',
          'formStep': 'Do any of these apply to your pool?',
          'formData': data
        });
        setPoolOption1Response(response);
        updatedFormData = { ...updatedFormData, ...data };
        // setFormData(updatedFormData);
        // newIndex = stepIndex + 1;
        let pool_size;
        let result = await getPoolSize(formData.address);
        if (result.image_url) {
          updatedFormData = { ...updatedFormData, ...{ poolURL: result.image_url } };
        }
        if (result.contour_area) {
          if (result.contour_area == -1)
            pool_size = ''
          else if (result.contour_area < 2000)
            pool_size = "small";
          else if (result.contour_area < 3000)
            pool_size = "medium";
          else if (result.contour_area > 3000)
            pool_size = "large"
          updatedFormData = { ...updatedFormData, ...{ poolSize: pool_size } };
          if (response?.includes("ground_pool") || result.contour_area == -1) {
            newIndex = stepIndex + 1;
          }
          else
            newIndex = stepIndex + 2;
        }
        setFormData(updatedFormData);

      } else if (response === "thankYou") {
        setThankYouResponse(response);
        setPreviousShow(false);
        if (data.email) {
          updatedFormData = { ...updatedFormData, ...{ email: data.email } };
        } else {
          updatedFormData = { ...updatedFormData, ...data };
        }
        setFormData(updatedFormData);
        window.dataLayer.push({
          'event': 'formSubmitted',
          'formStep': 'Thank you',
          'formData': updatedFormData
        });
        newIndex = stepIndex + 1;
      }
      // handle pool size detect
      if (stepIndex == 5) {
        
      }
      if (stepIndex >= 4) {
        const poolSizeInput = document.querySelector('input[name="pool_size"]:checked');
        const poolSizeValue = poolSizeInput ? poolSizeInput.value : null;
        if(formData.poolSize == ''){
          updatedFormData = { ...updatedFormData, ...{ poolSize: poolSizeValue } };
          setManualText("We've received your quote request, and will be in touch with a personalized estimate for your service (typically within a couple hours.)");
        }
        setFormData(updatedFormData);
      }
      var parentOrigin = "https://cabanapools.com//";
      window.parent.postMessage(
        {
          type: "step",
          step: newIndex + 1,
        },
        '*'
      );
      setIsButtonClick(true);
      navigate(`/step/${newIndex + 1}`);

    }
  };

  const handlePrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      let newIndex = stepIndex - 1;
      if (stepIndex === 1 && !slide1Response) {
        newIndex = 0;
      }
      var parentOrigin = "https://cabanapools.com//";
      window.parent.postMessage(
        {
          type: "step",
          step: newIndex + 1,
        },
        '*'
      );
      window.parent.postMessage('scrollup', '*');
      window.scrollTo(0, 0);
      setIsButtonClick(true);
      navigate(`/step/${newIndex + 1}`);
    }
  };
  const handleResidentialClick = () => {
    setPoolTypeResponse("residential");
  };
  const handleCommercialClick = () => {
    setPoolTypeResponse("commercial");
  };
  const handlePoolURL = () => {
    return formData.poolURL;
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        
        // Get the value of the input field with the name "pool_size"
        const poolSizeInput = document.querySelector('input[name="pool_size"]:checked');
        const poolSizeValue = poolSizeInput ? poolSizeInput.value : null;

        // Customize your formData here
        const updatedFormData = { ...formData };
        if (updatedFormData.poolType === 'commercial') {
          if (updatedFormData.zipCode) {
            updatedFormData.commercialZipCode = updatedFormData.zipCode;
          }
        }
        // If poolSizeValue is not null, add it to the updatedFormData
        if (poolSizeValue) {
          updatedFormData.poolSize = poolSizeValue;
        }
        window.parent.postMessage(
          {
            type: "gtag_event",
            pooltype: poolTypeResponse,
          },
          '*'
        );
        updatedFormData.contactId = window.contact_id;
        const response = await fetch(
          "https://cabanapools.com//wp-json/pool/v1/service-request",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedFormData),
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        setFormData({});
        setThankYouResponse(null);
        setPreviousShow(false);
        //setPoolTypeResponse(null);
        //setServiceResponse([]);
        setPoolOptionResponse(null);
        setPoolOption1Response(null);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (thankYouResponse) {
      fetchData();
    }
  }, [thankYouResponse, formData]);

  useEffect(() => {
    if (swiperRef.current && swiperRef.current.swiper) {
      if (isButtonClick) {
        swiperRef.current.swiper.on("slideChange", () => {
          const activeIndex = swiperRef.current.swiper.activeIndex;
          const totalSlides = swiperRef.current.swiper.slides.length;
          const percentage = ((activeIndex + 1) / totalSlides) * 100;

          var show_namevalue = document.querySelector('#personName');
          var show_name = document.querySelector('#show_name');
          var show_namevalue2 = show_namevalue ? show_namevalue.value : null;
          // Show the #personName value into #show_name
          if (show_name) {
            show_name.innerHTML = show_namevalue2 || "";
          }

          setTimeout(function () {
            var activeSlide = document.querySelector('.swiper-slide-active');
            var inputElement = activeSlide.querySelector('#progress_slide_1');
            var inputValue = inputElement.getAttribute('data-width');
            document.querySelector('.form-progress-slider').style.width = inputValue;
          }, 900);
        });
        swiperRef.current.swiper.slideTo(stepIndex);
        setIsButtonClick(false);
      } else if (stepIndex === 0) {
        setSlide1Response(null);
        swiperRef.current.swiper.slideTo(stepIndex);
      } else {
        swiperRef.current.swiper.slideTo(stepIndex);
      }
    }
  }, [stepIndex, isButtonClick]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.setItem("redirectFirstStep", "true");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    const shouldRedirect = localStorage.getItem("redirectFirstStep");
    if (shouldRedirect === "true") {
      localStorage.removeItem("redirectFirstStep");
      var parentOrigin = "https://cabanapools.com//";
      window.parent.postMessage(
        {
          type: "step",
          step: 1,
        },
        '*'
      );
      navigate("/step/1");
    }
  }, []);

  console.log(manualText);  
  console.log(poolTypeResponse);
  return (
    <div className="mini-container">
      <div className="swiper-container">
        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: ".swiper-button-prev",
          }}
          ref={swiperRef}
          spaceBetween={50}
          slidesPerView={1}
          noSwiping={true}
          noSwipingClass="swiper-no-swiping"
          simulateTouch={false}
          touchRatio={0}
          shortSwipes={false}
          longSwipes={false}
          effect="fade"
          fadeEffect={{
            crossFade: true,
          }}
          speed={800}
        >
          <SwiperSlide>
            <Slide1 onNext={handleNext} />
          </SwiperSlide>
          {!slide1Response && (
            <>
              <SwiperSlide>
                <Slide2 onNext={handleNext} onBack={handlePrev} />
              </SwiperSlide>
              <SwiperSlide>
                <Slide21 onNext={handleNext} onBack={handlePrev} />
              </SwiperSlide>
            </>
          )}
          <SwiperSlide>
            <Slide3 onNext={handleNext} onBack={handlePrev} />
          </SwiperSlide>
          {poolTypeResponse === "commercial" && (
            <SwiperSlide>
              <Slide4 onNext={handleNext} onBack={handlePrev} onResidentialClick={handleResidentialClick} />
            </SwiperSlide>
          )}
          {poolTypeResponse === "residential" && (
            <SwiperSlide>
              <Slide5 onNext={handleNext} onBack={handlePrev} onCommercialClick={handleCommercialClick} />
            </SwiperSlide>
          )}
          {poolTypeResponse === "residential" &&
            serviceResponse?.includes("greentoclean") && (
              <SwiperSlide>
                <Slide6 onNext={handleNext} onBack={handlePrev} />
              </SwiperSlide>
            )}
          {poolTypeResponse === "residential" &&
            serviceResponse?.includes("equipment_repair") && (
              <SwiperSlide>
                <Slide7 onNext={handleNext} onBack={handlePrev} />
              </SwiperSlide>
            )}
          {poolTypeResponse === "residential" &&
            !serviceResponse?.includes("greentoclean") && (
              <SwiperSlide>
                <Slide8 onNext={handleNext} onBack={handlePrev} />
              </SwiperSlide>
            )}
          {poolTypeResponse === "residential" &&
            !serviceResponse?.includes("greentoclean") &&
            ((document.getElementById('something_else2') && document.getElementById('something_else2').checked) || poolOptionResponse === "pool_only" ||
              poolOptionResponse === "pool_spa") && (
              <SwiperSlide>
                <Slide9 onNext={handleNext} onBack={handlePrev} />
              </SwiperSlide>
            )}
          {poolTypeResponse === "residential" &&
            !serviceResponse?.includes("greentoclean") &&
            ((document.getElementById('ground_pool') && document.getElementById('ground_pool').checked)) && (
              <SwiperSlide>
                <Slide10 onNext={handleNext} onBack={handlePrev} />
              </SwiperSlide>
            )}
          {poolTypeResponse === "residential" &&
            !serviceResponse?.includes("greentoclean") &&
            (document.getElementById('ground_pool') && !document.getElementById('ground_pool').checked) &&
            ((document.getElementById('something_else2') && document.getElementById('something_else2').checked) || poolOptionResponse === "pool_only" ||
              poolOptionResponse === "pool_spa") && (
              <SwiperSlide>
                <Slide11 onNext={handleNext} onBack={handlePrev} />
              </SwiperSlide>
            )}
          {poolTypeResponse === "residential" &&
            !serviceResponse?.includes("greentoclean") && (!document.getElementById('ground_pool') || !document.getElementById('ground_pool').checked) &&(
              <SwiperSlide>
                <Slide12 onNext={handleNext} onBack={handlePrev} />
              </SwiperSlide>
            )}
          <SwiperSlide>
          <Slide13 getPoolUrl={handlePoolURL} poolSize={formData.poolSize} zipCode={zipCode} manualText={manualText} poolTypeResponse={poolTypeResponse} />
          </SwiperSlide>
          {previousShow && (
            <div className="swiper-button-prev" onClick={handlePrev}></div>
          )}
        </Swiper>
      </div>
    </div>
  );
};

export default Step;
