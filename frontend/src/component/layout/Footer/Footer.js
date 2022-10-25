import React from "react";
import appStore from "../../../images/appStore.png";
import playStore from "../../../images/playStore.png";
import "./Footer.css";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h1>Download our APP!</h1>
        <p>Download our app from app store and play store</p>
        <img src={appStore} alt="app Store" />
        <img src={playStore} alt="play Store" />
      </div>
      <div className="midFooter">
        <h1>Smart Zone</h1>
        <p>High quality is our first priority</p>
        <p>Copyrights 2022 &copy; Aman Sharma</p>
      </div>
      <div className="rightFooter">
        <h4>Follow us</h4>
        <a href="https://www.instagram.com/">Instagram</a>
        <a href="https://www.youtube.com/">Youtube</a>
        <a href="https://twitter.com/">Twitter</a>
      </div>
    </footer>
  );
};

export default Footer;
