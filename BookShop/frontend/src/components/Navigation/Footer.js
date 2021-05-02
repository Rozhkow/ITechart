import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <div className="main-footer">
        <hr className="line"/>
        <div className="row">
          <p className="col-sm">
            &copy;{new Date().getFullYear()} BookShop
          </p>
        </div>
    </div>
  );
}

export default Footer;