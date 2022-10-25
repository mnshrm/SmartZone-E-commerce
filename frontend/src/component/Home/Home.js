import React, { Fragment } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import Product from "./Product.js";
import MetaData from "../layout/MetaData";

const product = {
  name: "Blue t-shirt",
  images: [
    {
      url: "https://m.media-amazon.com/images/I/71oGYDEQIcL._AC_UL480_FMwebp_QL65_.jpg",
    },
  ],
  price: "Rs. 3000",
  id: "abhishek",
};

const Home = () => {
  return (
    <Fragment>
      <MetaData title="SmartZone electronics" />

      <div className="banner">
        <p>Welcome to Smart Zone</p>
        <h1>Find amazing products below</h1>

        <a href="#container">
          <button>
            Scroll <CgMouse />
          </button>
        </a>
      </div>

      <h2 className="homeHeading">Featured products</h2>

      <div className="container" id="container">
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
      </div>
    </Fragment>
  );
};

export default Home;
