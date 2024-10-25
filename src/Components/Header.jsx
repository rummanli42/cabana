import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const handlePhoneClick = () => {
    window.parent.postMessage(
      {
        type: "gtag_event",
        numberclick: "6199139335",
      },
      "*"
    );
  };
  const handleRefresh = () => {
    window.location.reload();
    var parentOrigin = "https://cabanapools.com//";
    window.parent.postMessage(
      {
        type: "step",
        step: 1,
      },
      parentOrigin
    );
    window.location.href = "/step/1";
  };

  return (
    <>
      <header className={`header ${scrolled ? "scrolled" : ""}`}>
        <div className="header-content">
          <div className="logo">
            {/* <Link> */}
              <img
                src="/images/logo.svg"
                className="appLogo"
                alt="Logo"
                width={150}
              />
            {/* </Link> */}
          </div>
          <div className="header-menu hide-face-img">
            <div
              className={`${
                scrolled ? "avatar-compact-mod" : "header-humanoid"
              }`}
              aria-label="maya-avatar"
            >
              <span className="avatar med" />
            </div>
          </div>
          <div className="phone-number">
            <a href="tel:6199139335" onClick={handlePhoneClick}>(619) 913-9335</a>
          </div>
        </div>
        <div className="form-progress-bar">
          <div className="form-progress-slider"></div>
        </div>
      </header>
      {/* <div className="google-reviews">
        <img src="/images/google_data.png"></img>
      </div> */}
    </>
  );
};

export default Header;
