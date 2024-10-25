import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import seedrandom from 'seedrandom';
const Slide13 = ({ getPoolUrl, poolSize, zipCode, manualText, poolTypeResponse}) => {
  // console.log(manualText);  
  // console.log(poolTypeResponse);

  const [poolURL, setPoolURL] = useState();
  const [finalPoolSize, setFinalPoolSize] = useState(undefined);

  useEffect(() => {
    
    if (poolURL == undefined) setPoolURL(getPoolUrl());
    if (poolSize != undefined) setFinalPoolSize(poolSize);

    const endButton = document.getElementById('endButton');
    if (endButton) {
      endButton.addEventListener('click', function () {
        window.parent.postMessage('redirectToLink', '*');
      });
    }
    return () => {
      if (endButton) {
        endButton.removeEventListener('click', function () {
          window.parent.postMessage('redirectToLink', '*');
        });
      }
    };
  }, [getPoolUrl, poolSize]);

  const generateNeighbour = (zipCode, min, max) => {
    const rng = seedrandom(zipCode);
    const randomNumber = Math.floor(rng() * (max - min + 1)) + min;
    return randomNumber;
  }
  return (
    <>
      <div>
      <div className="card">
        <div className="card-content">
          <div className="image-container">
            {
              poolURL == "/images/thank-you.svg" || poolTypeResponse === "commercial" || !finalPoolSize || finalPoolSize === "" ? <img src={"/images/thank-you.svg"} alt="G1" className="radius-border image-center" /> :
                <img src={poolURL} alt="G1" className="radius-border image-fit" />
            }
            {/* <img src="/images/thank-you.svg" alt="G1" className="radius-border image-fit" /> */}
          </div>

          <div className="text-container text-content">
            <h1 className="thank-you-title">Thank you!</h1>
            <div className="message">
              <span>
                {manualText ? manualText :
                  <>
                  
                    {poolTypeResponse === "residential" && finalPoolSize && finalPoolSize !== "" && (
                      <>
                        Our AI has analyzed your property and identified your&nbsp;<span className="option-text">{finalPoolSize}-sized pool</span>. Get ready for crystal-clear water and effortless maintenance!
                        <br /><br />
                      </>
                    )}
                    We've received your quote request, and will be in touch with a personalized estimate for your service (typically within a couple hours.)                    
                  </>}

                {/* We've received your quote request, and will be in touch with a personalized estimate for your service (typically within a couple hours.)
                <br /><br />*/}
                <br /><br />
                {zipCode ?
                  <>Join the <span className="option-text">{generateNeighbour(zipCode, 10, 60)} satisfied neighbors</span> in {zipCode} who've already discovered the Cabanapools difference. We can't wait to be of service!</>
                  : <></>}
              </span>
            </div>
          </div>

          <div className="button-container">
            <a href="javascript:void(0);" id="endButton" className="no-decoration">
              <span type="submit" className="btn">
                Back to Home
              </span>
            </a>
          </div>
          <input type="hidden" id="progress_slide_1" data-width="100%" />
        </div>
      </div>
      <style jsx>{`  
        .image-center {
          width: 50%;
          height: auto;
          object-fit: cover;
          object-position: center;
          margin-top: 50px;
        }
        .radius-border {  
          border-radius: 10px 10px 0 0;  
        }  
        .text-content {  
          padding: 15px 20px;  
        }  
        .card {  
          max-width: 640px;  
          margin: 20px auto;  
          background-color: #fff;  
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);  
          border-radius: 10px;  
          border: 1px solid #ddd;  
          overflow: hidden;  
        }  
        .card-content {  
          text-align: left;  
        }  
        .image-container {  
          text-align: center;  
          width: 100%;  
          overflow: hidden;  
        }  
        .image-fit {  
          width: 100%;
          // margin-top: 50px;
          // width: 50%;  
          height: auto;  
          object-fit: cover;  
          object-position: center;  
        }  
        .thank-you-title {  
          font-size: 32px;  
          color: #333;  
          margin-top: 20px;  
          margin-bottom: 20px;  
        }  
        .message {  
          font-size: 16px;  
          color: #555;  
          line-height: 1.5;  
        }  
        .option-text {  
          color: #007bff;  
          font-size: 16px;  
        }  
        .button-container {  
          text-align: center;  
          margin-top: 40px;  
          padding-bottom: 40px;  
        }  
        .btn {  
          background-color: #007bff;  
          color: #fff;  
          padding: 10px 20px;  
          border: none;  
          border-radius: 5px;  
          cursor: pointer;  
          font-size: 16px;  
          transition: background-color 0.3s;  
        }  
        .btn:hover {  
          background-color: #0056b3;  
        }  
        .no-decoration {  
          text-decoration: none;  
        }  
  
        @media (max-width: 768px) {  
          .thank-you-title {  
            font-size: 28px;  
          }  
          .message {  
            font-size: 14px;  
          } 
          .option-text {  
            font-size: 14px;  
          }  
          .btn {  
            padding: 8px 16px;  
            font-size: 14px;  
          }  
        }  
  
        @media (max-width: 480px) {  
          .text-content {  
            padding: 10px 15px;  
          }  
          .thank-you-title {  
            font-size: 28px;  
          }  
          .message {  
            font-size: 14px;  
          }  
          .option-text {  
            font-size: 14px;  
          }  
          .btn {  
            padding: 8px 16px;  
            font-size: 14px;  
          }   
        }  
      `}</style>
    </div>
    </>
  );
};

export default Slide13;
