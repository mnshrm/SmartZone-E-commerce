import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

const options = {
  edit: false,
  color: "rgba(20,20,20,0.1)",
  activeColor: "tomato",
  value: 3.5,
  size: window.innerWidth < 600 ? 20 : 25,
  isHalf: true,
};

const Product = ({ product }) => {
  return (
    <Link className="productCard" to={product.id}>
      <img src={product.images[0].url} alt="Product" />
      <p>{product.name}</p>
      <div>
        <ReactStars {...options} /> <span>(256 Reviews)</span>
      </div>
      <span>{product.price}</span>
    </Link>
  );
};

export default Product;
