import "./App.css";
import Header from "./component/layout/Header/Header";
import WebFont from "webfontloader";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useEffect } from "react";
import Footer from "./component/layout/Footer/Footer";
import Home from "./component/Home/Home.js";

function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: [
          "Roboto",
          "Droid sans",
          "Chilanka",
          "Gill Sans",
          "Lucida Sans",
          "Playfair Display",
        ],
      },
    });
  }, []);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
